/* eslint-disable @typescript-eslint/no-var-requires */
import express from 'express';
require('express-async-errors');

import { router } from './routes';

const app = express();

app.use(express.json());
app.use(router);

//eslint-disable-next-line no-console
app.listen(2300, () => console.log('Server is runing at http://localhost:2300'));
