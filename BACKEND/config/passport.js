const JwtStrategy = require('passport-jwt').Strategy,
ExtractJwt = require('passport-jwt').ExtractJwt;

const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id).then(user =>{
            if(!user){
                return done(null, false, { message: 'Wrong JWT Token' });
            }
            const exp = jwt_payload.exp;
            const nbf = jwt_payload.nbf;
            const current = ~~(new Date().getTime() / 1000);
            if (current > exp || current < nbf) {
                return done(null, false, { message: 'Token Expired' });
            }
            return done(null, user);
        })
        .catch(err => console.log(err));
    }));
}