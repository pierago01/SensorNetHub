# SensorNetHub

## Descrizione
SensorNetHub è un progetto che integra diversi servizi di Azure per raccogliere, memorizzare e visualizzare i dati provenienti da sensori IoT.
In particolare, esso è destinato alle aziende che vogliono controllare graficamente i valori come temperatura e umidità dei propri macchinari industriali,
permettendo in ogni momento di avere il controllo, riducendo al minimo il rischio di fermare il processo produttivo.
<p align='center'> 
    <img width="500" src="https://github.com/pierago01/SensorNetHub/assets/81223389/fd718d4b-6f26-40d9-b000-1fc5ac111681">
</p>

## Architettura
<p align='center'> 
    <img width="500" src="https://github.com/pierago01/SensorNetHub/assets/81223389/1c98b930-5187-4155-a352-f0bc85f4f0c9">
</p>
L'architettura è divisa in due parti principali:

1. **IoTHub -> CosmosDB -> AppService**: I dati inviati dai sensori attraverso IoTHub vengono salvati in CosmosDB e visualizzati tramite un'applicazione web ospitata su AppService.
2. **IoTHub -> ServiceBus -> Logic App**: Gli alert generati da IoTHub relativi alla temperatura o all'umidità vengono inviati a ServiceBus, che a sua volta attiva una Logic App per l'invio di e-mail di notifica.

## Prerequisiti
- Node.js
- Un Account Azure con una sottoscrizione attiva
- Azure CLI o Azure PowerShell
- Un Account Google
- Un emulatore di dispositivi IoT (nel caso di simulazione)

## Installazione
Per utilizzare questo progetto, clona il repository e installa le dipendenze necessarie.

```bash
git clone https://github.com/pierago01/SensorNetHub.git
cd SensorNetHub
npm install
