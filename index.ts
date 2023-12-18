import express, { request } from "express";
import * as db from './db-connection';
const app = express();


app.get('/', (req, res) => {
    res.send('Hello from express and typescript');
});

app.get('/alumnos/:alumno', async (req, res) => {

    console.log("SELECT * FROM alumnos WHERE name ='" + req.params.alumno + "'");

    try {
        const result = await db.query("SELECT * FROM alumnos WHERE name ='" + req.params.name + "'");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/alumnos', async (req, res) => {

    console.log(`SELECT * FROM alumnos WHERE name = '${req.query.name}'`);

    try {
        const result = await db.query("SELECT * FROM alumnos WHERE name ='" + req.query.name + "'");
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/cortes', async (req, res) => {

    console.log(`SELECT * FROM cortes`);

    try {
        const result = await db.query(`SELECT * FROM cortes`);
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));