// url : - az8wsv0bp.accounts.ondemand.com\
// endPoint - /scim/Users

// test IAS
//  url : - a176c029w.trial-accounts.ondemand.com
// endpoint : /scim/Users
// auntheticate : - Basic MzIxMjk3MDktMGE3Ni00OGEzLTg3ZmItOTAyOGJkMmM4NDVhOmNCaGF1ZV1jLlZWT21sSy9FMnVASE9Gemk6TGRvV2wtNw==

const https = require('https');
const querystring = require('querystring');


// function getUsers() {
//   return new Promise((resolve, reject) => {
//     const options = {
//       hostname: 'az8wsv0bp.accounts.ondemand.com',
//       path: '/scim/Users',
//       method: 'GET',
//       headers: {
//         'Authorization': 'Basic QWxlcnRiYXNpc0BuZXJvbGFjLmNvbTpEaWdpdGFsQDEyMw=='
//       }
//     };

//     const request = https.request(options, (response) => {
//       let data = '';

//       response.on('data', (chunk) => {
//         data += chunk.toString();
//       });

//       response.on('end', () => {
//         try {
//           const allData = JSON.parse(data);
//           resolve(allData);
//         } catch (error) {
//           reject(`Error parsing data: ${error.message}`);
//         }
//       });
//     });

//     request.on('error', (error) => {
//       reject(`Request failed: ${error.message}`);
//     });

//     request.end();
//   });
// }

// function filterIASUsers(email) {
//   return new Promise((resolve, reject) => {
//     const filter = `emails.value eq "${email}"`;
//     const queryParams = querystring.stringify({ filter });

//     const options = {
//       hostname: 'az8wsv0bp.accounts.ondemand.com',
//       path: `/scim/Users?${queryParams}`,
//       method: 'GET',
//       headers: {
//         'Authorization': 'Basic QWxlcnRiYXNpc0BuZXJvbGFjLmNvbTpEaWdpdGFsQDEyMw==',
//         'Content-Type': 'application/scim+json'
//       }
//     };

//     const request = https.request(options, (response) => {
//       let data = '';

//       response.on('data', (chunk) => {
//         data += chunk.toString();
//       });
//       response.on('end', () => {
//         try {
//           const allData = JSON.parse(data);
//           resolve(allData);
//         } catch (error) {
//           reject(`Error parsing data: ${error.message}`);
//         }
//       });
//     });

//     request.on('error', (error) => {
//       reject(`Request failed: ${error.message}`);
//     });

//     request.end();
//   });
// }




// trail IAS account


function findIASUser(email) {
  return new Promise((resolve, reject) => {
    const filter = `emails.value eq "${email}"`;
    const queryParams = querystring.stringify({ filter });
    const options = {
      hostname: 'az8wsv0bp.accounts.ondemand.com',
      path: `/scim/Users?${queryParams}`,
      method: 'GET',
      headers: {
        'Authorization': 'Basic QWxlcnRiYXNpc0BuZXJvbGFjLmNvbTpEaWdpdGFsQDEyMw=='
      }
    };
    console.log(options)

    const request = https.request(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk.toString();
      });
      response.on('end', () => {
        try {
          const allData = JSON.parse(data);
          resolve(allData);
        } catch (error) {
          reject(`Error parsing data: ${error.message}`);
        }
      });
    });

    request.on('error', (error) => {
      reject(`Request failed: ${error.message}`);
    });

    request.end();
  });
}

function createIASUser(newUser) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'az8wsv0bp.accounts.ondemand.com',
      path: `/scim/Users`,
      method: 'POST',
      headers: {
        'Authorization': 'Basic QWxlcnRiYXNpc0BuZXJvbGFjLmNvbTpEaWdpdGFsQDEyMw==',
        'Content-Type': 'application/scim+json'
      }
    };

    const requestData = JSON.stringify(newUser);

    const request = https.request(options, (response) => {
      let data = '';

      response.on('data', (chunk) => {
        data += chunk.toString();
      });

      response.on('end', () => {
        try {
          const responseData = JSON.parse(data);
          resolve(responseData);
        } catch (error) {
          reject(`Error parsing response data: ${error.message}`);
        }
      });
    });

    request.on('error', (error) => {
      reject(`Request failed: ${error.message}`);
    });

    request.write(requestData);
    request.end();
  });
}




module.exports = {findIASUser, createIASUser }





