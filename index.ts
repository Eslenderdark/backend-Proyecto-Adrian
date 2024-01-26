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
    const result = await db.query("SELECT * FROM cliente WHERE id = '" + req.params.cliente + "'");
    console.log(JSON.stringify(result.rows))
    usuario = result.rows;
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al recuperar el cliente de la base de datos');
  }

  if (usuario.length > 0) {
    // El usuario existe
    console.log("El usuario ya existe")
    res.json({ user: usuario[0], creado: false });
  } else {
    // El usuario no existe
    try {
      const result = await db.query(`INSERT INTO cliente (id) VALUES ('${req.params.cliente}')`);
      console.log(result);
      res.json({ user: { id: req.params.cliente }, creado: true });
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

app.get('/citas/:citas', async (req, res) => {
  console.log("ENDPOINT: /citas/:citas");
  console.log("INPUT VALUES: " + req.params.citas);
  let cita;
  // 1. Buscar el citas en la tabla 'citas'
  try {
    const result = await db.query("SELECT * FROM citas WHERE id = '" + req.params.citas + "'");
    console.log(JSON.stringify(result.rows))
    cita = result.rows;
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al recuperar el citas de la base de datos');
  }

  if (cita.length > 0) {
    // La cita existe
    console.log("La cita ya existe")
    res.json({ cita: cita[0], creado: false });
  } else {
    // La no existe
    try {
      const result = await db.query(`INSERT INTO citas (id) VALUES ('${req.params.citas}')`);
      console.log(result);
      res.json({ cita: { id: req.params.citas }, creado: true });
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error, al crear la cita');
    }
  }
});

app.get('/citas', async (req, res) => {

  console.log(`select * from citas INNER JOIN cortes ON citas.id_corte = cortes.id`);

  try {
    const result = await db.query(`select * from citas INNER JOIN cortes ON citas.id_corte = cortes.id`);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


app.post('/citas', jsonParser, async (req, res) => {
  console.log(req.body)
  console.log(`INSERT INTO citas (id_cliente,id_corte,precio,hora,dia,col_index,row_index,nombre) VALUES ('${req.body.id_cliente}',${req.body.id_corte},${req.body.precio},'${req.body.hora}','${req.body.dia}',${req.body.col_index},${req.body.row_index},'${req.body.nombre}')`);
  try {
    const result = await db.query(`INSERT INTO citas (id_cliente,id_corte,precio,hora,dia,col_index,row_index,nombre) VALUES ('${req.body.id_cliente}',${req.body.id_corte},${req.body.precio},'${req.body.hora}','${req.body.dia}',${req.body.col_index},${req.body.row_index},'${req.body.nombre}')`);
    console.log(result);
    res.json("Datos guardados correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));