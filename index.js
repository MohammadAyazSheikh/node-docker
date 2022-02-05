const express = require('express');
const mongoose = require('mongoose');
const { MONGO_USER, MONGO_PASSWORD, MONGO_IP, MONGO_PORT, REDIS_URL, REDIS_PORT, SESSION_SECRET } = require('./config/config');

// const redis = require('redis');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const postRouter = require('./routes/postRoutes');
const userRouter = require('./routes/userRoutes');

//corse
const cors = require('cors');

const app = express();





//"mongodb://ayaz:mypass123@172.22.0.2:27017/mydb?authSource=admin"
//instead of get ip of mongo container by cmmands in cmd use the name/dns of mongodb conatainer 
//in our case its name is mongo so it automatically grab mongodb containers ip


// "mongodb://ayaz:mypass123@mongo:27017/mydb?authSource=admin"

const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/mydb?authSource=admin`;

mongoose.connect(mongoUrl)
    .then(() => { console.log('connected to db') })
    .catch(e => { console.log(e) });


//----telling express trust header that enginx will added to our requeset------------
// we doing this becs we added our original ip addr to the nginx req 
app.enable('trust proxy');

//----CORS------
//it alows to run our frontend on one dmain and backend on diff domain 
app.use(cors({}));


//---mongo session store----
var store = new MongoDBStore({
    uri: mongoUrl,
    collection: 'sessions'
});

// Catch errors
store.on('error', function (error) {
    console.log(error);
});

app.use(require('express-session')({
    secret: 'This is a secret',
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));




app.use(express.json());


app.get('/api/v1', (req, res) => {
    res.send('<h1> Hello from api..!! </h1?');
    console.log('ran');
})

app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening on port  ${port}`);
})
