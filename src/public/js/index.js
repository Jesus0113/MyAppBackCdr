const socketClient = io();

const formulario = document.getElementById('form');
const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const statusPro = document.getElementById('status');
const code = document.getElementById('code');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const container = document.getElementById('container')



formulario.onsubmit = (e) =>{
    e.preventDefault();

    const productsOn = {
        title : title.value,
        description: description.value,
        price: price.value,
        status: statusPro.value,
        code: code.value,
        stock: stock.value,
        category: category.value
    }

    socketClient.emit('productOnline', productsOn );

};

socketClient.on('allProducts', allProd =>{

    const containerPr = allProd.map(p=>{
        return p
    }).join(' ')

    container.innerHTML = containerPr;
    
} )