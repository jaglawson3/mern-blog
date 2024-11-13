const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb+srv://testUser1234:dbPassword1234@cluster0.nfll5.mongodb.net/').then(() => console.log('connected to mongoDB')).catch((error) => console.log(error))