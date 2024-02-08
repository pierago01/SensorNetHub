// Importa i moduli necessari
var express = require("express");
var path = require("path");
var { CosmosClient } = require("@azure/cosmos");
var expressLayout = require('express-ejs-layouts');

// Crea un'istanza dell'applicazione web
var app = express();

// Imposta ejs come motore di template
app.set("view engine", "ejs");

// Imposta la cartella delle views
app.set("views", path.join(__dirname, "views"));

// Imposta la cartella dei file statici
app.use(express.static(path.join(__dirname, "public")));

// Crea un'istanza del client CosmosDB
var client = new CosmosClient({
  endpoint: "https://cosmosdbiotaccount.documents.azure.com:443/",
  key: "g2knAIeMCAMc4FCSvDMH5Hh4KhOLkaTnTNGC0TtWNah83qaAVL8bwLSnJCtdZcUyNLAgP1haY9opACDbpTKDCg=="
});

// Seleziona il database e il contenitore da usare
var database = client.database("dbsensornet");
var container = database.container("cont1");

// Importa le route
var indexRouter = require("./routes/index");
var graficoRouter = require("./routes/grafico");

// Monta le route sull'applicazione web
app.use(expressLayout);
app.use("/", indexRouter);
app.use("/grafico", graficoRouter);

/*Crea il listener del server
app.listen(3001, function () {
  console.log("Server in ascolto sulla porta 3000");
})*/

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Il server è in ascolto sulla porta ${PORT}`);
});

module.exports = app;
