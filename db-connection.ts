import { Pool } from 'pg';
const connectionString = 'postgres://barberia_database_user:OGddn5xqz8C3gCem7EIF3yQ2PlftgOKS@dpg-cn4sih8l5elc73ctgje0-a/barberia_database'

const pool = new Pool({
    connectionString
   /* user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432, // default Postgrades port
    database: 'barberia'*/
});

export function query(text: any): any {
    return pool.query(text);
}
