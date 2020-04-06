const express = require("express");

const bodyParser = require("body-parser");

const path = require("path");

const fileUpload = require("express-fileupload");

const cors = require("cors");

const bandsRouter = require("./routes/bands");

const membersRouter = require("./routes/members");

const albumsRouter = require("./routes/albums");

const app = express();

const port = 3000;

app.use(bodyParser.urlencoded({extended: false}));

app.use(express.static(path.join(__dirname, 'files')));

app.use(fileUpload());

app.use(cors());

app.use("/bands", bandsRouter);

app.use("/members", membersRouter);

app.use("/albums", albumsRouter);

app.set('port', process.env.port || port);

app.listen(port, () => {
	console.log(`App is listening on port ${port}!`);
});
