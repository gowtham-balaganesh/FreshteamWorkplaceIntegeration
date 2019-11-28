'use strict'

const requestNPM = require('request');

function cleanOptions(options) {
    return JSON.stringify(options, function (key, value) {
        if (key === 'formData') {
            delete value['attachments[]'].value;
            delete value.description;
            delete value.body;
        }
        return value;
    });
}

function request(options) {
  console.log("requsr function")
    return new Promise((resolve, reject) => {
        requestNPM.post(options.url, options ,function (error, response, body) {
          console.log("respnse",response)
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


function requester(options){

  requestNPM.post(options, function(error, response, body){
    console.log("error",error);
    console.log("body",body);

  }) 
}

exports = {

  events: [
    { event: 'onEmployeeCreate', callback: 'onEmployeeCreateHandler' }
    // { event: 'onEmployeeUpdate', callback: 'onEmployeeUpdateHandler' }
  ],

  onEmployeeCreateHandler: function(args) {
  	const external_id = "2311";
  	const options = {
  		method:'POST',
  		url:'https://graph.facebook.com/company/accounts',
  		headers:{
  			Authorization: `Bearer DQVJ2RzNSRXlKQmNuRnYwaTMwT1lWM0pxZAVlPOGhzV0EwamVQNGxSRFVEOUxsMU5Od19sLUNNVVdOOXpQLWQwT0RvUDNleExnUkswaDQxY3N5WGRCMGhMTnNNNk9UbHZAZAc0J0cVBQaUE1QVl5VFZA4eWZAFYVg2MmQ1ckZAIVmFScjF2NUdjR1NtUjNYRnFQLTU4eGE0bWFHT0VBcTNCNXFHeVNfdXZAKU2hYLVBZAczEyVHdyMXE3bEJocmdnQjdLbnRyOTRjUFFVcVk0UWNlUXNUMwZDZD}`
  		},
  		form:{
			  "name"         : args["data"]["employee"]["first_name"],
			  "email"        : args["data"]["employee"]["user_emails"][0],
			  "title"        : args["data"]["employee"]["designation"],
			  "department"   : args["data"]["employee"]["department"],
			  "organization" : "Freshworks",
			  "manager"      : args["data"]["associations"]["reporting_to"]["user_emails"][0],
			  "division"     : "Freshdesk",	
			  "cost_center"  : "test",
			  "external_id"  : external_id,
			  "invited"      : true,
			  "work_locale"  : args["data"]["associations"]["branch"]["location"],
			  "auth_method"  : "password"
			}
    }
    requester(options);
    external_id = Number(external_id)+1;
    external_id.toString();
  }//,

  onEmployeeUpdateHandler: function(args) {
  	const email = args["data"]["employee"]["user_emails"][0]
  	const addr = "https://graph.facebook.com/"+email
  	const options = {
  		method:'GET',
  		url:addr,
  		headers:{
  			Authorization: `Bearer DQVJ2RzNSRXlKQmNuRnYwaTMwT1lWM0pxZAVlPOGhzV0EwamVQNGxSRFVEOUxsMU5Od19sLUNNVVdOOXpQLWQwT0RvUDNleExnUkswaDQxY3N5WGRCMGhMTnNNNk9UbHZAZAc0J0cVBQaUE1QVl5VFZA4eWZAFYVg2MmQ1ckZAIVmFScjF2NUdjR1NtUjNYRnFQLTU4eGE0bWFHT0VBcTNCNXFHeVNfdXZAKU2hYLVBZAczEyVHdyMXE3bEJocmdnQjdLbnRyOTRjUFFVcVk0UWNlUXNUMwZDZD}`
  		}
    }
    resp = requester(options);
    console.log(resp);
  }






  	// const args["data"]["employee"][""]
  	// const options = {
  	// 	method:'PUT',
  	// 	url:"https://graph.facebook.com/"+"/",
  	// 	headers:{
  	// 		Authorization: `Bearer DQVJ2RzNSRXlKQmNuRnYwaTMwT1lWM0pxZAVlPOGhzV0EwamVQNGxSRFVEOUxsMU5Od19sLUNNVVdOOXpQLWQwT0RvUDNleExnUkswaDQxY3N5WGRCMGhMTnNNNk9UbHZAZAc0J0cVBQaUE1QVl5VFZA4eWZAFYVg2MmQ1ckZAIVmFScjF2NUdjR1NtUjNYRnFQLTU4eGE0bWFHT0VBcTNCNXFHeVNfdXZAKU2hYLVBZAczEyVHdyMXE3bEJocmdnQjdLbnRyOTRjUFFVcVk0UWNlUXNUMwZDZD}`
  	// 	},
  	// 	form:{
			//   "name"         : args["data"]["employee"]["first_name"],
			//   "email"        : args["data"]["employee"]["user_emails"][0],
			//   "title"        : args["data"]["employee"]["designation"],
			//   "department"   : args["data"]["employee"]["department"],
			//   "organization" : "Freshworks",
			//   "manager"      : "15tuee047@skct.edu.in",
			//   "division"     : "Freshdesk",	
			//   "cost_center"  : "test",
			//   "external_id"  : "2309",
			//   "invited"      : true,
			//   "work_locale"  : args["data"]["associations"]["branch"]["location"],
			//   "auth_method"  : "password"
			// }
   //  }
  //   requester(options);
  // }

};