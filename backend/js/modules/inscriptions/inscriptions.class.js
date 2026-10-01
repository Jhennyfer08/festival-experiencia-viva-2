import { Database } from "../../config/database.js";

export class Inscriptions {
    constructor(params = {}) {
        ((this.id = params.id ?? null),
            (this.id_activity = params.id_activity ?? null),
            (this.id_participant = params.id_participant ?? null));
    }

    async findAll() {
        const database = new Database();

        const result = await database.executeQueryFile(
            "./sql/inscriptions/findAll.sql",
        );
        return result;
    }

    async create() {
        const database = new Database();

        const params = [this.id_activity, this.id_participant];

        const result = await database.executeQueryFile(
            "./sql/inscriptions/create.sql",
            params,
        );

        this.id = result.insertId;
    }

    async findCreated() {
        const database = new Database();

        const params = [this.id_activity, this.id_participant];
        const result = await database.executeQueryFile(
            "./sql/inscriptions/findCreated.sql",
            params,
        );
        return result;
    }

    async findCapacity() {
        const database = new Database();

        const params = [this.id_activity];
        const result = await database.executeQueryFile(
            "./sql/activities/findById.sql",
            params,
        );
        return result;
    }

        async update() {
        const database = new Database();

        const params = [
            this.id_activity,
            this.id_participant,
            this.id
        ];

        await database.executeQueryFile("./sql/inscriptions/update.sql", params);
    }

    async delete() {
        const database = new Database();

        const params = [this.id];

        return await database.executeQueryFile(
            "./sql/inscriptions/delete.sql",
            params,
        );
    }
}
