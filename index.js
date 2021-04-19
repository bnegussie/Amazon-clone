const expressLib = require("express");
const app = expressLib();
const corsLib = require("cors");
const cookieParser = require('cookie-parser');
const pool = require("./db");


// Connecting the client and server:
app.use(
    corsLib({
        origin: [
            'http://localhost:3000',
            'https://remindmeee.com'
        ],
        credentials: true
    })
);

// Allowing server to access the data passed in from the client side:
app.use(expressLib.json());

app.use(cookieParser());


// Routes:
app.use("/api/auth", require("./routes/jwtAuth"));

app.use("/api/products", require("./routes/products"));

app.use("/api/users", require("./routes/users"));




app.listen(5000, () => {
    console.log("The server is running on port 5000.");
});
