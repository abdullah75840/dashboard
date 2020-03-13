const mongoose = require('mongoose');
const {mongoUri} = require('../config');

module.exports = () => {
    mongoose.connect(mongoUri, {
        useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true,
      }).then(() => console.log('MongoDB Connected...'));
}