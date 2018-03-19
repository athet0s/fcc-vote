'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	id: String,
	userId: String,
	fields: [{fieldName: String, votes: Number, fieldId: Number}]
});

module.exports = mongoose.model('Poll', Poll);