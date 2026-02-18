/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

const { getAccount } = require("../api/controllers/AccountController");
const { loginHandle, registerHandle, logout } = require("../api/controllers/AuthController");

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  //render pages only
  '/': { view: 'pages/loginpage' },
  '/register' : {view: 'pages/registerpage'},

  'POST /login' : loginHandle,
  'POST /register' : registerHandle,
  'GET /logout' : logout,

  'GET /dashboard' : 'AccountController.getAccount',
  'POST /dashboard': 'AccountController.createNewAccount',  
  'GET /account/delete/:id': 'AccountController.deleteAccount',
  'POST /account/edit/:id': 'AccountController.editAccount',

  'GET /transaction/:accountId' : 'TransactionController.viewTansaction',
  'POST /transaction/:accountId' : 'TransactionController.addTransaction',
  'GET /transaction/delete/:tId' : 'TransactionController.deleteTransaction',
  'POST /transaction/edit/:tId' : 'TransactionController.editTransacton'


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
