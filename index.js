const expressLib = require("express");
const app = expressLib();
const corsLib = require("cors");
const pool = require("./db");


// Connecting the client and server:
app.use(corsLib());

// Allowing server to access the data passed in from the client side:
app.use(expressLib.json());


// Routes:
app.use("/api/products", require("./routes/products"));




app.listen(5000, () => {
    console.log("The server is running on port 5000.");
});
