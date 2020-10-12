const kakaoStrategy = require('passport-kakao').Strategy;
const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new kakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL : 'http://localhost:8001/auth/kakao/callback',
    }, async(accessToken, refreshToken, profile, done) => {
        console.log('kakao profile', profile);
        try {
            const exUser = await User.findOne({ where : {snsId: profile, provider: 'kakao'}});
            if(exUser){
                done(null, exUser);
            }else{
                const newUser = await User.create({
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider : 'kakao',
                });
                done(null, newUser);
            }
        } catch (error) {
            console.error('에러: ', error);
            done(error);
        }
    }));
};









