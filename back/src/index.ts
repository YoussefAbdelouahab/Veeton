import { useExpressServer } from 'routing-controllers';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as cors from 'cors';
import { AppDataSource } from './db/data-source';

const PORT: number = 8000;

let app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));

try {
    const connected = AppDataSource.initialize();
    if (connected) console.log("Database connected");
} catch (error) {
    console.log(error);
}

const controllerPath = path.resolve('src', 'controller', '*.ts');

useExpressServer(app, {
    defaultErrorHandler: true,
    routePrefix: '/api',
    controllers: [controllerPath],
});

app.listen(PORT, () => {
    return console.log(`Express is listening at http://localhost:${PORT}`);
});