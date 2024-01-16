import express, { request } from "express";
import * as db from './db-connection';
import bodyParser from 'body-parser'
const app = express();

const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
    res.send('Hello from express and typescript');
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


app.get('/cliente/:cliente', async (req, res) => {
    console.log("ENDPOINT: /cliente/:cliente");
    console.log("INPUT VALUES: " + req.params.cliente);
    let usuario;
    // 1. Buscar el cliente en la tabla 'cliente'
    try {
        const result = await db.query("SELECT * FROM cliente WHERE id = '"  + req.params.cliente + "'");
        console.log (JSON.stringify(result.rows))
        usuario = result.rows;
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al recuperar el cliente de la base de datos');
    }

    if(usuario.length > 0) {
        // El usuario existe
        console.log("El usuario ya existe")
        res.json({ user: usuario[0], creado: false });
    } else {
        // El usuario no existe
        try {
            const result = await db.query(`INSERT INTO cliente (id) VALUES ('${req.params.cliente}')`);
            console.log(result);
            res.json({user: {id:req.params.cliente}, creado: true});
          } catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error, al crear al usuario');
          }
    }
});

app.post('/cliente', jsonParser, async (req, res) => {
    console.log(req.body)
    console.log(`INSERT INTO cliente VALUES (${req.body.id}, '${req.body.name}', ${req.body.age})`);
    try {
      const result = await db.query(`INSERT INTO cliente VALUES (${req.body.id}, '${req.body.name}', ${req.body.age})`);
      console.log(result);
      res.json("Datos guardados correctamente");
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    }
  });

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));