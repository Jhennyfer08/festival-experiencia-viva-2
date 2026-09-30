export class Validations {
    constructor(composition) {
        this.composition = composition
    }

    errorMessage(status, message){
        let error = new Error(message);
        error.status = status;
        throw error;
    }

    async verifiyId(){
        const result = await this.composition.findById();

        if (!result || result.length === 0) {
            this.errorMessage(404, "Registro não encontrado.");
        }
    }

    async verifyCapacity(){
        const capacity = this.composition.capacity;

        if (capacity < 1) {
            this.errorMessage(409, "A capacidade precisa ser maior que zero.");
        }
    }
}