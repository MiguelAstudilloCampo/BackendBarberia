const express = require('express');
const cors = require('cors');

const clientesRoutes = require('./routes/clientes_routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', clientesRoutes);

module.exports = app;