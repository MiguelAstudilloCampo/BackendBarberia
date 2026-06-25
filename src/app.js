const express = require('express');
const cors = require('cors');

const clientesRoutes = require('./routes/clientes_routes');
const barberiaRoutes = require('./routes/barberia_routes');
const barberoRoutes = require('./routes/barbero_routes');
const calificacionesRoutes = require('./routes/calificaciones_routes');
const authRoutes = require('./routes/auth_routes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

app.use('/usuarios', clientesRoutes);
app.use('/barberias', barberiaRoutes);
app.use('/barberos', barberoRoutes);
app.use('/calificaciones', calificacionesRoutes);

module.exports = app;