module.exports = {

  attributes: {

    name: {
      type: 'string',
      required: true
    },

    owner: {
      model: 'user',
      required: true
    },

    transactions: {
      collection: 'transaction',
      via: 'account'
    }

  }

};
