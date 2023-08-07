const socketClient = io();

const formulario = document.getElementById('form');
const title = document.getElementById('title');
const description = document.getElementById('description');
const price = document.getElementById('price');
const statusPro = document.getElementById('status');
const code = document.getElementById('code');
const stock = document.getElementById('stock');
const category = document.getElementById('category');
const container = document.getElementById('container');
const formDelete = document.getElementById('formDelete')
 const deleteId = document.getElementById('deleteId')






formulario.onsubmit = (e) => {

    e.preventDefault();

    const productsOn = {
        title: title.value,
        description: description.value,
        price: price.value,
        status: statusPro.value,
        code: code.value,
        stock: stock.value,
        category: category.value
    }

    if (title.value === "" || description.value === "" || price.value === "" || statusPro.value === "" || code.value === "" || stock.value === "" || category.value === "") {
        Toastify({

            text: "All fields are required",
            duration: 3000,

            style: {
                background: "linear-gradient(148deg, rgba(255,191,63,1) 34%, rgba(255,93,0,1) 86%)",
                color: "black"
            },


        }).showToast();

    } else {
        socketClient.emit('productOnline', productsOn);
    }



};

socketClient.on('errorCode', () => {
    Toastify({

        text: "REPEATED CODE OR DOES NOT EXIST (TRY AGAIN)",
        duration: 3000,

        style: {
            background: "linear-gradient(148deg, rgba(255,191,63,1) 34%, rgba(255,93,0,1) 86%)",
            color: "black"
        },


    }).showToast();
});

socketClient.on('initPro', readProducts => {


    const containerPr = readProducts.map(p => {
        return `
        <div class="card">          
        <p>Title: ${p.title}</p>
        <p> Description: ${p.description}</p>
        <p>Price: ${p.price}</p>
        <p>Status: ${p.status}</p>
        <p>Code: ${p.code}</p>
        <p>Stock: ${p.stock}</p>
        <p>Category: ${p.category}</p>
        <button class="deleteC" id="delete">Delete</button>
        </div>         
        `
    })

    container.innerHTML = containerPr;

});

socketClient.on('allPro', readProducts => {

    Toastify({

        text: "Added product",
        duration: 3000,

        style: {
            background: "linear-gradient(148deg, rgba(255,191,63,1) 34%, rgba(255,93,0,1) 86%)",
            color: "black"
        },


    }).showToast();

    const containerPr = readProducts.map(p => {
        return `
          <div class="card">          
          <p>Title: ${p.title}</p>
          <p> Description: ${p.description}</p>
          <p>Price: ${p.price}</p>
          <p>Status: ${p.status}</p>
          <p>Code: ${p.code}</p>
          <p>Stock: ${p.stock}</p>
          <p>Category: ${p.category}</p>
          <button id="delete">Delete</button>
          </div>         
          `
    })

    container.innerHTML = containerPr;

});

formDelete.onsubmit = (e)=>{

    e.preventDefault();

    console.log(deleteId.value);

    socketClient.emit('deleteProductForId', deleteId.value )

}


