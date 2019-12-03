module.exports = {

  friendlyName: 'View test',
  description: 'Display "Test" page.',


  exits: {

    success: {
      viewTemplatePath: 'pages/starwar/home'
    }

  },


  fn: async function () {

    // Respond with view.
    return {
      layout: false
    };
  }

};
