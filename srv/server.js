//===============Original Code=================

const cds = require('@sap/cds');
const proxy= require('@sap/cds-odata-v2-adapter-proxy');
const xsenv = require('@sap/xsenv');
const passport = require('passport');
const JWTStrategy = require('@sap/xssec').JWTStrategy;
const services = xsenv.getServices({ uaa:'TSI-xsuaa' });

cds.on('bootstrap', app =>{
    app.use(proxy());
    passport.use(new JWTStrategy(services.uaa));
    app.use(passport.initialize());
    app.use(passport.authenticate('JWT', { session: false }));

    app.use((req, res, next) => {
      console.log("Logged-In User Email===", req.user.id);
      req.context = {
        user: req.user,
      };
      next();
    });
});  

module.exports = cds.server;




//================================================

// const cds = require('@sap/cds');
// const proxy= require('@sap/cds-odata-v2-adapter-proxy');

// cds.on('bootstrap', app =>{
//     app.use(proxy());
// });



//====================Code to Debug locally=========================

// const cds = require('@sap/cds');
// const proxy= require('@sap/cds-odata-v2-adapter-proxy');

// cds.on('bootstrap', app =>{
//     app.use(proxy());
//     app.use((req, res, next) => {
//         req.user = {
//             // id: 'jagjotsinghbakshi@nerolac.com',           
//             // name: 'jagjotsinghbakshi@nerolac.com',            
//             // roles: ['admin', 'user']      
            
//             id: 'vidhyapathi@maventic.com',           
//             name: 'vidhyapathi@maventic.com',            
//             roles: ['admin', 'user']    
//         };

//         console.log("Logged-In User Email===", req.user.id);

//         req.context = {
//           user: req.user,
//         };
//         console.log("req.context",req.context);
//         next();
//     });
// });

// module.exports = cds.server;

//================================================================ 