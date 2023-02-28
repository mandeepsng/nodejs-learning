const express = require('express');
const path = require('path');
const request = require('request');
const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const bodyParser = require('body-parser')
const slugify = require('slugify')


const puppeteer = require('puppeteer');


const friendsRouter = require('./routes/friends.routes');

const messagesRouter = require('./routes/messages.routes');



const app = express();
app.use(bodyParser.urlencoded({ extended: true }))

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

app.get('/sync', async (req, res) => {
    const data = await fs.readFile('/path/to/file', 'utf8')
    res.send(data)
  })

app.get('/demo', async (req, res) => {

    const dd = await axios.get('https://codelist.cc/php-script/249669-lottolab-v20-live-lottery-platform-nulled.html')
    const posts = dd.data


    const data = 'Hello, world!'
const filePath = 'file.txt'

fs.writeFile(filePath, data, (err) => {
  if (err) {
    console.error(err)
    return
  }
  console.log('File written successfully')
})

// axios.get('https://mojoauth.com/blog/rest-api-authentication/')
//   .then(response => {
//     const $ = cheerio.load(response.data);
//     const title = $('title').text();
//     console.log($);
    res.render('demo', {
        title: posts,
        caption: 'let\'s go',
    });
//   })
//   .catch(error => {
//     console.log(error);
//   });



// console.log('sdfsdf')
});

app.get('/contact', (req, res) => {
    // res.send(`
    //   <h1>Scrape</h1>
    //   <form method="post" action="/contact">
    //     <label for="url">URL:</label>
    //     <input type="text" id="url" name="url"><br>
    //     <input type="submit" value="Send">
    //   </form>
    // `)
    res.render('form');
  })
  
  app.post('/contact', async(req, res) => {



    const { url } = req.body
    // Do something with the form data, such as sending an email
    const codelisturl = 'https://codelist.cc/pg/3/';
    const response = await axios.get(codelisturl);
    const data = response.data;
    var $ = cheerio.load(data);
    const arr = [];
    // Use Cheerio selectors to extract data from the HTML
    $('h3.post__title.typescale-2').each((i, element) => {
        // console.log($(element).text());
        const links = $(element).find('a');
        const href = links.attr('href');
        // console.log(href);
        arr.push(href);
    });

// get current date with yy-mm-dd format

const now = new Date();
const year = now.getFullYear();
const month = String(now.getMonth() + 1).padStart(2, '0');
const day = String(now.getDate()).padStart(2, '0');
const formattedDate = `${year}-${month}-${day}`;
console.log(formattedDate);

const folderName = formattedDate;

if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log(`Created folder: ${folderName}`);
  } else {
    console.log(`Folder ${folderName} already exists.`);
  }

    // start for every single 
    const fruits = ['apple', 'banana', 'orange'];

    arr.forEach(async (codelist_url) => {
      
        const code_response = await axios.get(codelist_url);
        const code_data = code_response.data;

        var $ = cheerio.load(code_data);

        const title = $('h1.entry-title').text();

        const slug = slugify(title, {
          lower:true,
          strict:true
        });
        
        const body = $('.single-body').text();
        
        const quote = $('.quote').text();
        
        const imgUrl = 'https://codelist.cc'+$('.single-body img').attr('src');
        
        let description = body.replace(quote, "");
        
        
        const urls = quote.split('https');
        
        // Remove the empty string at the beginning of the array
        urls.shift();
        
        // Add the "https" prefix back to each URL
        for (let i = 0; i < urls.length; i++) {
          urls[i] = 'https' + urls[i];
        }
        
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString();
        
        console.log(formattedDate);
        
        
        // console.log(urls);

const content = `
---
title: ${title} 
date: ${formattedDate}
slug: ${slug}
image: ${imgUrl}
---
        
${description}
${urls.map((item) => `> [${item}](${item})`).join('\n')}
`;
        
        console.log('asdasd')
        
        const fileName = `${slug}.md`; // replace with your file name
        
        
        fs.writeFile(`${folderName}/${fileName}`, content, (err) => {
          if (err) throw err;
          console.log('The file has been saved!');
        });
        



    });




    // end for every single 
    







    console.log('url => ', arr)
    res.render('codelist', {
        url: url,
        href: arr,
    });
    // res.send(`Thanks for contacting us! ${url}`)



    
  })




app.listen(PORT, () => {
    console.log(`Listing on ${PORT} .....`);
} )