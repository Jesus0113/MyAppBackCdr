import {dirname} from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import  jwt  from 'jsonwebtoken';
import config from './config.dotenv.js';
import { faker } from '@faker-js/faker';

const JWT_SECRET_KEY = config.jwt_secret_key


//__dirname
export const __dirname = dirname(fileURLToPath(import.meta.url));


//Hash data (Global)
export const hashData = async(data)=>{
    return bcrypt.hash(data,10)
};

//Compare data (Global)
export const compareData = async(data, hashData)=>{
    return bcrypt.compare(data,hashData)
}

//JWT

export const generateToken = (user)=>{
    const token = jwt.sign({user}, JWT_SECRET_KEY, {expiresIn: '1h'} )
    return token
}

//verify token

export const verifyToken = (token) =>{
    const tokenCompare = jwt.verify(token, JWT_SECRET_KEY, (err, decoded)=>{
        if(err){
            return false
        }else{
            return true
        }
    })
    return tokenCompare
}

//Genera mocks

export const generateProductMocks = () => {
    const product = {
        _id: faker.database.mongodbObjectId() ,
        title : faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        price: faker.commerce.price({ min: 100, max: 500, dec: 2, symbol: '$' }),
        status: 'Available',
        code: faker.finance.bic({ includeBranchCode: false }),
        stock: faker.number.int(100) ,
        category: faker.commerce.department()
    }

    return product
}



