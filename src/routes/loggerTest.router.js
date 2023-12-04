import { Router } from "express";
import { logger } from "../winston.js";
import configDotenv from "../config.dotenv.js";
const router = Router();

router.get('/', (req, res) => {

    logger.fatal('Logger fatal')
    logger.error('Logger error')
    logger.warning('Logger warning')
    logger.info('Logger info')
    logger.http('Logger http')
    logger.debug('Logger debug')
    
    res.send('Logger winston')

});


export default router;