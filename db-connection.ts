import { Pool } from 'pg';

const pool = new Pool({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432, // default Postgrades port
    database: 'barberia'
});

export function query(text: any): any {
    return pool.query(text);
}
