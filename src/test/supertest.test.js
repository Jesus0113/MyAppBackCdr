import supertest from "supertest";
import { expect } from "chai";

const requester = supertest('http://localhost:8082');

describe('Products enpoints', function(){
    describe('POST /api/products', ()=>{

        const mockProduct = {
            title: 'Python 03',
            price: 3500,
            description: 'programmin course',
            stock:50,
            code: '125xcx03',
            status: 'Available',
            owner: 'admin',
            category: 'couser'
        }

        it('should create a product', async ()=> {
            const response = await requester.post('/api/products').send(mockProduct);
            expect(response.statusCode).to.be.equal(200)
        });

    });

    describe('GET api/products', ()=>{
        it('get products', async ()=> {
            const response = await requester.get('/api/products');
            expect(response._body.allProducts.payload).to.be.an('array')
        });

        it('products not empty', async ()=> {
            const response = await requester.get('/api/products');
            expect(response._body.allProducts.payload[0]).to.be.an('object')
        });

    });

    describe('GET api/products/:{pid}',()=> {

        it('get one product by Id', async ()=> {
            const response = await requester.get('/api/products');
            const pid = response._body.allProducts.payload[0]._id
            const responseOneProduct = await requester.get(`/api/products/${pid}`);
            expect(responseOneProduct._body.product).to.be.an('object');           
        })
    });

    describe('DELETE api/products/:{pid}', ()=> {
        it('delete one product by Id', async ()=> {
            const response = await requester.get('/api/products');
            const pid = response._body.allProducts.payload[1]._id
            const responseOneProduct = await requester.delete(`/api/products/${pid}`);
            expect(responseOneProduct.statusCode).to.be.equal(200);        
        })

    });
});


// --------------------------------------------------


describe('Carts enpoints', function () {
    describe('POST api/carts', () => {

        const mockCart = {
            products: []
        }

        it('should create a cart', async () => {
            const response = await requester.post('/api/carts').send(mockCart);
            expect(response.statusCode).to.be.equal(200)
        });

    });

    describe('GET api/carts', () => {
        it('should get carts', async () => {
            const response = await requester.get('/api/carts');
            expect(response._body.carts[0]).to.be.an('object');
        })

    });

    describe('GET api/carts/:{cid}', () => {
        it('get one cart by Id', async () => {
            const response = await requester.get('/api/carts');
            const cid = response._body.carts[0]._id
            const responseOneCart = await requester.get(`/api/carts/${cid}`);
             expect(responseOneCart.statusCode).to.be.equal(200);
        })
    });


    describe('PUT api/carts/:{cid}/products/:{pid}', ()=> {
        it('shoould update the product', async ()=> {
            const response = await requester.get('/api/carts');
            const cid = response._body.carts[0]._id

            const responseOneProduct = await requester.get('/api/products');
            const pid = responseOneProduct._body.allProducts.payload[0]._id

//Se utiliza post por el frontend con handlebars pero el correcto es push
            const responseOneCart = await requester.post(`/api/carts/${cid}/products/${pid}`).send({
                amount: 3
            })
            expect(responseOneCart.statusCode).to.be.equal(200); 
        })
    });

    describe('DELETE api/carts/:{cid}', ()=> {
        it('Should delete the cart', async ()=> {
            const responseOneCart = await requester.get('/api/carts');
            const cid = responseOneCart._body.carts[0]._id
            const response = await requester.delete(`/api/carts/${cid}`)
            expect(response._body.message).to.be.equal('Cart deleted');
        })
    });
});

// --------------------------------------------------


describe('Sessions enpoints', function () {

    describe('POST /register', () => {

        const userMockRegister = {
            first_name: 'Jesus',
            last_name: 'Garcia',
            email: 'jesus@test.com',
            age: '29',
            role: 'admin',
            password: '12345',
        }

        it('should create a user', async () => {
            const response = await requester.post('/registro').send(userMockRegister);
            expect(response._body.message).to.be.equal('User created');
        });
    });

    describe('POST /login', ()=> {

        const userMockLogin = {
            email: 'jesus@test.com',
            password: '12345'
        }
        
        it('should login ', async ()=> {

            const response = await requester.post('/login').send(userMockLogin);
            const cookieValue = response.headers["set-cookie"][0].split("=")[0]
            // const containCookie = response.headers["set-cookie"][0].split("=")[1].split('; ')[0];
            expect(response.headers["set-cookie"][0].split("=")[0]).to.be.equal('token')
        });

    });


});