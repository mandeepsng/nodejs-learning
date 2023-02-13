const express = require('express');
const path = require('path');


const friendsRouter = require('./routes/friends.routes');

const messagesRouter = require('./routes/messages.routes');



const app = express();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

const PORT = 3000;

// middleware
app.use((req, res, next) => {
    const start = Date.now();
    next();
    //actions go here......
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.baseUrl}${req.url}  ${delta}ms `);

})

app.use(express.json());

// friends router start==================================start=====================================================



app.use('/friends', friendsRouter );
app.use('/messages', messagesRouter );

// friends router end==================================end=====================================================

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Express.js Matery',
        caption: 'let\'s go',
    });
});



app.listen(PORT, () => {
    console.log(`Listing on ${PORT} .....`);
} )