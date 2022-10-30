const os = require('os');

const objectId = {
  // eslint-disable-next-line prettier/prettier
    name: '{' + os.EOL +
    '\t \ttype: Schema.Types.ObjectId,' + os.EOL +
    '\t \tref: \'{ref}\'' + os.EOL +
    '\t}'
};

module.exports = objectId;
