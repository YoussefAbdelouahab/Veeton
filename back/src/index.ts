import { useExpressServer } from 'routing-controllers';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import { AppDataSource } from './db/data-source';
import * as swaggerui from "swagger-ui-express";
import * as swaggerdoc from "swagger-jsdoc";
import SwaggerOption from './swagger/SwaggerOption';

//Set the port
const PORT: number = 8000;

//Init app
let app = express();

//All needs for the app
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

try {
    //initialize & connect to database
    const connected = AppDataSource.initialize();
    if (connected) console.log("Database connected");
} catch (error) {
    console.log(error);
}

//Get the path of the controllers
const controllerPath = path.resolve('src', 'controller', '*.ts');

//Set the prefix api, and all the file for the endpoints
useExpressServer(app, {
    defaultErrorHandler: true,
    routePrefix: '/api',
    controllers: [controllerPath],
});

//Init the swagger
const spacs = swaggerdoc(SwaggerOption())
//Create the swagger
app.use(
    "/api-docs",
    swaggerui.serve,
    swaggerui.setup(spacs)
)


app.listen(PORT, () => {
    return (
        console.log(`Express is listening at http://localhost:${PORT}`),
        console.log(`Swagger is listening at http://localhost:${PORT}/api-docs`)
    );
});

export { app }