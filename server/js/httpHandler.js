const fs = require('fs');
const path = require('path');
const headers = require('./cors');
const multipart = require('./multipartUtils');
const messages = require('./messageQueue');

// Path for the background image ///////////////////////
module.exports.backgroundImageFile = path.join('.', 'background.jpg');
////////////////////////////////////////////////////////

let messageQueue = null;
const initialize = (queue) => {
  messageQueue = queue;
};

module.exports.router = (req, res, next = ()=>{}) => {
  console.log('Serving request type ' + req.method + ' for url ' + req.url);


  switch (req.method) {
    case 'GET':

      switch (req.url) {
        case '/':

          initialize(messages.messages);
          res.writeHead(200, headers);
          res.end(messages.dequeue(messageQueue));
          break;

        case '/background.jpg':
          fs.readFile(module.exports.backgroundImageFile, (err, data) => {

            if (err) {
              res.writeHead(404, headers);
              res.end();

            } else {
              res.writeHead(200, headers);
              res.end();

            }
          });
          break;

        default:
          res.writeHead(404, headers);
      }

      break;

    // case 'POST':
    //   fs.writeFile(req.url, req.fileData, (err) => {
    //     if (err) throw err;
    //   }, res.writeHead(201, headers));

    //   res.end();
    //   break;

    default:
      res.writeHead(200, headers);
      res.end();
  }

  next(); // invoke next() at the end of a request to help with testing!

};
