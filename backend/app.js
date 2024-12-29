require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const taskRoutes = require('./routes/taskRoutes');
const errorHandler = require('./middleware/check-auth');
//const swaggerUi = require('swagger-ui-express');
//const swaggerDocument = require('./swagger.json');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/tasks', taskRoutes);
//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
// Conexión a la base de datos y puesta en marcha del servidor
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Conexión exitosa');
    app.listen(5000); 
  })
  .catch(err => {
    console.log(err);
  });
