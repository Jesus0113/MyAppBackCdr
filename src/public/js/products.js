const socketClient = io();

const cartMain = document.getElementById('cartMain');

const formAddProduct = document.getElementById('formAdd');
const idProductInput = document.getElementById('idProduct')
const amountInput = document.getElementById('amount');

const formDeleteProduct = document.getElementById('formDelete');
const idProductDelete = document.getElementById('idProductDelete');

const comprar = () => {
    const cartID = document.activeElement.offsetParent.childNodes[9].innerText;
    const user = document.activeElement.offsetParent.childNodes[3].ownerDocument.documentElement.children[2].children[3].outerText;
    
    const newTicket = {
        //cart: cartID,
        email:user
    } 

    socketClient.emit('buyCart', newTicket )
}


formAddProduct.onsubmit = (e) => {
    e.preventDefault();

    const pathCart = document.activeElement.offsetParent.childNodes[9].innerText;

    const prod = {
        cart: pathCart,
        product: idProductInput.value,
        amount: amountInput.value
    }

    socketClient.emit('addProdCart', prod);
}

socketClient.on('viewCart', cartUpdate => {

    const containerCart = cartUpdate.products.map(p => {
        console.log(p);
        return (`
            <div class="cartItem" >          
            <p>Product: ${p.product.title}</p>
            <p>Price: ${p.product.price}</p>
             <p>Quantify: ${p.quantify}</p>
             <p>Total: ${p.total}</p>
            </div>         
            `)
    })
     cartMain.innerHTML = containerCart;

});

formDeleteProduct.onsubmit = (e) => {
    e.preventDefault();

    // const pathUser = document.activeElement.offsetParent.childNodes[3].ownerDocument.documentElement.children[2].children[3].outerText;
    const pathCart = document.activeElement.offsetParent.childNodes[9].innerText;

    const prod = {
        cart: pathCart,
        // user: pathUser,
        idProduct: idProductDelete.value
    }

    socketClient.emit('deleteProdCart', prod);

}







