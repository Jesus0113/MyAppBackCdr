import express from 'express';
import newProducts from './productsManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Rutes

app.get('/api/products', async (req, res) => {

  try {

    const products = await newProducts.getProducts();
    res.status(200).json({ message: 'Products', products });

  } catch (error) {
    res.status(500).json({ error });
    res.send("there's error")
  }

});

app.get('/api/products/:id', async (req, res) => {

  const { id } = req.params;

  try {

    const product = await newProducts.getProductById(+id);
    res.status(200).json({ message: 'User' }, product);

  } catch (error) {
    res.status(500).json({ error });
  }

});


app.post('/api/products', async (req, res) => {
  try {

    const newProduct = await newProducts.addProduct(req.body);
    res.status(200).json({ message: 'Product created', product: newProduct })

  } catch (error) {
    res.status(500).json({ error });
  }

});

app.put('/api/products/:id', async (req, res)=>{

  const {id} = req.params;
  try {

    const productUpdate = await newProducts.updateProduct(+id, req.body);
    res.status(200).json({message: 'product update',})
    
  } catch (error) {
    res.status(500).json({ error });
  }
})

app.delete('/api/products/:id', async (req, res) => {

  const { id } = req.params;

  try {

    const product = await newProducts.deleteProduct(+id);

    res.status(200).json({ message: 'User' }, product);

  } catch (error) {
    res.status(500).json({ error });

  }

})




app.listen(8080, () => {
  console.log('Escuchando el puerto 8080');
})