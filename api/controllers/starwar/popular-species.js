module.exports = {

  friendlyName: 'Popular species',
  description: '',

  inputs: {},

  exits: {},


  fn: async function (inputs, exits) {
    const { db, client } = await sails.helpers.starwarDb();
    const collection = db.collection('films');
    const collection1 = db.collection('species');

    try {
      let films = await collection.find({}, {
        projection: {
          species: 1,
        }
      }).toArray();


      // Count each occurrence

      let speciesArr = films.map(f => f.species);
      let speciesAll = speciesArr.reduce((acc, cur) => [...acc, ...cur], []);
      let counts = _.countBy(speciesAll);

      let popularIds = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 3);
      let keys = popularIds.map(k => parseInt(k[0]));

      let popularSpecies = await collection1.find({ id: { '$in': keys } }).toArray();

      popularSpecies.forEach(s => {
        s.count = popularIds.find(f => parseInt(f[0]) === s.id)[1];
      });

      return exits.success(popularSpecies);
    }
    catch (error) {
      console.log(error);
      client.close();
      return exits.error();
    }
  }

};
