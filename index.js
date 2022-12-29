const { logErrors,errorHandler,errorBoomHandler} = require('./midlewars/error.handler')
const cors = require('cors');
const express = require('express');
const routerApi = require('./routes');
const app = express();
const port = process.env.PORT||3000;
app.listen(port);
app.use(express.json());
//Midlewars --------------------------
const whitelist = ["http://localhost:8080","https://myapp.co"]
const options = {
    origin:(origin,callback)=>{
        if (whitelist.includes(origin||!origin)) {
            callback(null,true);
        }else{
            callback(new Error('No permitido')) ;
        }
    }
}

app.use(cors(options));
app.get('/',(req,res)=>{
    res.send(`${req.url}: Bienvenido a mi servidor con express`);
})
routerApi(app);
app.use(logErrors);
app.use(errorBoomHandler);
app.use(errorHandler);