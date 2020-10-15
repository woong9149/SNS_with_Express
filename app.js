const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('dotenv').config();//dotenv를 사용

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const postRouter = require('./routes/post');
const userRouter = require('./routes/user');
const { sequelize } = require('./models');
const passportConfig = require('./passport'); //폴더내의 index.js 파일은 require시 이름을 생략할 수 있다.

const app = express();
sequelize.sync();
passportConfig(passport); 

app.set('view engine', 'pug');
app.set('views', path.join(__dirname,'views'));
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended : false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave : false,
    saveUninitialized : false,
    secret :process.env.COOKIE_SECRET,
    cookie : {
        httpOnly : true,
        secure : false,
    }
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/post',postRouter);
app.use('/user', userRouter);
app.listen(app.get('port'), () => {//app.set 한 것을 app.get으로 가져올 수 있음
    console.log(`${app.get('port')}번 포트에서 서버 실행중입니다.`);
})







