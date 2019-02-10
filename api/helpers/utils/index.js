const isEmpty = (value) => {
  const isEmptyValue = value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0);

  if (!isEmptyValue) {
    return false;
  }
  return true;
};

module.exports = {
  isEmpty,
};
