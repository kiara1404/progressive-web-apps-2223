import fetch from 'node-fetch';


// fetch data
export async function fetchData(req, res) {

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
