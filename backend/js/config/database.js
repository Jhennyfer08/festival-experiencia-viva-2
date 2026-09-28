import mysql from "mysql2/promise";
import { readFile } from "node:fs/promises";

export class Database {
    constructor() {
        this.connection = null;
    }

    async connect() {
        this.connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            port: process.env.DB_PORT,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            dateStrings: true,
        });
    }

    async disconnect() {
        if (this.connection) {
            await this.connection.end();
            this.connection = null;
        }
    }

    async executeQuery(query, params = []) {
        try {
            await this.connect();

            const [result] = await this.connection.execute(query, params);
            return result;
        } catch (error) {
            console.error(`Identified error on executeQuery: ${error}`);
        } finally {
            await this.disconnect();
        }
    }

    async executeQueryFile(filePath, params = []) {
        const query = await readFile(filePath, "utf8");
        return await this.executeQuery(query, params);
    }
}
