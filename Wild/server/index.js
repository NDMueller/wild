//=== Require Dependencies ==================================
const express = require('express')
    , bodyParser = require('body-parser')
    , session = require('express-session')
    , cors = require('cors')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , massive = require('massive')
    , config = require('./config')
    , path = require('path')
    ;


//=== Initialize App ========================================
const app = module.exports = express();
const port = 4000;
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('./../dist'));

//=== Database ==============================================
var massiveInstance = massive.connectSync(config.massiveConnection);
app.set('db',massiveInstance)
var db = app.get('db');





//=== Controllers ===========================================

const recipeCtrl =require('./controllers/recipeCtrl');




//===  Endpoints ========================================
app.get('/recipes',recipeCtrl.getRecipes)
app.post('/recipes/',recipeCtrl.addRecipe)
app.put('/recipes',recipeCtrl.updateRecipe);
app.delete('/recipes',recipeCtrl,destroyRecipe);








// VERY BOTTOM
//=== Listen ================================================
app.listen(port,()=>{console.log('Fire in the hole! ' +  port)});
