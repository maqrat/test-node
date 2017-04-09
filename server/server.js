/*var http = require('http');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(4003);

console.log('Server running on port 4003');*/

var http = require('http');
var url = require('url');
var qs = require('querystring');
var static = require('node-static');
var file = new static.Server('.');


function accept(req, res) {

  console.log('Server running on port 4002');
  // console.log(req.url);
  // console.log(req.method);

  // если URL запроса /vote, то...
  if (req.url == '/vote') {
    // через 1.5 секунды ответить сообщением
    setTimeout(function() {
      res.end('Ваш голос принят: ' + new Date());
    }, 1500);

  } else if (req.url == '/subm') {

    // res.end(console.log("req.url/subm"));
    res.end("req.url/subm");

  } else if (req.url == '/subm-form' && req.method == 'POST') {

    console.log(req.method);

    var body = '';

    req.on('data', function (data) {
      body += data;

      // Too much POST data, kill the connection!
      // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
      if (body.length > 1e6) {
        req.connection.destroy();
      }

      console.log(body.length);
    });

    req.on('end', function () {
      var post = qs.parse(body);
      // use post['blah'], etc.
      console.log(post);
      console.log(post.randomt);

    });
    // res.write('<script>setTimeout(function () { window.location.href = "/"; }, 0);</script>');
    res.writeHead(302, { //no redirection
      'Location': '/'
    });
    res.end("form respond");

  } else {
    // иначе считаем это запросом к обычному файлу и выводим его
    file.serve(req, res); // (если он есть)
  }
}


// ------ этот код запускает веб-сервер -------

if (!module.parent) {
  http.createServer(accept).listen(4002);
} else {
  exports.accept = accept;
}
