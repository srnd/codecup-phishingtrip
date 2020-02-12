const jwt = require('jsonwebtoken');
const url = require('url');
const mailer = require('nodemailer').createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT || 465,
  secure: ['0', 'false', 'no'].indexOf(process.env.MAIL_SECURE) === -1,
  auth: {
    user: process.env.MAIL_USERNAME,
    pass: process.env.MAIL_PASSWORD,
  }
});

const aud = 'phishing-trip';
exports.fullUrl = (req, path) => url.format({
    protocol: req.protocol,
    host: req.get('host'),
    pathname: path
  });
exports.makeLink = (email) => jwt.sign({ email, aud, }, process.env.SECRET);
exports.getEmailFromLink = (link) => jwt.verify(link, process.env.SECRET, {
    algorithms: ['HS256'],
    audience: aud,
  })
  ? jwt.decode(link).email
  : null;

const targetCookie = 'targetPassword';
exports.isTarget = (req) => req.cookies[targetCookie] === process.env.TARGET_PASSWORD;
exports.setTargetCookie = (res, password) => res.cookie(targetCookie, password, { maxAge: 60*60*24*31*1000 });

exports.emailFlag = (to) => mailer.sendMail({
  from: `"${process.env.TARGET_NAME}" <${process.env.MAIL_FROM}>`,
  to,
  subject: `CodeCup Phishing Flag From ${process.env.TARGET_NAME}`,
  text: `You got me! Your flag is: ${process.env.FLAG}\n\n(You need to paste this into CodeCup to get the points.)`,
}, console.log);
