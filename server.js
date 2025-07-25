const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const utils = require("./utilities/constants");
const verifyCall = require("./middleware/verifyCall");
const fs = require("fs");
const morgan = require("morgan");
const path = require("path");
const { default: mongoose } = require("mongoose");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Logging the API calls
const filePath = path.join(__dirname, "logs", "request.log");
const accessLogStream = fs.createWriteStream(filePath, { flags: 'a' });

app.use(morgan(':method :url :status :res[content-length] :response-time ms', { stream: accessLogStream }));
app.use(morgan(':method :url :status :res[content-length] :response-time ms'));

app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(utils.mongodbUrl).then(() => {
    console.log("Connected to MongoDB successfully");
}).catch(err => {
    console.error("Error connecting to MongoDB:", err);
});

app.get("/test", (req, res) => {
    res.send("Server running successfully");
});

// Importing routes
const patientRoutes = require("./routes/patientsRoutes");
const doctorRoutes = require("./routes/doctorsRoute");
const loginRoute = require("./routes/loginRoute");
const followUpRoutes = require("./routes/followUpRoutes");
const dashboardRoute = require("./routes/dashboardRoute");
const documentRoutes = require("./routes/documentRoute");

// Using routes
app.use("/api/patients", verifyCall, patientRoutes);
app.use("/api/doctors", verifyCall, doctorRoutes);
app.use("/api/login", loginRoute);
app.use("/api/followups", verifyCall, followUpRoutes);
app.use("/api/dashboard", verifyCall, dashboardRoute);
app.use("/api/documents", verifyCall, documentRoutes);

const PORT = utils.PORT;
app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
});
