# SensorNetHub

## Description
SensorNetHub is a project that leverages various Azure services to collect, store, and display data from IoT sensors. It is particularly aimed at companies wishing to graphically monitor parameters such as temperature and humidity of their industrial machinery, thus maintaining control at all times and minimizing the risk of production downtime.
<p align='center'> 
    <img width="500" src="https://github.com/pierago01/SensorNetHub/assets/81223389/fd718d4b-6f26-40d9-b000-1fc5ac111681">
</p>

## Architecture
<p align='center'> 
    <img width="500" src="https://github.com/pierago01/SensorNetHub/assets/81223389/1c98b930-5187-4155-a352-f0bc85f4f0c9">
</p>
The system architecture is structured into two primary workflows:

1. **IoTHub -> CosmosDB -> AppService**: Data sent from IoT devices via IoTHub are stored in CosmosDB and displayed through a web application hosted on AppService.
2. **IoTHub -> ServiceBus -> Logic App**: Alerts generated by IoTHub concerning temperature or humidity are sent to ServiceBus, which then triggers a Logic App to send out notification emails.

## Prerequisites
- Node.js
- An Azure account with an active subscription
- Azure CLI or Azure PowerShell
- A Google account
- An IoT device emulator (for simulation purposes)

## Installation
To use this project, clone the repository and install the necessary dependencies:

```bash
git clone https://github.com/pierago01/SensorNetHub.git
cd SensorNetHub
npm install
```
## Setting up Azure Resources 
To set up the necessary Azure resources, follow these steps using Azure CLI:
1. Log in to your Azure account:
   
    ```bash
    az login
    ```
3. Create a resource group (replace <ResourceGroupName> and <Location> with your desired resource group name and Azure region):
   
   ```bash
    az group create --name <ResourceGroupName> --location <Location>
    ```
4. Create an IoT Hub:
   
   ```bash
   az iot hub create --name <IoTHubName> --resource-group <ResourceGroupName> --sku F1 --partition-count 2
   ```
5. Create a CosmosDB Account:
   
 ```bash
  az cosmosdb create --name <CosmosDBName> --resource-group <ResourceGroupName>
   ```
5. Create a database:
   
```bash
  az cosmosdb sql database create -n <DatabaseName> -a <CosmosDBName>  -g <ResourceGroupName>
   ```
6. Create a container:
   
```bash
  az cosmosdb sql container create -n <ContainerName> --partition-key-path "/Tenantid" -d <DatabaseName> -a <CosmosDBName> -g <ResourceGroupName>
   ```
7. Create an App Service Plan:
   
```bash
   az appservice plan create --name <AppServicePlanName> --resource-group <ResourceGroupName> --sku B1 --is-linux
```
8. Create a web app:
   
```bash
az webapp create --resource-group <ResourceGroupName> --plan <AppServicePlanName> --name <WebAppName> --runtime "NODE|20-lts"
```
9. Configure the IoT Hub message routing to CosmosDB (ensure to replace <EndpointName>, <CosmosDBCollectionName>, and other placeholders with actual values):
    
```bash
az iot hub route create --resource-group <ResourceGroupName> --hub-name <IoTHubName> --source-type DeviceMessages --endpoint-name <EndpointName> --entity-path <CosmosDBCollectionName> --condition "message-type = 'telemetry'"
```
10. Create a Service Bus namespace:
    
```bash
az servicebus namespace create --resource-group <ResourceGroupName> --name <ServiceBusNamespaceName> --location <Location>
```
11. Create a Service Bus queue:
    
```bash
az servicebus queue create --namespace-name <ServiceBusNamespaceName> --name <QueueName> --resource-group <ResourceGroupName>
```
12. Create a Logic App:
    
```bash
az logicapp create --name <LogicAppName> --resource-group <ResourceGroupName> --location <Location>
```
