const logger = require('../../helpers/logger');
const models = require('../models');
const uuid = require('uuid/v1');
const randomUserService = require('../services/randomUserService');
const { Exception, errorDefinitions } = require('../../helpers/errors');

const db = models.sequelize;
const { Op } = models.sequelize;

const {
  User,
} = models;

class UsersRepository {
  async getUsers({ userUid }) {
    logger.debug('UsersRepository.getUsers');
    const andUser = [];

    if (userUid) {
      andUser.push({ userUid });
    }

    const users = await User.findAll({
      attributes: ['name', 'userUid'],
      where: { [Op.and]: andUser },
      order: [
        ['name', 'ASC'],
      ],
    });

    // if not find any data on BD, return a list of fake users using a service...
    if (users.length === 0) {
      return randomUserService.generateRandomUser({ totalUsers: 10, country: 'br' });
    }

    return users;
  }

  async createUser(data) {
    logger.debug('UsersRepository.createUser');
    let transaction;
    try {
      transaction = await db.transaction();
      const newUid = uuid();
      data.user.userUid = newUid;
      await User.create(data.user, { transaction });
      await transaction.commit();
      return data.user;
    } catch (err) {
      await transaction.rollback();
      return Exception.raise({
        ...errorDefinitions.UNKNOWN,
        detail: err.message,
        stack: err.stack,
      });
    }
  }

  async deleteUser({ userUid }) {
    logger.debug('UsersRepository.deleteUser');
    const andUser = [];
    if (userUid) {
      andUser.push({ userUid });
    }
    let transaction;
    try {
      transaction = await db.transaction();
      await User.destroy({
        transaction,
        where: { [Op.and]: andUser },
      });
      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      Exception.raise({
        ...errorDefinitions.UNKNOWN,
        detail: (err.message || err),
        stack: (err.stack || undefined),
      });
    }
  }
}

module.exports = UsersRepository;
