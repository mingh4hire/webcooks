const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { cookie } = require('express/lib/response');
const session = require('express-session');
const path = require('path')
const app = express();

// app.use('/', express.static('/bbc'));
// app.use('/aa', express.static('/'));
// app.use('/bb', express.static('/'));
// app.use('/', express.static('/'));
function loggedin(req, res, next) {
    console.log('req', req);

    console.log('in loggedin');
    console.log('req.params', req.params);
    console.log('req.query', req.query);
    console.log('req.body', req.body);
    if (req.cookies.loggedin === 'true') {
        next();
    }
    res.send('112211');
}

app.use(express.static('public'));
function ensureAuthenticated(req, res, next) {
    console.log('req', req);
    console.log('res', res);
    console.log('res',);
    res.send(req.cookies)
    res.send('asdfasdf');
    res.send()
    // console.log('next', next);
    // console.log('next' );
}
app.use('/admin', ensureAuthenticated);
app.use('/admin', express.static(path.join(__dirname, 'private')));
// app.use('/test', express.static(__dirname));

// app.use(loggedin, express.static('private'));
app.use(bodyParser.json());
app.use(cookieParser());
app.get('/bbbb', (req, res) => {

    res.status(400).sendFile(path.join(__dirname, 'index.html'));
    return;
    res.send('333');
    res.send('bbbb');
});
app.get('/a', (req, res) => {

    console.log(req.params);
    console.log(req.body);
    res.send('asdfds');

});
// app.get('/', (req, res) => {
//     console.log(req.params);
//     console.log(req.body);
//     res.send('asdfds');

// });

app.get('/b/:b', (req, res) => {
    res.send(req.params.b);

});

app.get('/bab', (req, res) => {
    res.send(req.query.b);

});

app.get('/ba/:b/:a', (req, res) => {
    res.send(req.params)//b + ' ' + req.a);
});
function getC() {
    return String.fromCharCode(65 + Math.floor(Math.random() * 26));
}
app.post('/getdata', (req, res) => {
    console.log('req.cookies.loggedin' === req.cookies.loggedin)
    if (req.cookies.loggedin === 'true') {
        console.log('sending logged in')
        res.send('logged in');
        return;
    }
    res.status(400);
    res.send({ a: 'asfdasdf' });
});
app.get('/getdata', (req, res) => {
    console.log('req.cookies.loggedin' === req.cookies.loggedin)
    if (req.cookies.loggedin === 'true') {
        console.log('sending logged in')
        res.send({ message: 'logged in' });
        return;
    }
    res.status(400);
    res.send({ a: 'asfdasdf' });
});
app.post('/login', (req, res) => {
    console.log('req.body.password ', req.body.password);
    console.log('req.session', req.session);
    if (req.body.password === '123123') {

        res.status(200);
        res.cookie('loggedin', true);
        res.send({ message: 'Success' });
        return;
    }
    res.status(400)
    res.send('fali');
}); app.get('/login', (req, res) => {
    if (req.query.password === '123123') {
        res.status(200);
        res.cookie('loggedin', true);
        res.send('success');
        return;
    }
    res.status(400)
    res.send('fali');
});

app.post('/logout', (req, res) => {
    res.cookie('loggedin', false);
    console.log(req.cookies);
    res.send(200);
});

app.get('/logout', (req, res) => {
    res.cookie('loggedin', false);
    console.log(req.cookies);
    res.send(200);
});


app.post('/post2', cookieParser(), (req, res) => {

    // res.cookie('bb', req.body.name);
    res.cookie('a', 'bcdef');
    res.cookie(getC() + getC(), getC() + getC());
    console.log(req.cookies);
    console.log(req.cookie);
    console.log('are cookies');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    console.log(res.cookies);
    console.log('cookies are ');
    console.log(res.cookies);
    res.send(req.cookies)//b + ' ' + req.a);
});
app.post('/post', cookieParser(), (req, res) => {
    // res.cookie('bb', req.body.name);
    res.cookie('a', 'aaa');
    res.cookie(getC() + getC(), getC() + getC());
    console.log(req.cookies);
    console.log(req.cookie);
    console.log('are cookies');
    console.log(req.body);
    console.log(req.params);
    console.log(req.query);
    res.send(req.cookies)//b + ' ' + req.a);
});

app.listen(80, function (e, er) {
    console.log(e, er);
});