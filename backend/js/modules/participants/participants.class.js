import { Database } from "../../config/database.js";

export class Participants {
    constructor(params = {}) {
        ((this.id = params.id ?? null),
            (this.name = params.name ?? null),
            (this.email = params.email ?? null),
            (this.password = params.password ?? null),
            (this.admin = params.admin ?? null));
    }

    async findAll() {
        const database = new Database();

        const result = await database.executeQueryFile(
            "./sql/participants/findAll.sql",
        );
        return result;
    }

    async findById() {
        const database = new Database();

        const params = [this.id];
        const result = await database.executeQueryFile(
            "./sql/participants/findById.sql",
            params,
        );
        return result;
    }

    async create() {
        const database = new Database();

        const params = [this.name, this.email, this.password];

        const result = await database.executeQueryFile(
            "./sql/participants/create.sql",
            params,
        );
        this.id = result.insertId;
    }

    async login() {
        const database = new Database();

        const params = [
            this.email,
            this.password
        ];

        const result = await database.executeQueryFile("./sql/participants/login.sql", params);
        return result;
    }

    async update() {
        const database = new Database();

        const params = [this.name, this.email, this.password, this.id];

        await database.executeQueryFile(
            "./sql/participants/update.sql",
            params,
        );
    }

    async delete() {
        const database = new Database();

        const params = [this.id];

        return await database.executeQueryFile(
            "./sql/participants/delete.sql",
            params,
        );
    }
}
