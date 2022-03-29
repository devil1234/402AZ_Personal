const AWS = require("aws-sdk");

const dynamo = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event, context) => {
  let body;
  let statusCode = 200;
  const headers = {
    "Content-Type": "application/json"
  };

  try {
    switch (event.routeKey) {
      case "GET /tvshow/{id}":
        body = await dynamo
          .get({
            TableName: "tvshows",
            Key: {
              id: event.pathParameters.id
            }
          })
          .promise();
        break;
        case "GET /tvshow/{id}/season":
        body = await dynamo
          .get({
            TableName: "tvshows",
            Key: {
              id: event.pathParameters.id
            },
            ProjectionExpression: "seasons",
          })
          .promise();
        break;
        case "GET /tvshow/{id}/season/{seasonId}/episodes":
        body = await dynamo
          .query({
            TableName: "tvshows",
            ProjectionExpression: "seasons",
            KeyConditionExpression: `#sId = :sId AND #i = :id`,
            ExpressionAttributeNames: {
                "#sId" : "seasonId"
            },
            ExpressionAttributeValues: {
                 ":sId": event.pathParameters.seasonId,
                 ":id": event.pathParameters.id 
            }
          })
          .promise();
        break;
      case "GET /tvshows":
        body = await dynamo.scan({ TableName: "tvshows" }).promise();
        break;
      default:
        throw new Error(`Unsupported route: "${event.routeKey}"`);
    }
  } catch (err) {
    statusCode = 400;
    body = err.message;
  } finally {
    body = JSON.stringify(body);
  }

  return {
    statusCode,
    body,
    headers
  };
};