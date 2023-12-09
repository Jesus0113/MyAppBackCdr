import swaggerJSDoc from "swagger-jsdoc"
import { setup, serve } from "swagger-ui-express"
import swaggerUiExpress from "swagger-ui-express"
import { __dirname } from "../utils.js"


const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Documentacion de MyCoderAppBackend",
            description: "Api Rest de Ecommerce Coder",
        },
    },
    apis: [`${__dirname}/docs/**/*.yaml`]
};

export const specs = swaggerJSDoc(swaggerOptions)

//Ejemplo

// app.use('/api/docs, swaggerUiExpress.serve, swaggerUiExpress.setup(specs));