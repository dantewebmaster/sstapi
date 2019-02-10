// Get passed data and transform
const transformOne = (user) => {
  let transformedUser = {};
  if (user) {
    transformedUser = {
      cityName: user.locationDetails.city,
      userName: user.userDetails.name,
      userSummary: 'Pode ser retornado um dado mockado diretamente do transformer.',
    };
  }
  return transformedUser;
};

const transformList = (usersList, options) => usersList.map(transformOne, options);

module.exports = {
  transformList,
  transformOne,
};
