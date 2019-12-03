module.exports = {
  friendlyName: 'Longest crawl film',
  description: '',

  inputs: {},

  exits: {},


  fn: async function (inputs, exits) {
    const { db, client } = await sails.helpers.starwarDb();
    const collection = db.collection('films');

    try {
      let films = await collection.find({}).toArray();

      let sortedByCrawlLength =
        // filter Films with Null Crawl
        films
          .filter(f => f.opening_crawl)
          .sort((a, b) => b.opening_crawl.length - a.opening_crawl.length);

      let longestCrawl = sortedByCrawlLength.length > 0 ? sortedByCrawlLength[0] : null;

      return exits.success(longestCrawl);
    }
    catch (error) {
      console.log(error);
      client.close();
      return exits.error();
    }
  }

};
