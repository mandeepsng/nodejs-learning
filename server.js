const express = require('express');

const app = express();

const PORT = 3000;

app.get('/', (req, res) => {
    res.send({
        id: 1,
        name: 'This is Dev'
    });
});


app.get('/messages', (req, res) => {
    res.send('<ul><li>Hello Mandeep!</li></ul>');
} )

app.listen(PORT, () => {
    console.log(`Listing on ${PORT} .....`);
} )