function request(options) {
    return new Promise((resolve, reject) => {
        requestNPM(options, function (error, response, body) {
            if (error) {
                return reject(
                    `Error during request with options ${cleanOptions(options)}. Status code: ${error.statusCode} Response: ${error.message}`
                );
            }

            if (!SUCCESS_CODES.includes(response.statusCode)) {
                return reject(
                    `Error during request with options ${cleanOptions(options)}. Status code: ${response.statusCode}`
                );
            }

             console.log(`Request with options ${cleanOptions(options)} succeeded.`);
            return resolve(body);
        });
    });
}