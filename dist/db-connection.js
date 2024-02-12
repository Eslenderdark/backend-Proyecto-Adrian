"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = void 0;
var pg_1 = require("pg");
var connectionString = 'postgres://barberia_database_user:OGddn5xqz8C3gCem7EIF3yQ2PlftgOKS@dpg-cn4sih8l5elc73ctgje0-a/barberia_database';
var pool = new pg_1.Pool({
    // connectionString
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'barberia'
});
function query(text) {
    return pool.query(text);
}
exports.query = query;
