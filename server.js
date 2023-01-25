const express = require("express");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.get("/", (req, res) => {
  res.send("app running");
});

//body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/openai", require("./routes/openaiRoute"));
app.listen(port || 5000, console.log(`server running on ${port}`));
