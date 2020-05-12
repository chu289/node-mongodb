const mongoose = require('mongoose');

const StoreSchema = mongoose.Schema({
    name: String,
    businesstime: String,
    address:String,
    phone:String,
    price:String,
    website:String,
    picture:String,
    city:String,
    kind:String
}, {
    timestamps: true
});

module.exports = mongoose.model('Store', StoreSchema);