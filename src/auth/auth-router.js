const express = require('express');
const xss = require('xss');
const md5 = require('md5');

const AuthService = require('./auth-service');

const authRouter = express.Router();
const jsonParser = express.json();

const serializeUser = (user) => ({
  id: user.id,
  firstname: xss(user.firstname),
  lastname: xss(user.lastname),
  email: xss(user.email),
  date_created: user.date_created,
  p_word: user.p_word,
});

authRouter
  .route('/')
  .post(jsonParser, function (req, res) {
    let { email, p_word } = req.body;
    p_word = md5(p_word);

    AuthService.getUser(
      req.app.get('db'), email
    )
    .then((data) => {
      if (data) {
        const user = serializeUser(data);
        req.session.user = user;
        res.json({ "status": 'success', "id": user.id });
      }
      for (const [key, value] of Object.entries(data)) {
        if (value == null) {
          return res.status(400).json({
            error: { message: `Missing '${key}' in request body` },
          });
        }
      }
    });
});

module.exports = authRouter;
