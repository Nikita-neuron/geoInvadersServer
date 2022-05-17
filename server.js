const express        = require('express'); 
const mongoose       = require('mongoose');

const dbConfig       = require('./app/config/db');
const authRouter     = require('./app/routers/authRouter');
const regionsRouter  = require('./app/routers/regionsRouter');

const PORT           = process.env.PORT || 8000;

const app            = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("/regions", regionsRouter);

const start = async () => {
  try {
    // connect to db
    await mongoose.connect(dbConfig.url);

    // start app
    app.listen(PORT, () => { console.log(`Server start on port: ${PORT}`) });
  } catch (e) {
    console.log(e);
  }
}

start();