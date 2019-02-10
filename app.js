const swaggerTools = require('swagger-tools');
const bodyParser = require('body-parser'); // eslint-disable-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');
const cors = require('cors');
const { Exception, errorDefinitions, handleError } = require('./api/helpers/errors');
const logger = require('./api/helpers/logger');
const config = require('./config');

process.on('uncaughtException', (err) => {
  process.stdout.write(`Caught exception: ${err}`);
});

const options = {
  swaggerUi: './api/swagger/swagger.json',
  controllers: './api//controllers',
};
const swaggerDoc = require('./api/swagger/swagger.json');

const app = require('express')();

module.exports = app;

const customErrorHandler = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  let customError = Exception.generateCustomError({
    ...errorDefinitions.BAD_REQUEST_PARAMETER,
    values: { '#INPUT': (err.paramName || 'not set') },
    message: `Swagger validation: code: ${(err.code || 'not set')} message:${(err.message || 'not set')}`,
    stack: (err.stack || undefined),
  });
  customError = handleError(customError, req.headers['debug-trace']);
  res.status(customError.statusCode).json(customError.response);
};

// Initialize the Swagger middleware
swaggerTools.initializeMiddleware(swaggerDoc, (middleware) => {
  app.use(bodyParser.json({ limit: '50MB' }));
  app.use(middleware.swaggerMetadata());
  app.use(cors({ headers: '*' }));

  // Setup security handlers
  app.use(middleware.swaggerSecurity({
    appToken(req, def, token, callback) {
      logger.info(`appToken validation: ${token}`);
      try {
        // Generate a fake token with apiKey
        const fakeToken = jwt.sign({
          apiKey: '123zão',
        }, config.secret);

        // Verify the provided token
        const user = jwt.verify(
          fakeToken,
          config.secret,
          [{ ignoreExpiration: true }],
        );
        // Hard coded way to add new info...
        user.userCode = '67f04350-2c1b-11e9-b210-d663bd873d93';
        user.userName = 'Nome do Fulano';

        logger.info(`appToken user: ${JSON.stringify(user)}`);

        req.swagger.params = {
          // spread all swager params and add new ones
          ...req.swagger.params,
          employeeInfo: {
            employeeUid: user.userCode,
            employeeName: user.userName,
          },
        };

        callback();
      } catch (ex) {
        logger.error('invalid AppToken', ex);
        if (token === undefined) {
          req.res.status(401).json([{
            code: '401',
            date: new Date(),
            message: 'AppToken is Required',
            details: 'AppToken is Required',
          }]);
        } else {
          req.res.status(401).json([{
            code: '401',
            date: new Date(),
            message: 'Invalid AppToken',
            details: 'invalid AppToken',
          }]);
        }
        req.res.end();
      }
    },
  }));

  app.use(middleware.swaggerValidator());
  app.use(customErrorHandler);
  app.use(middleware.swaggerRouter(options));
  app.use(middleware.swaggerUi({
    swaggerUi: '/docs/',
  }));

  const port = process.env.PORT || 8083;
  const server = app.listen(port, () => {
    let host = server.address().address;
    host = (host === '::' ? 'localhost' : host);
    logger.info('listening at http://%s:%s', host, port);
    logger.debug('listening at http://%s:%s', host, port);
  });
});

