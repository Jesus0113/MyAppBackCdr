import { Router } from "express";
import { transporter } from "../nodemailer.js";

const router = Router();

router.get('/', async (req, res)=> {
    const messageOpt = {
        from: "coderhouse43400",
        to: "jesusg0113@gmail.com",
        subject: "Message 43400",
        text: "My first email 43400",
        // html: '<h1>Mi primer h1</h1>',
        // attachments: [{ path: __dirname + "/imageEjemplo.jpeg" }],


    };
    await transporter.sendMail(messageOpt);
    res.send('mail send')

})



export default router;