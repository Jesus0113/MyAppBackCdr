

export default class BasicMongo {
    constructor(model) {
        this.model = model
    }

//Encuentra todo segun lo solicitado en la base de datos
    async findAll() {
        try {
            const response = await this.model.find();
            return response;
        } catch (error) {
            throw error;
        }
    }

//Encuentra en la BD por id
    async findById(id) {
        try {
            const response = await this.model.findById(id);
            return response;
        } catch (error) {
            throw error;
        }
    }

//Crea obj en la base de datos
    async createOne(obj) {
        try {
            const response = await this.model.create(obj);
            return response;            
        } catch (error) {
            throw error;
        }

    }

//Elimina por id en la base de datos
    async deleteOne(id) {
        try {
            const response = await this.model.findByIdAndDelete(id);
        return response;            
        } catch (error) {
            throw error;
        }
    }
}