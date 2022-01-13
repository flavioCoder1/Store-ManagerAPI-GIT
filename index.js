const express = require('express');

const app = express();
app.use(express.json());

const PORT = 3000;

const productRoute = require('./routes/productRoute');
const salesRoute = require('./routes/salesRoute');

app.get('/', (_request, response) => {
  response.send();
});

app.use('/products', productRoute);
app.use('/sales', salesRoute);

app.listen(PORT, () => { console.log(`App listening on port ${PORT}`); });
