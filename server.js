var http = require('http');
var fs = require('fs');
var path = require('path');

const PORT=3000;

function handleRequest(request, response) {
	var filePath = "." + request.url;
	var contentType = 'application/json';

	fs.readFile(filePath, function(err, content){
		console.log("path " + filePath)
		response.setHeader('Access-Control-Allow-Origin', '*');
		response.setHeader('Access-Control-Allow-Methods', 'GET');
		response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
		response.setHeader('Access-Control-Allow-Credentials', true);

		if(err){
			response.writeHead(500);
            response.end('Internal Server Error: '+err.code+' ..\n');
            response.end(); 
		} else {
			response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf-8');
		}
	})
	
}

var server = http.createServer(handleRequest);

server.listen(PORT, function(){
	console.log("server listening on port:%s ", PORT)
})