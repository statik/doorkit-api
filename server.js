var restify = require('restify');
var pif = require('caf_piface');

var server = restify.createServer({
  name: 'Doorkit API',
});

// Make life easier for curl testing
server.pre(restify.pre.userAgentConnection());
server.use(restify.queryParser());
server.use(restify.bodyParser({ mapParams: true }));
server.use(restify.jsonp());
// parse out the auth header into req.username, req.authorization.basic.password
// later this should be upgraded to something more sophisticated
server.use(restify.authorizationParser());

// TODO: throttline via restify.throttle

var PORT = process.env.PORT || 5000;

// Setup our PiFace to receive commands
var piface = new pif.PiFace();
piface.init();

function openLatchV1(req, res, next) {
    setTimeout(function () {
        if (piface.read(0)) {
            piface.write(0,0);
        }, 10 * 1000); // reset the latch after 10 seconds
    piface.write(1, 0);
    res.json({
      message: 'Latch opened',
      code: 0
    });
    return next();
}
var LATCH = '/latch/:command';
server.get({path: LATCH, version: '1.0.0'}, openLatchV1);

server.get({path: '/hello/:name', name: 'GetFoo'}, function respond(req, res, next) {
    res.send({
        hello: req.params.name
    });
    return next();
});

server.listen(PORT, function() {
  console.log('api server listening: %s', server.url);
});

