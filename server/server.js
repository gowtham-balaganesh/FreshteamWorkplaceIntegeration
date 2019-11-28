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

  requestNPM(options, function(error, response, body){
    console.log("error",error);
    console.log("body",body);

  }) 
}

// function form_data(args){
// 	var department_id = args["user"]["job_role_id"] 
//   	for( let i = 0; i < args["user"]["job_roles"].length; i++){
//   		if( args["user"]["job_roles"] == department_id ){
//   			var department_name = args["user"]["job_roles"]["name"]
//   		}
//   	}
//   	var reporting_manager_id = args["user"]["reporting_to_id"]
//   	var manager_email_id = args["user_emails"][1]["email"]
// 		const form={
// 			  "name"         : args["user"]["first_name"],
// 			  "email"        : args["user"]["email"],
// 			  "phone"				 : args["user_additional_details"]["work_numbers"][0]["number"],
// 			  "department"   : department_name,
// 			  "title"        : args["user"]["designation"],
// 			  "division"     : args["user"]["team_id"],	
// 			  "organization" : "Freshworks",
// 			  "manager"      : manager_email_id,
// 			  "start_date"   : args["user"]["joining_date"],
// 			  "invited"      : true,
// 			  "work_locale"  : args["branches"]["location"],
// 			  "auth_method"  : "password"
// 			}
// }

exports = {

  events: [
    { event: 'onEmployeeCreate', callback: 'onEmployeeCreateHandler' },
    { event: 'onEmployeeUpdate', callback: 'onEmployeeUpdateHandler' }
  ],

  onEmployeeCreateHandler: function(args) {
  	var department_id = args["user"]["job_role_id"] 
  	for( var i = 0; i < args["job_roles"].length; i++){
  		if( args["job_roles"][i]["id"] == department_id ){
  			var department_name = args["job_roles"][i]["name"]
  		}
  	}
  	var manager_email_id = args["user_emails"][1]["email"]
  	var team_id = args["user"]["team_id"] 
  	for( let i = 0; i < args["teams"].length; i++){
  		if( args["teams"][i]["id"] == team_id ){
  			var team_name = args["teams"][i]["name"]
  		}
  	}
  	var options = {
  		method:'POST',
  		url:'https://graph.facebook.com/company/accounts',
  		headers:{
  			Authorization: `Bearer DQVJ2RzNSRXlKQmNuRnYwaTMwT1lWM0pxZAVlPOGhzV0EwamVQNGxSRFVEOUxsMU5Od19sLUNNVVdOOXpQLWQwT0RvUDNleExnUkswaDQxY3N5WGRCMGhMTnNNNk9UbHZAZAc0J0cVBQaUE1QVl5VFZA4eWZAFYVg2MmQ1ckZAIVmFScjF2NUdjR1NtUjNYRnFQLTU4eGE0bWFHT0VBcTNCNXFHeVNfdXZAKU2hYLVBZAczEyVHdyMXE3bEJocmdnQjdLbnRyOTRjUFFVcVk0UWNlUXNUMwZDZD}`
  		},
  		form:{
			  "name"         : args["user"]["first_name"],
			  "email"        : args["user"]["email"],
			  "phone"				 : [ args["user_additional_details"][0]["work_numbers"][0]["number"] ],
			  "department"   : department_name,
			  "title"        : args["user"]["designation"],
			  "division"     : team_name,	
			  "organization" : "Freshworks",
			  "manager"      : manager_email_id,		
			  "start_date"   : args["user"]["joining_date"],
			  "invited"      : true,
			  "work_locale"  : "en_IN",
			  "auth_method"  : "password"
			}
    }
    console.log(options["form"])
    //requester(options);
  },

  onEmployeeUpdateHandler: function(args) {
  	var email = args["data"]["employee"]["user_emails"][0]
  	var addr = "https://graph.facebook.com/" + email
  	var options = {
  		method:'GET',
  		url:addr,
  		headers:{
  			Authorization: `Bearer DQVJ2RzNSRXlKQmNuRnYwaTMwT1lWM0pxZAVlPOGhzV0EwamVQNGxSRFVEOUxsMU5Od19sLUNNVVdOOXpQLWQwT0RvUDNleExnUkswaDQxY3N5WGRCMGhMTnNNNk9UbHZAZAc0J0cVBQaUE1QVl5VFZA4eWZAFYVg2MmQ1ckZAIVmFScjF2NUdjR1NtUjNYRnFQLTU4eGE0bWFHT0VBcTNCNXFHeVNfdXZAKU2hYLVBZAczEyVHdyMXE3bEJocmdnQjdLbnRyOTRjUFFVcVk0UWNlUXNUMwZDZD}`
  		}
    }
    resp = requester(options)
    var id = resp["id"]
  	var options = {
  		method:'PUT',
  		url:"https://graph.facebook.com/" + id,
  		headers:{
  			Authorization: `Bearer DQVJ2RzNSRXlKQmNuRnYwaTMwT1lWM0pxZAVlPOGhzV0EwamVQNGxSRFVEOUxsMU5Od19sLUNNVVdOOXpQLWQwT0RvUDNleExnUkswaDQxY3N5WGRCMGhMTnNNNk9UbHZAZAc0J0cVBQaUE1QVl5VFZA4eWZAFYVg2MmQ1ckZAIVmFScjF2NUdjR1NtUjNYRnFQLTU4eGE0bWFHT0VBcTNCNXFHeVNfdXZAKU2hYLVBZAczEyVHdyMXE3bEJocmdnQjdLbnRyOTRjUFFVcVk0UWNlUXNUMwZDZD}`
  		},
  		form:{
			  "name"         : args["user"]["name"],
			  "email"        : args["user"]["email"],
			  "phone"        : args["user_personal_details"][0]["phone_numbers"][0]["number"],
			  "department"   : args["data"]["employee"]["department"],
			  "title"        : args["data"]["employee"]["designation"],
			  "department"   : args["data"]["employee"]["department"],
			  "organization" : "Freshworks",
			  "manager"      : agrs["user_emails"][1]["email"],
			  "division"     : "Freshdesk",
			  "invited"      : true,
			  "work_locale"  : args["branch"]["location"],
			  "auth_method"  : "password"
			}
    }
    requester(options);
  }

};