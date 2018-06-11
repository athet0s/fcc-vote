'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var PollHandler = require(path + '/app/controllers/pollHandler.server.js');

module.exports = function (app, passport) {

	function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		} else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();
	var pollHandler = new PollHandler();
	
	app.route('/')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function (req, res) {
			res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function (req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/api/:id')
		.get(isLoggedIn, function (req, res) {
			res.json(req.user.github);
		});

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
	app.route('/create')
		.post(function(req, res){
			pollHandler.createPoll(req, res, '/poll');
		});
	app.route('/poll/:id')
		.get(function(req, res) {
			res.sendFile(path + '/public/poll.html');
		});
	app.route('/poll/:id')
		.post(function(req, res) {
			pollHandler.addVote(req, res, '/poll');
		});
	app.route('/api/:id/polls')
		.get(function(req, res) {
		    pollHandler.getPoll(req, res);
		});
	app.route('/api/:id/polls')
		.delete(function(req, res) {
		    pollHandler.delPoll(req, res);
		});
	app.route('/404')
		.get(function(req, res) {
			res.sendFile(path + '/public/404.html');
		});
};
