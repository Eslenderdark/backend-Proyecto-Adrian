import express, { request } from "express";
import cors from 'cors';
import * as db from './db-connection';
import bodyParser from 'body-parser';
const jsonParser = bodyParser.json()
const app = express();
app.use(cors())

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
  // 1. Buscar el cliente en la tabla 'clientes'
  try {
    const result = await db.query("SELECT * FROM clientes WHERE id = '" + req.params.cliente + "'");
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
      const result = await db.query(`INSERT INTO clientes (id) VALUES ('${req.params.cliente}')`);
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
  console.log(`INSERT INTO clientes VALUES (${req.body.id}, '${req.body.name}', ${req.body.admin})`);
  try {
    const result = await db.query(`INSERT INTO clientes VALUES (${req.body.id}, '${req.body.name}', ${req.body.admin})`);
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

app.get('/citas/:dia/:hora', async (req, res) => {
  console.log("req.body AQUI:")
  console.log(req.body);
  try {
    console.log(`DELETE FROM citas WHERE dia = '${req.params.dia}' AND hora = '${req.params.hora}'`);
    const result = await db.query(`DELETE FROM citas WHERE dia = '${req.params.dia}' AND hora = '${req.params.hora}'`);
    console.log("Borrado echo")
    console.log(result);
    res.json("Datos eliminados correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error'); 
  }
});

app.post('/cortes', jsonParser, async (req, res) => {
  try {
   
    const result = await db.query(`INSERT INTO cortes (name,tipo_de_pelo, tiempo_estimado, precio, foto) VALUES ('${req.body.name}','${req.body.tipo_de_pelo}', ${req.body.tiempo_estimado}, ${req.body.precio}, '${req.body.url}')`);
    
    console.log(result);
    res.json("Nuevo peinado agregado correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al agregar nuevo peinado');
  }
});

app.get('/cortes/:name', async (req, res) => {
  try {
    const name = req.params.name;
    console.log(`DELETE FROM cortes WHERE name = '${name}'`);
    const result = await db.query(`DELETE FROM cortes WHERE name = '${name}'`);
    console.log("Borrado realizado");
    console.log(result);
    res.json("Datos eliminados correctamente");
  } catch (err) {
    console.error(err);
    res.status(500).send('Error interno del servidor');
  }
});


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`App listening on PORT ${port}`));