"use strict";
exports.__esModule = true;
var express_1 = require("express");
var utils_1 = require("./utils");
var actions_1 = require("./actions");
var router = express_1.Router();
// ============= USER ROUTES =============
router.post('/user', utils_1.safe(actions_1.createUser));
router.get('/users', utils_1.safe(actions_1.getUsers));
router.get('/user/:id', utils_1.safe(actions_1.getUser));
router.put('/user/:id', utils_1.safe(actions_1.updateUser));
router["delete"]('/user/:id', utils_1.safe(actions_1.deleteUser));
// ============= PEOPLE ROUTES =============
router.get('/people', utils_1.safe(actions_1.getPeople));
router.get('/people/:people_id', utils_1.safe(actions_1.getPerson));
router.post('/people', utils_1.safe(actions_1.createPerson));
// ============= PLANET ROUTES =============
router.get('/planets', utils_1.safe(actions_1.getPlanets));
router.get('/planets/:planet_id', utils_1.safe(actions_1.getPlanet));
router.post('/planet', utils_1.safe(actions_1.createPlanet));
router.post('/planets', utils_1.safe(actions_1.createPlanet));
// ============= FAVORITES ROUTES =============
router.get('/users/favorites', utils_1.safe(actions_1.getUserFavorites));
router.post('/favorite/people/:people_id', utils_1.safe(actions_1.addFavoritePerson));
router["delete"]('/favorite/people/:people_id', utils_1.safe(actions_1.removeFavoritePerson));
router.post('/favorite/planet/:planet_id', utils_1.safe(actions_1.addFavoritePlanet));
router["delete"]('/favorite/planet/:planet_id', utils_1.safe(actions_1.removeFavoritePlanet));
exports["default"] = router;
