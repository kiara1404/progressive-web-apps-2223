import express from 'express';
import ejs from 'ejs';
import * as path from 'path';
import fetch from 'node-fetch';


const app = express();
const port = 8000;


// set templating engine
app.set('view engine', 'ejs');
//where the templates are stored
app.set('views', 'views');

// public folder location
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
// Routing
app.get('/', index)
app.get('/scanner', scanner)
app.get('/scanner/:id', fetchData)


function server() {
    console.log('The server is running succesfully! 🎉 at https://http://localhost:8000/');
}

function index(req, res) {
    res.render('index')
}

function scanner(req, res) {
    res.render('scanner')
}

// fetch data
async function fetchData(req, res) {

    try {
        const url = 'https://world.openfoodfacts.org/api/v0/product/'
        const barcode = req.params.id
        const data = await fetch(url + barcode + 'json')
        const response = await data.json()

        res.render('detail', {
            data: response
        })
    }
    catch (err) {
        console.log(err)

    }


}


app.listen(port, server)