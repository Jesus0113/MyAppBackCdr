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

socketClient.on('errorCode', ()=>{
    Toastify({

        text: "REPEATED CODE (TRY AGAIN)",
        duration: 3000,

        style: {
            background: "linear-gradient(148deg, rgba(255,191,63,1) 34%, rgba(255,93,0,1) 86%)",
            color: "black"
          },
          
        
        }).showToast();
})

socketClient.on('initPro', readProducts =>{

    const containerPr = readProducts.map(p=>{
        return `
        <div class="card">          
        <p>${p.title}</p>
        <p>${p.description}</p>
        <p>${p.price}</p>
        <p>${p.status}</p>
        <p>${p.code}</p>
        <p>${p.stock}</p>
        <p>${p.category}</p>
        <button id="delete">Delete</button>
        </div>         
        `
    })

    container.innerHTML = containerPr;
  
})

 socketClient.on('allPro', readProducts =>{

      const containerPr = readProducts.map(p=>{
          return `
          <div class="card">          
          <p>${p.title}</p>
          <p>${p.description}</p>
          <p>${p.price}</p>
          <p>${p.status}</p>
          <p>${p.code}</p>
          <p>${p.stock}</p>
          <p>${p.category}</p>
          <button id="delete">Delete</button>
          </div>         
          `
      })

      container.innerHTML = containerPr;
    
 })
