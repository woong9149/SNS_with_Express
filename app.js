const cookieParser = require('cookie-parser');
const express = require('express');
const session = require('express-session');
const flash = require('flash');
const conf = require('./appconf.json');

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));
app.set('port', process.env.PORT || 8081);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(conf.password));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret :conf.password,
    cookie : {
        httpOnly : true,
        secure : false,
    }
}));
app.use(flash());

app.listen(8001, () => {
    console.log("8001번 포트에서 서버 실행중입니다.");
})







