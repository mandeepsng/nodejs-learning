const express = require('express');

const friendsRouter = require('./routes/friends.routes');

const messagesRouter = require('./routes/messages.routes');



const app = express();

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
    res.send({
        id: 1,
        name: 'This is Dev'
    });

    // console.log(__filename);
    // console.log(__dirname );
});



app.listen(PORT, () => {
    console.log(`Listing on ${PORT} .....`);
} )