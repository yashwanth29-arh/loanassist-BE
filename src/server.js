const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const contactsRouter = require("./routes/contacts");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/", contactsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
