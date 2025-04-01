//Start with npm init -y , it will create a package.json, where you add line:
//"type": "module" - This tells Node.js to treat your .js files as ES Modules.
//technically it just says: treat json as a library/module that can be included in the code

import http from 'http';

const port = process.env.PORT || 3000;
//the same as "http.createServer(function(req, res) {...})"
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
    res.end(JSON.stringify({message: "Hello"}));
    //stringify converts a JavaScript object into a JSON-formatted string, which is needed for HTTP responses.
});


// Метод server.listen() запускает сервер на указанном порту, а функция (callback) 
// в качестве второго аргумента выполняется, когда сервер успешно начинает работать.
//the same as "server.listen(3000, function() {...})"
server.listen(3000, () => {
    console.log("Server is workling");
})

