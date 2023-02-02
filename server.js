const express = require('express');

const app = express();

const PORT = 3000;

const friends = [
    {
        id: 0,
        name: 'Mandeep'
    },   
    {
        id: 1,
        name: 'Shubham'
    },   
    {
        id: 2,
        name: 'Jasjeet'
    },   
    {
        id: 3,
        name: 'Roshan'
    },   
];

app.get('/friends' , (req, res) =>{
    res.json(friends);
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