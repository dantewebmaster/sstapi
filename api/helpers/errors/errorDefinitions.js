const httpCodes = require('../../helpers/enums/httpCodes');

const errorDefinitions = {
  UNKNOWN: {
    key: 'UNKNOWN',
    statusCode: httpCodes.ERROR,
    message: 'API failed to execute this action through an unknown cause',
    detail: 'Unfortunately this error do not provide more information',
  },
  BAD_REQUEST_PARAMETER: {
    key: 'BAD_REQUEST_PARAMETER',
    statusCode: httpCodes.BAD_REQUEST,
    message: 'An input value whas not accepeted',
    detail: '{parameterName: #INPUT}',
  },
  BAD_REQUEST_PARAMETER_UNSET: {
    key: 'BAD_REQUEST_PARAMETER_UNSET',
    statusCode: httpCodes.BAD_REQUEST,
    message: 'An input value whas not informed',
    detail: '{parameterName: #INPUT}',
  },
  // data errors
  LOGICAL_DATA_DUPLICATED: {
    key: 'LOGICAL_DATA_DUPLICATED',
    statusCode: httpCodes.BAD_REQUEST,
    message: '#DATA_NAME had duplication criteria affected',
  },
  DUPLICATED_STRUCTURE_CODE: {
    key: 'DUPLICATED_STRUCTURE_CODE',
    statusCode: httpCodes.BAD_REQUEST,
    message: '#DATA_NAME structure code duplicated',
  },
  CRITICAL_DATA_NOT_FOUND: {
    key: 'CRITICAL_DATA_NOT_FOUND',
    statusCode: httpCodes.BAD_REQUEST,
    message: 'Critical data not found for informed parameters',
    detail: '{dataDescription: #DATA_NAME}',
  },
  RESTRICTED_ACTION: {
    key: 'RESTRICTED_ACTION',
    statusCode: httpCodes.BAD_REQUEST,
    message: '#ACTION not alowed for #DATA_NAME',
  },
  DELETE_FK_ERROR: {
    key: 'DELETE_FK_ERROR',
    statusCode: httpCodes.BAD_REQUEST,
    message: '#DATA_NAME has child data',
  },
};

module.exports = errorDefinitions;
