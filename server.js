/*var http = require('http');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function(req, res) {
  file.serve(req, res);
}).listen(4003);

console.log('Server running on port 4003');*/

// var formidable = require('formidable');
var fs = require('fs');

var bodyParser = require('body-parser')


var express =   require('express');
var multer  =   require('multer');
var app =   express();
var storage =   multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now() + '.png');
  }
});
var upload = multer({ storage : storage}).single('puzzleImg');

// var http = require('http');
// var url = require('url');
// var qs = require('querystring');
// var static = require('node-static');
// var file = new static.Server('.');
var path = require('path');

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/vote',function(req,res){
  // через 1.5 секунды ответить сообщением
  setTimeout(function() {
    res.end('Ваш голос принят: ' + new Date());
  }, 1500);
});

app.post('/api/photo',function(req,res){

  upload(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");

  });
});
app.post('/img-load',function(req,res){
  upload(req,res,function(err) {
    if(err) {
      return res.end("Error uploading file.");
    }
    res.end("File is uploaded");

  });
});

app.listen(3000,function(){
  console.log("Working on port 3000");
});

/*
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

 var img = post['image-file'];

 });
 // res.write('<script>setTimeout(function () { window.location.href = "/"; }, 0);</script>');
 res.writeHead(302, { //no redirection
 'Location': '/'
 });
 res.end(img);

 } else {
 // иначе считаем это запросом к обычному файлу и выводим его
 file.serve(req, res); // (если он есть)
 }
 }
 */


/*// ------ этот код запускает веб-сервер -------

 if (!module.parent) {
 http.createServer(accept).listen(4002);
 } else {
 exports.accept = accept;
 }*/
