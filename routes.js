const fs = require('fs');
const he = require('he');
const main = (req, res) => {
    const url = req.url;
    const method = req.method; 

    if(url === '/'){
        res.write('<html>');
        res.write('<head><title>Enter Message</title><head>');
        res.write('<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
        res.write('</html>');
        return res.end();
    }
    //process.exit();
    if(url === '/message' && method === 'POST'){
        const body = [];
        req.on('data', (chunk) => {
        console.log(chunk);
        body.push(chunk);
        });  

        return req.on('end', () => {
        
        const parsedBody = Buffer.concat(body).toString();
        const message = parsedBody.split('=')[1];     
        const decodedMessage = he.decode(decodeURIComponent(message));       
        fs.writeFile('message.txt', decodedMessage, { encoding: 'utf-8' }, err => {
            res.writeHead(302, { 'Location': '/' });
            return res.end();
            });
        });
    }
    
    res.setHeader('Content-Type', 'text/html');
    res.write('<html>');
    res.write('<head><title>My First Page</title><head>');
    res.write('<body><h1>Hello from my Node.js Server!</h1></body>')
    res.write('</html>');
    res.end();
}

// module.exports = requestHandler;

// module.exports.handler = requestHandler;
// module.exports.SomeText = 'Some text';

// module.exports = {
//     handler: requestHandler,
//     SomeText: 'Some text'
// };

module.exports = main;