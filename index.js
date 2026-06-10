const express = require('express');
const cors = require('cors');
const clientesRoutes = require('./src/controllers/clientes_controller');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/usuarios', clientesRoutes);

app.listen(3000, () => {
    console.log('Servidor ejecutándose en puerto 3000');
});