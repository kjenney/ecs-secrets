module.exports = {
   processSecret: function() {
      return "Hello";
   }
}

function processSecret(secretName, client) {
  client.getSecretValue({SecretId: secretName}, function(err, data) {
      if(err) {
          if(err.code === 'ResourceNotFoundException')
              console.log("The requested secret " + secretName + " was not found");
          else if(err.code === 'InvalidRequestException')
              console.log("The request was invalid due to: " + err.message);
          else if(err.code === 'InvalidParameterException')
              console.log("The request had invalid params: " + err.message);
      }
      else {
          const current_dict = JSON.parse(data['SecretString']);
          //console.log(current_dict)
          Object.keys(current_dict)
            .forEach(function eachKey(key) {
              //console.log(key);
              //console.log(current_dict[key]);
              process.env[key] = current_dict[key]
            });
      }
  });
}

// Parse JSON and set environment variables
function setEnvVars() {
  var AWS = require('aws-sdk'),
  endpoint = "https://secretsmanager.us-east-1.amazonaws.com",
  region = "us-east-1",
  secretName = "prod/carrier/test",
  secret,
  binarySecretData;

  // Create a Secrets Manager client
  var client = new AWS.SecretsManager({
      endpoint: endpoint,
      region: region
  });

  client.listSecrets(function(err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      //console.log(data.SecretList);
      const match = data.SecretList.filter(item => {
	     return item.Name.includes('carrier') && item.Name.includes(process.env.NODE_ENV)
      });

      match.forEach((config) => {
      	Object.keys(config).map(key => {
          if(key == 'Name') {
            processSecret(config[key], client)
          }
      	})
      })
    };
  });
}

async function getSecrets() {
  return setEnvVars();
}
