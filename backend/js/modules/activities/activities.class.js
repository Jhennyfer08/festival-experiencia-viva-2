import { Database } from "../../config/database.js";

export class Activities {
    constructor(params = {}) {
        ((this.id = params.id ?? null),
            (this.name = params.name ?? null),
            (this.description = params.description ?? null),
            (this.position = params.position ?? null),
            (this.capacity = params.capacity ?? null),
            (this.image = params.image ?? null),
            (this.date = params.date ?? null),
            (this.time = params.time ?? null));
    }

    async findAll() {
        const database = new Database();

        const result = await database.executeQueryFile(
            "./sql/activities/findAll.sql",
        );
        return result;
    }

    async findById() {
        const database = new Database();

        const params = [this.id];
        const result = await database.executeQueryFile(
            "./sql/activities/findById.sql",
            params,
        );
        return result;
    }

    async create() {
        const database = new Database();

        const params = [
            this.name,
            this.description,
            this.position,
            this.capacity,
            this.image,
            this.date,
            this.time,
        ];

        const result = await database.executeQueryFile("./sql/activities/create.sql",
            params,
        );

        this.id = result.insertId;
    }

    async update() {
        const database = new Database();

        const params = [
            this.name,
            this.description,
            this.position,
            this.capacity,
            this.image,
            this.date,
            this.time,
            this.id,
        ];

        await database.executeQueryFile("./sql/activities/update.sql", params);
    }

    async delete() {
        const database = new Database();

        const params = [this.id];

        return await database.executeQueryFile(
            "./sql/activities/delete.sql",
            params,
        );
    }
}
