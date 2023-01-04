const { logErrors,errorHandler,errorBoomHandler} = require('./midlewars/error.handler')
const cors = require('cors');
const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = process.env.PORT||3000;
app.listen(port);
app.use(express.json());
//Midlewars --------------------------
const whitelist = ["http://127.0.0.1:5501","https://myapp.co"]
const options = {
    origin:(origin,callback)=>{
        if (whitelist.includes(origin||!origin)) {
            callback(null,true);
        }else{
            callback(new Error('No permitido'));
        }
    }
}

app.use(cors());
app.get('/',(req,res)=>{
    res.send(`${req.url}: Bienvenido a mi servidor con express`);
})
routerApi(app);
app.use(logErrors);
app.use(errorBoomHandler);
app.use(errorHandler);
console.log(`Escuchando en el puerto ${port}`);