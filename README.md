# Windows Azure SDK for Node.js

This project provides a Node.js package that makes it easy to access Windows Azure Storage Metrics.

With Windows Azure Websites you can deploy node.js applications to the cloud in just seconds using git. 

For documentation on how to host Node.js applications on Windows Azure, please see the [Windows Azure Node.js Developer Center](http://www.windowsazure.com/en-us/develop/nodejs/).

# Library Features

* Capacity Metrics
    * Retrieve daily capacity metrics for all blobs in an Azure account
* Transaction Metrics
    * Retrieve hourly transaction metrics for all blobs, queues and tables in an Azure account

# Getting Started
## Download Source Code

To get the source code of the SDK via **git** just type:

    git clone https://github.com/jburnett/azure-metrics.git
    cd ./azure-metrics

## Download Package

Alternatively, to get the source code via the Node Package Manager (npm), type

    npm install azure-metrics

You can use these packages against the cloud Windows Azure Services.

# Usage
## Blob Capacity Metrics

```Javascript
var metricsService = azure-metrics.createMetricsService();
metricsService.getBlobCapacities( function(error, capacityEntities){
    if(!error){
        // use capacityEntities JSON data
    }
});
```


If you encounter any bugs with the library please file an issue in the [Issues](https://github.com/jburnett/azure-metrics/issues) section of the project.

# Learn More
[Windows Azure Node.js Developer Center](http://www.windowsazure.com/en-us/develop/nodejs/)