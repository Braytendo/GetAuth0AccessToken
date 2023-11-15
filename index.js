const axios = require("axios").default

const getToken = async () => {
  let options = {
    method: 'POST',
    url: 'ADD URL HERE',
    headers: {'content-type': 'application/x-www-form-urlencoded'},
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      audience: 'ADD AUDIENCE HERE',
      client_id: 'ADD CLIENT ID HERE',
      client_secret: 'ADD CLIENT SECRET HERE'
    })
  }

  const response = await axios.request(options).then(function (response) {
    // Return a confirmation message or chain naviga call.
    return response.data;
  }).catch(function (error) {
    if (error.response) {
      console.log({ status: error.response.status, message: error.response.data.error_description })
      return { status: error.response.status, message: error.response.data.error_description }
    } else {
      console.log("Error", error.message)
    }
  })

  return await response
}

exports.handler = async event => {
  try {
    const result = await getToken();
    console.log('result is: ️', result);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.log('Error is: ️', error);
    return {
      statusCode: 400,
      body: error.message,
    };
  }
};
