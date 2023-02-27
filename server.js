const path = require('path');

const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');

const puppeteer = require('puppeteer');


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

app.use('/site', express.static(path.join(__dirname, 'public'))  );

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

/////////////////////////////////////////////////////////////////////


// request('https://codelist.cc/en/', (error, response, html) => {
//   if (!error && response.statusCode == 200) {
//     const $ = cheerio.load(html);
//     const title = $('title').text();
//     console.log(title);
//   }
// });
app.get('/demo', (req, res) => {

// axios.get('https://mojoauth.com/blog/rest-api-authentication/')
//   .then(response => {
//     const $ = cheerio.load(response.data);
//     const title = $('title').text();
//     console.log($);
//     res.render('demo', {
//         title: $,
//         caption: 'let\'s go',
//     });
//   })
//   .catch(error => {
//     console.log(error);
//   });



// console.log('sdfsdf')
});
(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    await page.goto('https://mojoauth.com/blog/rest-api-authentication');
    const html = await page.content();
    const $ = cheerio.load(html);
  
    const title = $('title').text();
    console.log(title);
  
    await page.evaluate(() => {
      console.log($); // Output the value of $ to the browser console
    });
  
    await browser.close();
  })();





app.listen(PORT, () => {
    console.log(`Listing on ${PORT} .....`);
} )