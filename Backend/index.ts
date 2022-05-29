import express, {Request, Response, NextFunction} from 'express'
import session from 'express-session'
import passport from 'passport'
// @ts-ignore
import authentication from "./authentication/googleAuth";

const app = express();

function isLoggedIn(req: Request, res: Response, next: NextFunction) {
    req.user ? next() : res.sendStatus(401);
}

app.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('<a href="/auth/google">Authenticate with Google</a>');
});

app.get('/auth/google',
    passport.authenticate('google', { scope: [ 'email', 'profile' ] }
    ));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/protected',
        failureRedirect: '/auth/google/failure'
    })
);

app.get('/protected', isLoggedIn, (req: Request, res: Response) => {
    // @ts-ignore
    res.send(`Hello ${req.user.displayName}`);
});

app.get('/logout', (req: Request, res: Response) => {
    req.logout()
    // @ts-ignore
    req.session.destroy((err) => console.error(err))
    res.send('Goodbye!')
});

app.get('/auth/google/failure', (req: Request, res: Response) => {
    res.send('Failed to authenticate..');
});

app.listen(5000, () => console.log('listening on port: 5000'));

