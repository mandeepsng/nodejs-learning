const express = require('express');

const app = express();

const PORT = 3000;

// middleware
app.use((req, res, next) => {
    const start = Date.now();
    next();
    //actions go here......
    const delta = Date.now() - start;
    console.log(`${req.method} ${req.url}  ${delta}ms `);

})


app.use(express.json());


const friends = [
    {
        id: 0,
        name: 'Mandeep'
    },   
    {
        id: 1,
        name: 'Dev'
    },   
    
];

app.get('/friends' , (req, res) =>{
    res.json(friends);
} )

// create friend using post
app.post('/friends', (req, res) => {

    if(!req.body.name){
        res.status(400).json({
            error: 'Missing friend name'
        });
    }

        const newFriend = {
            name:req.body.name,
            id: friends.length
        }
        friends.push(newFriend);
        res.json(newFriend);

} )

app.get('/friends/:id' , (req, res) =>{
    const id = Number(req.params.id);
    const fd = friends[id]
    if(fd){
        res.status(200).json(fd);
    }else{
        res.status(404).json({
            error: 'user not found',
        });
    }
} )






app.get('/', (req, res) => {
    res.send({
        id: 1,
        name: 'This is Dev'
    });
});


app.get('/messages', (req, res) => {
    res.send('<ul><li>Hello Mandeep!</li></ul>');
})




app.listen(PORT, () => {
    console.log(`Listing on ${PORT} .....`);
} )