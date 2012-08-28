/**
* Copyright (c) AltaModa Technologies, LLC.  All rights reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*   http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

// Module dependencies.
var azure = require('azure');
var util = require('util');
var Constants = require('../Constants');

// Models requires
// var TableResult = require('./models/tableresult');
// var EntityResult = require('./models/entityresult');
// var ServicePropertiesResult = require('./models/servicepropertiesresult');
// var QueryTablesResultContinuation = require('./models/querytablesresultcontinuation');
// var QueryEntitiesResultContinuation = require('./models/queryentitiesresultcontinuation');

// Expose 'MetricsService'.
exports = module.exports = MetricsService;

// Module constants.
// MetricsService.incorrectTableNameErr = 'Table name must be a non empty string.';
MetricsService.incorrectCallbackErr = 'Callback must be specified.';



/**
* Creates a new MetricsService object.
* If no storageaccount or storageaccesskey are provided, the AZURE_STORAGE_ACCOUNT and AZURE_STORAGE_ACCESS_KEY environment variables will be used.
*
* @constructor
* @extends {ServiceClient}
*
* @param {string} [storageAccount]          The storage account.
* @param {string} [storageAccessKey]        The storage access key.
* @param {string} [host]                    The host address.
* @param {object} [authenticationProvider]  The authentication provider.
*/
function MetricsService(storageAccount, storageAccessKey, host, authenticationProvider) {
  if (!host) {
    // Dev Stg does not support metrics
    host = azure.ServiceClient.CLOUD_TABLE_HOST;
  }

  MetricsService.super_.call(this, host, storageAccount, storageAccessKey, authenticationProvider);

  if (!this.authenticationProvider) {
    this.authenticationProvider = new azure.SharedKeyTable(this.storageAccount, this.storageAccessKey, this.usePathStyleUri);
  }
}

util.inherits(MetricsService, azure.BatchServiceClient);

/**
* Retrieves Blob Capacity metrics from Windows Azure Storage Metrics.
*
* @this {MetricsService}
* @param {object|function}    [optionsOrCallback]                        The request options or callback function.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]    The timeout interval, in milliseconds, to use for the request.
* @param {function(error, servicePropertiesResult, response)}  callback  The callback function.
* @return {undefined}
*/
MetricsService.prototype.getBlobCapacities = function (optionsOrCallback, callback) {
    this.metricsTableName = Constants.CapacityBlobTableName;
    this._getMetrics(optionsOrCallback, callback);
}


/**
* Retrieves Blob Transaction metrics from Windows Azure Storage Metrics.
*
* @this {MetricsService}
* @param {object|function}    [optionsOrCallback]                        The request options or callback function.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]    The timeout interval, in milliseconds, to use for the request.
* @param {function(error, servicePropertiesResult, response)}  callback  The callback function.
* @return {undefined}
*/
MetricsService.prototype.getBlobTransactions = function (optionsOrCallback, callback) {
    this.metricsTableName = Constants.TransactionsBlobTableName;
    this._getMetrics(optionsOrCallback, callback);
}


/**
* Retrieves Queue Transaction metrics from Windows Azure Storage Metrics.
*
* @this {MetricsService}
* @param {object|function}    [optionsOrCallback]                        The request options or callback function.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]    The timeout interval, in milliseconds, to use for the request.
* @param {function(error, servicePropertiesResult, response)}  callback  The callback function.
* @return {undefined}
*/
MetricsService.prototype.getQueueTransactions = function (optionsOrCallback, callback) {
    this.metricsTableName = Constants.TransactionsQueueTableName;
    this._getMetrics(optionsOrCallback, callback);
}


/**
* Retrieves Table Transaction metrics from Windows Azure Storage Metrics.
*
* @this {MetricsService}
* @param {object|function}    [optionsOrCallback]                        The request options or callback function.
* @param {int}                [optionsOrCallback.timeoutIntervalInMs]    The timeout interval, in milliseconds, to use for the request.
* @param {function(error, servicePropertiesResult, response)}  callback  The callback function.
* @return {undefined}
*/
MetricsService.prototype.getTableTransactions = function (optionsOrCallback, callback) {
    this.metricsTableName = Constants.TransactionsTableTableName;
    this._getMetrics(optionsOrCallback, callback);
}


/**
* Validates a callback function.
*
* @param {string} callback The callback function.
* @return {undefined}
*/
function validateCallback(callback) {
  if (!callback) {
    throw new Error(MetricsService.incorrectCallbackErr);
  }
}


MetricsService.prototype._getMetrics = function (optionsOrCallback, callback) {
    var options = null;
    if (typeof optionsOrCallback === 'function' && !callback) {
        callback = optionsOrCallback;
    } else {
        options = optionsOrCallback;
    }

    validateCallback(callback);
    
console.log("Attempting Azure connection using acct " + this.storageAccount );

    var tableService = azure.createTableService(this.storageAccount, this.storageAccessKey);
  // tableService.logger = new azure.Logger(azure.Logger.LogLevels.DEBUG);

    // TODO: convert to use Constants
    var tableName = '$MetricsTransactionsBlob'; // Name your table here.

    // read & display data from table
    console.log("Query metrics from table " + this.metricsTableName );
    var query = azure.TableQuery.select().from( this.metricsTableName );
    tableService.queryEntities(query, callback);
};

