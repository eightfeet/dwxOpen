import express from "express";
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';

const config = dotenv.config();
dotenvExpand.expand(config);
import middleware from "./middleware";
import router from "./router";
import swaggerUi from 'swagger-ui-express';

import swaggerDocument from './swagger';
const app = express();



app.use('/api-docs', swaggerUi.serve,swaggerUi.setup(swaggerDocument));
const port = 8000;

middleware(app).then(() => {
  router(app);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
