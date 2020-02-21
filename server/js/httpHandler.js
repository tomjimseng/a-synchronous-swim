const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
module.exports.initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);
  res.writeHead(200, headers);

  switch (req.method) {
    case 'GET':
      //random command
      var commands = ['up', 'down', 'left', 'right'];
      var index = Math.floor(Math.random() * commands.length);

      res.end(commands[index]);

    default:
      res.end();
  }

  next(); // invoke next() at the end of a request to help with testing!

};
