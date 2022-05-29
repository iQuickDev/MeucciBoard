import envVars from "../env-vars";
import passport from 'passport'
// @ts-ignore
import {Strategy as GoogleStrategy} from 'passport-google-oauth2';


const GOOGLE_CLIENT_ID = envVars.googleClientId
const GOOGLE_CLIENT_SECRET = envVars.googleClientSecret

passport.use(new GoogleStrategy({
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: "http://localhost:5000/auth/google/callback",
        passReqToCallback: true,
    },
    function(request: any, accessToken: any, refreshToken: any, profile: any, done: any) {
        return done(null, profile);
    }));

passport.serializeUser(function(user: any, done: any) {
    done(null, user);
});

passport.deserializeUser(function(user: any, done: any) {
    done(null, user);
});
