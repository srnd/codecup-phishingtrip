const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const target = require('./target');

const port = process.env.PORT || 8080;
const app = express();
app.set('view engine', 'jade');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use((req, res, next) => {
  res.locals = {
    isTarget: target.isTarget(req),
    targetName: process.env.TARGET_NAME,
  };
  next();
})

app.get('/', (req, res) => res.render('index'));
app.post('/', (req, res) => res.render('index', {
    link: target.fullUrl(req, `/evil/${target.makeLink(req.body.email)}`),
  }));

app.get('/login', (req, res) => res.render('login'));
app.post('/login', (req, res) => { target.setTargetCookie(res, req.body.password); res.redirect('/login'); })

app.get('/evil/:link', (req, res) => {
  res.render('click');
  if (target.isTarget(req))
    target.emailFlag(target.getEmailFromLink(req.params.link));
});

app.listen(port, () => console.log(`Listening on http://0.0.0.0:${port}/`));
