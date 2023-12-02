import { ticketModel } from "../../mongoDB/models/ticket.model.js";
import BasicMongo from "./basicMongo.js";

class TicketsManager extends BasicMongo {
    constructor(){
        super(ticketModel);
    }

}

export const ticketsManager = new TicketsManager()