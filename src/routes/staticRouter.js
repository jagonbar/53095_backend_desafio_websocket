import { Router }     from "express";
import ProductManager    from '../util/ProductManager.js'
import {dataFileProduct} from '../util/filePaths.js'

const staticRouter = Router();
const pm = new ProductManager(dataFileProduct)

staticRouter.get('/', (req, res)=>{
    res.render('home', {
      css: 'main.css',
      js: 'main.js'  
    })
})

staticRouter.get('/products', async (req, res) => {
    let response, hayProductos

    try {
        
        response = await pm.getProducts();
        
        if (req.query.limit) {
            const limit = req.query.limit;
            if (!Validador.validarNumero(limit)) return res.status(400).send("El limite debe ser un numero");
            if (!Validador.validarNumero(limit, 1)) return res.status(400).send("El limite debe partir desde 1");
            if (!Validador.validarNumeroEntero(limit)) return res.status(400).send("El limite debe ser número entero");

            response = response.slice(0, limit);
        }
        hayProductos = (response.length>0)
        // res.status(200).send(response);
    } catch (error) {
        console.error(error);
        // res.status(500).send("error_al_listar_productos");
    }
    res.render('products', {
        css: 'main.css',
        js: 'main.js',
        hayProductos:hayProductos,
        products:response,

      })

})


export default staticRouter