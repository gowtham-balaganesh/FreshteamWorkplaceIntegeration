## Freshteam Workplace integration App

We have built an app to sync the CREATE/UPDATE/TERMINATE/DELETE action performed on employees in freshteam into workplace. 
Requirement : The org must have both freshteam and workplace account

CREATE - when a new employee is added in freshteam, a workplace account will be created for that employee and an activation link is then sent to the user

UPDATE - When any details is updated for the employee, the same will be reflected in the employee's workplace account, provide the updated one are the details represented in the workplace

TERMINATE/DELETE - Both actions will result in the account deactivation of the employee in workplace

### Project folder structure explained

    .
    ├── README.md                  This file.
    ├── config                     Installation parameter configs.
    │   ├── iparams.json           Installation parameter config in English language.
    │   └── iparam_test_data.json  Installation parameter data for local testing.
    └── manifest.json              Project manifest.
    └── server                     Business logic for remote request and event handlers.
        ├── lib
        │   └── handle-response.js
        ├── server.js
        └── test_data
            └── onEmployeeCreate.json
            
 To try it out, 
 
 1. clone the repo to your local directory
 2. Follow step 1 to 3 in this link, https://developer.freshdesk.com/v2/docs/quick-start/
 3. In the termianl, go the directory when you have cloned the repo
 4. Enter "fdk run" in the terminal (make sure you are inside the repo folder)
