const express = require('express');
require('./src/config/dotenv')();
//require('./src/config/sequelize');

const app = express();
const port = process.env.PORT;
//const cors = require('cors');
//const routes = require('./src/routes/routes');


app.use(express.json());
app.use(express.urlencoded({extended:true}));
//app.use(routes);


app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`${process.env.APP_NAME} app listening at http://localhost:${port}`);
});
    