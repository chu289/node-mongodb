module.exports = (app) => {
    const stores = require('../controllers/store.controller.js');

    // Create a new Store
    app.post('/stores', stores.create);

    // Retrieve all Stores
    app.get('/stores', stores.findAll);

    // Retrieve a single Store with noteId
    app.get('/stores/:storeId', stores.findOneByID);    

    // Retrieve all conform Store with storeCity
    app.get('/stores/city/:city', stores.findOneByCity);

    // Retrieve all conform Store with storeKind
    app.get('/stores/kind/:kind', stores.findOneByKind);

    // Update a Store with storeId
    app.put('/stores/:storeId', stores.update);    
    
    // Delete a Store with storeId
    app.delete('/stores/:storeId', stores.delete);
    

    // Retrieve a single Note with noteId
   // app.get('/notes/:id', notes.findOne);
    //app.get('/notes/:title', notes.findOne);


}