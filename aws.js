const AWS = require('aws-sdk');
AWS.config.update( {
  region: 'us-east-1'
});
const dynamodb = new AWS.DynamoDB.DocumentClient();
const dynamodbTableName = 'crop-inventory';
const healthPath = '/health';
const cropPath = '/crop';
const cropsPath = '/crops';

exports.handler = async function(event) {
  console.log('Request event: ', event);
  let response;
  switch(true) {
    case event.httpMethod === 'GET' && event.path === healthPath:
      response = buildResponse(200);
      break;
    case event.httpMethod === 'GET' && event.path === cropPath:
      response = await getcrop(event.queryStringParameters.cropId);
      break;
    case event.httpMethod === 'GET' && event.path === cropsPath:
      response = await getcrops();
      break;
    case event.httpMethod === 'POST' && event.path === cropPath:
      response = await savecrop(JSON.parse(event.body));
      break;
    case event.httpMethod === 'PATCH' && event.path === cropPath:
      const requestBody = JSON.parse(event.body);
      response = await modifycrop(requestBody.cropId, requestBody.updateKey, requestBody.updateValue);
      break;
    case event.httpMethod === 'DELETE' && event.path === cropPath:
      response = await deletecrop(JSON.parse(event.body).cropId);
      break;
    default:
      response = buildResponse(404, '404 Not Found');
  }
  return response;
}

async function getcrop(cropId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'cropId': cropId
    }
  }
  return await dynamodb.get(params).promise().then((response) => {
    return buildResponse(200, response.Item);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  });
}

async function getcrops() {
  const params = {
    TableName: dynamodbTableName
  }
  const allcrops = await scanDynamoRecords(params, []);
  const body = {
    crops: allcrops
  }
  return buildResponse(200, body);
}

async function scanDynamoRecords(scanParams, itemArray) {
  try {
    const dynamoData = await dynamodb.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
  } catch(error) {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  }
}

async function savecrop(requestBody) {
  const params = {
    TableName: dynamodbTableName,
    Item: requestBody
  }
  return await dynamodb.put(params).promise().then(() => {
    const body = {
      Operation: 'SAVE',
      Message: 'SUCCESS',
      Item: requestBody
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  })
}

async function modifycrop(cropId, updateKey, updateValue) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'cropId': cropId
    },
    UpdateExpression: `set ${updateKey} = :value`,
    ExpressionAttributeValues: {
      ':value': updateValue
    },
    ReturnValues: 'UPDATED_NEW'
  }
  return await dynamodb.update(params).promise().then((response) => {
    const body = {
      Operation: 'UPDATE',
      Message: 'SUCCESS',
      UpdatedAttributes: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  })
}

async function deletecrop(cropId) {
  const params = {
    TableName: dynamodbTableName,
    Key: {
      'cropId': cropId
    },
    ReturnValues: 'ALL_OLD'
  }
  return await dynamodb.delete(params).promise().then((response) => {
    const body = {
      Operation: 'DELETE',
      Message: 'SUCCESS',
      Item: response
    }
    return buildResponse(200, body);
  }, (error) => {
    console.error('Do your custom error handling here. I am just gonna log it: ', error);
  })
}

function buildResponse(statusCode, body) {
  return {
    statusCode: statusCode,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  }
}