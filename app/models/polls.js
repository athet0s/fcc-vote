'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Poll = new Schema({
	_id: String,
	id: String,
	userId: String,
	fields: [new Schema({fieldName: String,
						votes: Number,
						_id: Number})
			]});
module.exports = mongoose.model('Poll', Poll);