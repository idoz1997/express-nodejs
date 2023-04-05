//ייבוא ספריות
const express = require('express');
const PORT = process.env.PORT || 5000;
const path = require(`path`);
//יצירת האובייקט
const server = express();
const stores = require('./db/stores.json');
server.use(express.json());

// 1.
server.get(`/api/store`, async(req, res) => {
    res.status(200).json(stores)
})

//2.
server.get('/api/store/:id', async(req, res) => {
    const storeId = req.params.id;
    //called 'stores' twice as the find() method works on an array, and the stores const in the beginning
    //of the page is a json file, and it's 'stores' value is the array
    store = stores.stores.find(store => store.id == storeId);
  
    if (store) {
      res.status(200).json(store.items);
    } else {
      res.status(404).send('Store not found');
    }
  });

//3.
server.get('/api/stores/:store/:item', async(req, res) => {
    const storeId = req.params.store;
    const itemId = req.params.item;
    store = stores.stores.find(store => store.id == storeId);
    const item = store.items.find(item => item.id == itemId)

    if (item){
        res.status(200).json(item)
    }
    else{
        res.status(404).send('Item not found')
    }
})

//4.
server.post('/api/store/add', async(req, res) => {
    let storesArr = stores.stores;
    let {id, name, city, items} = req.body;
    let store = {id, name, city, items}
    storesArr.push(store);
    res.status(201).json(stores)
})

//5.
server.post('/api/store/:store/items/add', async(req, res) => {
    let storeId = req.params.store;
    let store = stores.stores.find(store => store.id == storeId);
    let itemsArr = store.items;
    let {id, name, regular_price, sale_price} = req.body;
    let item = {id, name, regular_price, sale_price}
    itemsArr.push(item);
    res.status(201).json(store.items)
})





// הפעלת השרת
server.listen(PORT, () => { //can be any port
    console.log(`http://localhost:${PORT}`);
})