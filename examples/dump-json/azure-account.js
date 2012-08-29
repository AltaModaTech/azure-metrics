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


// NOTE: Set these values to use your Azure Storage Account name and access key.  If
//  these values are null, the environment variables AZURE_STORAGE_ACCOUNT & 
//  AZURE_STORAGE_ACCESS_KEY will be used.
var AzureAccount = {
    accountName: null, // replace with your azure storage account name as a string
    accountKey: null   // replace with your azure storage account access key as a string
};

module.exports = AzureAccount;