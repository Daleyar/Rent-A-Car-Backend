const connectDb = require("./db/db");
const express = require("express");
const cors = require("cors");
const app = express();
const userRouter = require("./routes/user")
const rentalRouter = require("./routes/rental")
const carRouter = require("./routes/car")

connectDb();

app.use(cors());
app.use(express.json());
app.use('/images', express.static('images'));
app.use('/api', carRouter, userRouter, rentalRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server started on port: ${PORT}`)
});