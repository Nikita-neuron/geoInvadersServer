const {Schema, model} = require('mongoose');

const Region = new Schema({
  username: {type: String, required: true},
  latitude: {type: Number, required: true},
  longitude: {type: Number, required: true},
  rgb: {type: String, required: true}
});

module.exports = model('Region', Region);