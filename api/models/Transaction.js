module.exports = {

  attributes: {

    amount: {
      type: 'number',
      required: true
    },

    type: {
      type: 'string',
      required: true,
    },

    category: {
      type: 'string',
      required: true
    },

    account: {
      model: 'account',
      required: true
    },

  }
};
