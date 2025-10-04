"use strict";
/**
 * Private Routes are those API urls that require the user to be
 * logged in before they can be called from the front end.
 *
 * Basically all HTTP requests to these endpoints must have an
 * Authorization header with the value "Bearer <token>"
 * being "<token>" a JWT token generated for the user using
 * the POST /token endpoint
 *
 * Please include in this file all your private URL endpoints.
 *
 */
exports.__esModule = true;
var express_1 = require("express");
// declare a new router to include all the endpoints
var router = express_1.Router();
// Por ahora, todas las rutas de StarWars están en routes.ts como rutas públicas
// porque la API no requiere autenticación según las instrucciones del ejercicio
// Cuando se implemente JWT, mover aquí las rutas que requieran autenticación
exports["default"] = router;
