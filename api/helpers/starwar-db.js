module.exports = {

  friendlyName: 'Starwar db',
  description: '',

  inputs: {

  },

  exits: {
    success: {
      description: 'All done.',
    },

  },


  fn: async function (inputs, exits) {
    const mongo = require('mongodb').MongoClient;
    const url = 'mongodb://candidate:PrototypeRocks123654@ds345028.mlab.com:45028/star-wars';

    mongo.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }, (err, client) => {
      if (err) {
        console.error(err);
        return false;
      }

      const db = client.db('star-wars');

      exits.success({ db, client });
    });
  }
};

