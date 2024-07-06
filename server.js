const http = require('http');
const fs = require("fs");


const server = http.createServer((req, res) => {
  // Your code here
  if (req.method === "GET" && req.url.startsWith("/static")) {
    //parse the route:
    let parsedUrl = req.url.split('/');//["static", "images", "dpg.jpg"]
    let parsedUrlLength = parsedUrl.length;//3
    const dirFile = parsedUrl[parsedUrlLength - 2];//images
    const requestedFile = parsedUrl[parsedUrlLength - 1];//"dog.jpg";
    const extensionArr = requestedFile.split(".");//["dog", "jpg"];
    const theFile = fs.readFileSync(`./assets/${dirFile}/${requestedFile}`)

    if (requestedFile === "dog.jpg") {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'image/jpg');
      return res.end(theFile);
    } else if (requestedFile === "application.css") {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/css');
      return res.end(theFile);
    }
  }
  //Phase 1:
  //How to send spesfic res to any request?
  else if (req.method === "GET" && req.url === "/") {
    const htmlpage = fs.readFileSync('index.html');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    return res.end(htmlpage);
  }



});

const port = 5000;

server.listen(port, () => console.log('Server is listening on port', port));
