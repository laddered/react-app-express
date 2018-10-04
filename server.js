const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
require('./config/express')(app);

app.listen(port, () => console.log(`Listening on port ${port}`));

app.get('/express_backend', (req, res) => {
  res.send({ express: 'Connected to server.' });
});

/*Включение сервера mongoDB: sudo systemctl start mongodb
Выключение сервера mongoDB: sudo systemctl stop mongodb
Включение сервера mongoDB при запуске: sudo systemctl enable mongodb.service*/