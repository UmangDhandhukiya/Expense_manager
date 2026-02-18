module.exports.datastores = {
  default: {
    adapter: 'sails-mongo',
    url: process.env.DB_URL,
  },
};
