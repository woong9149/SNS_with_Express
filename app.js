const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
require('dotenv').config();//dotenv를 사용

const app = express();

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));
app.set('port', process.env.PORT || 8081);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOCIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret :process.env.COOCIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    }
}));
app.use(flash());

app.listen(app.get('port'), () => {//app.set 한 것을 app.get으로 가져올 수 있음
    console.log(`${app.get('port')}번 포트에서 서버 실행중입니다.`);
})







