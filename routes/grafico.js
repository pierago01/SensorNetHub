// Importa i moduli necessari
var express = require("express");
var { CosmosClient } = require("@azure/cosmos");

// Crea un'istanza del router
var router = express.Router();

// Crea un'istanza del client CosmosDB
var client = new CosmosClient({
  endpoint: "<endpoint-uri-here>",
  key: "<your-dbkey-here>"
});

// Seleziona il database e il contenitore da usare
var database = client.database("<database-name-here");
var container = database.container("<container-name-here>");

async function renderGraphs(query, res) {
  try {
    // Esegui la query su CosmosDB
    var { resources: items } = await container.items.query(query).fetchAll();
    for (const item of items) {
      console.log(item);
    }

    var devices = items.reduce((acc,item)=> {
      if(!acc[item.rfid]){
        acc[item.rfid] = []
      }
      acc[item.rfid].push(item);
      return acc
    }, {});

    // Crea un oggetto con i dati da passare alla view
    var data = {
      title: "Grafici dei valori dei tuoi dispositivi IoT",
      message: "Grafici dei valori dei tuoi dispositivi IoT",
      devices: devices,
    };

    // Invia la view grafico.ejs come risposta, passando l'oggetto data
    res.render("grafico", { title: data.title, message: data.message, devices: data.devices });
  } catch (error) {
    // Gestisci l'errore
    console.error(error);
    res.status(500).send("Si è verificato un errore nel recupero dei dati da CosmosDB");
  }
}

// Definisci la route per il percorso /grafico
router.get("/", async function (req, res) {
  let currentDate = new Date();
  let timestamp = currentDate.getTime();
  var query = 'SELECT c.Body.rfid, c.Body.temperature, c.Body.humidity, c._ts AS ts FROM c ' +
              'WHERE c._ts BETWEEN 1 AND ' + timestamp + ' ORDER BY c._ts ASC';
  await renderGraphs(query, res);
});

router.get("/recent", async function (req, res) {
  var query = "SELECT c.Body.rfid, c.Body.temperature, c.Body.humidity FROM c " +
              "WHERE c._ts >= DateTimeToTimestamp(DateTimeAdd('minute', -1, GetCurrentDateTime()))/1000 " +
              "ORDER BY c.Body.rfid";
  await renderGraphs(query, res);
});
router.get("/alert", async function (req, res) {
  var query = "SELECT c.Body.rfid, c.Body.temperature, c.Body.humidity FROM c " +
              "WHERE c._ts >= DateTimeToTimestamp(DateTimeAdd('minute', -1, GetCurrentDateTime()))/1000 " +
              "AND (c.Properties.temperatureAlert = 'true' OR c.Properties.humidityAlert = 'true') ORDER BY c.Body.rfid";
  await renderGraphs(query, res);
});


router.get('*', function(req, res) {
  console.log("********************************");
  res.redirect('/');
});


// Esporta il router
module.exports = router;
