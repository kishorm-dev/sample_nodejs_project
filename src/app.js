const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/users.routes');
const { morganMiddleware } = require('./configs/logger');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use(morganMiddleware);
app.use('/api/v1/', userRoutes);

app.listen(port, () => {
  console.log(`Server running on port : ${port}`);
});
