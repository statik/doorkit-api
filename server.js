var restify = require('restify');

var server = restify.createServer({
  name: 'Doorkit API',
});

// Make life easier for curl testing
server.pre(restify.pre.userAgentConnection());
server.use(restify.queryParser());
server.use(restify.bodyParser({ mapParams: true }));
// parse out the auth header into req.username, req.authorization.basic.password
// later this should be upgraded to something more sophisticated
server.use(restify.authorizationParser());

// TODO: throttline via restify.throttle

var PORT = process.env.PORT || 5000;


function openLatchV1(req, res, next) {
    res.json({
      message: 'not implemented yet',
      code: 1234
    });
    return next();
}
var LATCH = '/latch/:command';
server.get({path: LATCH, version: '1.0.0'}, openLatchV1);

server.get({path: '/hello/:name', name: 'GetFoo'}, function respond(req, res, next) {
    res.json({
        hello: req.params.name
    });
    return next();
});

server.listen(PORT, function() {
  console.log('api server listening: %s', server.url);
});

