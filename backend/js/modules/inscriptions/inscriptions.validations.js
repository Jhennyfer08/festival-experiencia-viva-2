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
        const [result] = await this.composition.findCapacity();

        if (result.capacity <= result.quantity) {
            this.errorMessage(409, "Não há mais vagas disponíveis nessa atividade.");
        }
    }

    async verifyCreated(){
        const result = await this.composition.findCreated();

        if (result.length > 0) {
            this.errorMessage(409, "Usuário já cadastrado nessa atividade.");
        }
    }
}