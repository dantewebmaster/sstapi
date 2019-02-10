const logger = require('../../helpers/logger');
const UsersRepository = require('../repositories/UsersRepository');
const usersTransformer = require('../../helpers/transformers/usersTransformer');
const validations = require('../../helpers/validations');
const { Exception, errorDefinitions } = require('../../helpers/errors');

const Dependency = {
  UsersRepository,
  usersTransformer,
};

class UsersBO {
  constructor(params) {
    this.usersRepository = new Dependency.UsersRepository();
    // set param for general use
    this.params = params;
    // set options general options
    this.options = {
      limit: (params._limit || { _limit: 2000 }).value, // eslint-disable-line no-underscore-dangle
      offset: (params._offset || { _offset: 0 }).value, // eslint-disable-line no-underscore-dangle
    };
  }

  async createUser() {
    logger.debug('UsersBO.createUser');
    const data = await this.getDataFromParams(true);
    return this.usersRepository.createUser(data, this.options);
  }

  async getUsers() {
    logger.debug('UsersBO.getUsers');
    const criteria = {
      // userUid: 'e73a3420-2d53-11e9-b210-d663bd873d93',
    };
    const data = await this.usersRepository.getUsers(criteria, this.options);

    // if there is need to transform the output
    // return Dependency.usersTransformer.transformList(data);

    // is not the case, just return the data as is
    return data;
  }

  async getUserByUid() {
    logger.debug('UsersBO.getUserByUid');
    validations.isUUID(this.params.uuid.value, 'users');
    const criteria = {
      userUid: this.params.uuid.value,
    };
    return this.usersRepository.getUserByUid(criteria, this.options);
  }

  async deleteUser() {
    logger.debug('UsersBO.delete');
    validations.isUUID(this.params.uuid.value, 'users');
    const criteria = {
      userUid: this.params.uuid.value,
    };
    const exists = await this.usersRepository.existUser(criteria);
    if (exists) {
      Exception.raise(errorDefinitions.USER_DUPLICATED);
    }
    // send to repository and get results
    return this.usersRepository.deleteUser(criteria, this.options);
  }

  async getDataFromParams(isNew) {
    const data = this.params.user.value;

    if (isNew) {
      Object.assign(data, {
        createdAt: new Date(),
      });
    } else {
      Object.assign(data, {
        lastUpdatedAt: new Date(),
      });
    }

    return data;
  }

  async validateInput(input, isNew) {
    const criteria = {
      userUid: input.userUid,
    };
    const userDuplicated = await this.usersRepository
      .existUser({ ...criteria, userUid: input.userUid }, this.options);

    if (userDuplicated && isNew) {
      Exception.raise(errorDefinitions.USER_DUPLICATED);
    }

    // Promise.all example
    // if (input.usersList.length) {
    //   await Promise.all(input.usersList.map(async (user) => {
    //     const existUser = await this.usersRepository.existUser({ ...criteria });
    //     if (existUser) {
    //       Exception.raise(errorDefinitions.USER_DUPLICATED);
    //     }
    //   }));
    // }
  }
}

module.exports = UsersBO;
