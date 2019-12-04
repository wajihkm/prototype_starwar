module.exports = {

  friendlyName: 'Popular character',
  description: '',

  inputs: {},

  exits: {},


  fn: async function (inputs, exits) {
    const { db, client } = await sails.helpers.starwarDb();
    const collection = db.collection('films');
    const collection1 = db.collection('people');

    try {
      let films = await collection.find({}, {
        projection: {
          characters: 1,
        }
      }).toArray();


      // Count each occurrence

      let charactersArr = films.map(f => f.characters);
      let charactersAll = charactersArr.reduce((acc, cur) => [...acc, ...cur], []);

      // GroupBy Number of occurencies by CharacterId
      let counts = _.countBy(charactersAll);

      // Sort the result Array by Number of occurencies and Fetch the first result
      let popularId = Object.entries(counts).sort((a, b) => b[1] - a[1])[0];

      let key = parseInt(popularId[0]);

      let popularChar = await collection1.findOne({ id: key });

      return exits.success(popularChar);
    }
    catch (error) {
      console.log(error);
      client.close();
      return exits.error();
    }
  }

};
