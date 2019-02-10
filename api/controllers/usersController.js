const httpCodes = require('../helpers/enums/httpCodes');
const createRequest = require('../helpers/createRequest');
const UsersBO = require('../core/businessOperation/UsersBO');

const CONTROLLER_NAME = 'users';

module.exports = {
  /** --- GET ------------------------------------------- */
  getUsers: createRequest(CONTROLLER_NAME, 'getUsers', UsersBO),
  getUserByUid: createRequest(CONTROLLER_NAME, 'getUserByUid', UsersBO),

  /** --- CREATE ------------------------------------------- */
  createUser: createRequest(CONTROLLER_NAME, 'createUser', UsersBO, (res, data) => {
    res.status(httpCodes.CREATED).json(data);
  }),

  /** --- DELETE ------------------------------------------- */
  deleteUser: createRequest(CONTROLLER_NAME, 'deleteUser', UsersBO, (res) => {
    res.status(httpCodes.NO_CONTENT).end();
  }),
};
