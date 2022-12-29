const { logErrors,errorHandler,errorBoomHandler} = require('./midlewars/error.handler')
const validatorHandler = require('./midlewars/validatorHandler');
const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = 3000;
app.listen(port);

//Midlewars --------------------------
app.use(express.json());

routerApi(app);
app.use(logErrors);
app.use(errorBoomHandler);
app.use(errorHandler);

console.log('Escuchando en el puerto:' + port);
