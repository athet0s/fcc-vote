'use strict';

var Polls = require('../models/polls.js');
var shortid = require("shortid");

function PollHandler () {
	this.getPoll = function (req, res) {
		console.log(req.params.id);
		Polls
			.findOne({ id: req.params.id }, { '_id': false })
			.exec(function (err, result) {
				if (err) { throw err; }
				if(result){
			   		res.json(result.fields);
				}else res.end();
				
			});
	};
	this.createPoll = function (req, res, addr) {
	    console.log(JSON.stringify(req.body));
	    var id = shortid.generate(),
	    fields = [];
	    
	    for (var field in req.body){
	    	console.log(req.body[field]);
	    	fields.push({fieldName: req.body[field], votes:0, fieldId: fields.length});
	    }
	    
	    var poll = {id: id, userId: 'user', fields: fields};
	    Polls
	        .create(poll, function(err, poll) {
	            if (err) {throw err; } 
	        });
	    res.redirect( addr + '/' + id);
	};
	this.delPoll = function (req, res){
		Polls
			.remove({ id: req.params.id }, (err) => {
				if (err) {throw err; }
			});
		res.sendStatus(200);
	}
	this.addVote = function (req, res, addr){
		var id = req.params.id,
			fieldId = req.body.vote;
		console.log(id + 'this');
		Polls
			.findOne({id: id})
			.findOneAndUpdate( {'fields.fieldId' : fieldId}, {$inc : {'fields.$.votes': 1}}, function (err){
				if (err) {throw err; }
			});
		res.redirect( addr + '/' + id);
	}
}


module.exports = PollHandler;

