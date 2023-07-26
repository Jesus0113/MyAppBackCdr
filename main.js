class ProductManager{
    constructor(){
        this.products = [];
    }
    #newId(){
        const id = this.products.length === 0 ? 1 : this.products[this.products.length - 1].id + 1;
        return id;
    }

    addProduct(title, description, price, thumbnail, code, stock){

        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log('All fields are required');
            return;
        }

        const codeValidator = this.products.find(prod => prod.code === code);
        
        if(codeValidator){
            console.log('repeated code');
            return;
        }

         const product = {
             id : this.#newId(),
             title,
             description, 
             price, 
             thumbnail, 
             code, 
             stock
         }

         this.products.push(product);

    }

    getProducts(){
        console.log(this.products); 
    }

    getProductById(id){
        const idValidator = this.products.find(prod => prod.id === Number(id));

        idValidator ? console.log(idValidator) : console.log('Not found');

    }
}

const newProducts = new ProductManager();

newProducts.addProduct('NodeJs', 'programmin course', 100000, 'Sin imagen', 123, 50);
// newProducts.addProduct('React JS', 'programmin course', 50000, 'Sin imagen', 456, 20);
// newProducts.getProducts();
newProducts.getProductById(1);


