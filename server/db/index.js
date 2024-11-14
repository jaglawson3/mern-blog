const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGO_DB_URL).then(() => console.log('connected to mongoDB')).catch((error) => console.log(error))