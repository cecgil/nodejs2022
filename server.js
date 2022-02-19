const http = require("http");

http.createServer((request, response) => {

    if(request.url == "/produto"){
        response.end(
            JSON.stringify({
                message: "Rota de Produto"
            })
        );
    }

    if(request.url == "/usuario"){
        response.end(
            JSON.stringify({
                message: "Rota de Usuario"
            })
        );
    }

    
}).listen(4001, () => console.log("Servidor está rodando na porta 4001"));

