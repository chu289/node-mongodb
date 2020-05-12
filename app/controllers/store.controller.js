const Store = require('../models/store.model.js');

// Create and Save a new Store
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name || !req.body.businesstime || !req.body.address || !req.body.phone || !req.body.price || !req.body.website || !req.body.picture || !req.body.city || !req.body.kind) {
        return res.status(400).send({
            message: "Store content can not be empty"
        });
    }

    // Create a Store
    const store = new Store({
        name: req.body.name, 
        businesstime: req.body.businesstime,
        address: req.body.address,
        phone: req.body.phone,
        price: req.body.price,
        website: req.body.website,
        picture: req.body.picture,
        city: req.body.city,
        kind: req.body.kind
    });

    // Save Note in the database
    store.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Store."
        });
    });
};

// Retrieve and return all stores from the database.
exports.findAll = (req, res) => {
    Store.find()
    .then(stores => {
        res.send(stores);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving stores."
        });
    });
};

// Find a single store with a storeId
exports.findOneByID = (req, res) => {
    Store.findById(req.params.storeId)
    .then(store => {
        if(!store) {
            return res.status(404).send({
                message: "Store not found with id " + req.params.storeId
            });            
        }
        res.send(store);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Store not found with id " + req.params.storeId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving store with id " + req.params.storeId
        });
    });
};

// Find all conform store with a storeCity
exports.findOneByCity = (req, res) => {
    Store.find(req.params)
    .then(store => {
        if(!store) {
            return res.status(404).send({
                message: "Store not found with city " + req.params
            });            
        }
        res.send(store);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Store not found with city " + req.params
            });                
        }
        return res.status(500).send({
            message: "Error retrieving store with city " + req.params
        });
    });
};

// Find all conform store with a storeKind
exports.findOneByKind = (req, res) => {
    Store.find(req.params)
    .then(store => {
        if(!store) {
            return res.status(404).send({
                message: "Store not found with kind " + req.params
            });            
        }
        res.send(store);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Store not found with kind " + req.params
            });                
        }
        return res.status(500).send({
            message: "Error retrieving store with kind " + req.params
        });
    });
};

// Update a store identified by the storeId in the request
exports.update = (req, res) => {
    // Validate Request
    if(!req.body.name || !req.body.businesstime || !req.body.address || !req.body.phone || !req.body.price || !req.body.website || !req.body.picture || !req.body.city || !req.body.kind) {
        return res.status(400).send({
            message: "Store content can not be empty"
        });
    }

    // Find store and update it with the request body
    Store.findByIdAndUpdate(req.params.storeId, {
        name: req.body.name, 
        businesstime: req.body.businesstime,
        address: req.body.address,
        phone: req.body.phone,
        price: req.body.price,
        website: req.body.website,
        picture: req.body.picture,
        city: req.body.city,
        kind: req.body.kind
    }, {new: true})
    .then(store => {
        if(!store) {
            return res.status(404).send({
                message: "Store not found with id " + req.params.storeId
            });
        }
        res.send(store);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Store not found with id " + req.params.storeId
            });                
        }
        return res.status(500).send({
            message: "Error updating store with id " + req.params.storeId
        });
    });
};

// Delete a store with the specified storeId in the request
exports.delete = (req, res) => {
    Store.findByIdAndRemove(req.params.storeId)
    .then(store => {
        if(!store) {
            return res.status(404).send({
                message: "Store not found with id " + req.params.storeId
            });
        }
        res.send({message: "Store deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Store not found with id " + req.params.storeId
            });                
        }
        return res.status(500).send({
            message: "Could not delete store with id " + req.params.storeId
        });
    });
};
