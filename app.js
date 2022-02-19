const express = require("express");
const { randomUUID} = require("crypto")
const fs = require("fs");

const app = express();

app.use(express.json());

let products = [];

fs.readFile("products.json", "utf-8", (err, data) =>{
    if(err){
        console.log(err)
    }else {
        products = JSON.parse(data);
    }
});


//post => inserir um dado
//get => buscar dados
//put => alterar um dado
//delete => remover um dado

//body => sempre que eu quiser enviar dados para minha aplicação
//params => /product/id32132142343
//query => /product?id=340242342823¨%¨ 

app.post("/products", (request, response) =>{
    //nome e preço

    const {name, price} = request.body;
    const product = {
        name,
        price,
        id: randomUUID()
    }
    
    products.push(product);

    productFile()

    return response.json(product);

});

app.get("/products", (request, response) =>{
    return response.json(products);
})

app.get("/products/:id", (request, response) =>{
    const { id } = request.params;
    const product = products.find(product => product.id == id);
    return response.json(product);
})

app.put("/products/:id", (request, response) => {
    const { id } = request.params;
    const { name, price } = request.body;

    const productIndex = products.findIndex((product) => product.id == id);
    products[productIndex] = {
        ...products[productIndex],
        name,
        price
    };

    productFile();

    return response.json({ message: "Produto alterado"});
});

app.delete("/products/:id", (request, response) => {
    const { id } = request.params;

    const productIndex = products.findIndex((product) => product.id == id);


    products.splice(productIndex, 1);


    productFile();

    return response.json({message: "Produto removido com sucesso"});

})


function productFile() {
    fs.writeFile("products.json", JSON.stringify (products), (err) => {
        if(err){
            console.log(err)
        }else {
            console.log("Produto Inserido");
        }
    });
}


app.listen(4002, () => console.log("Servidor rodando na porta 4002"));