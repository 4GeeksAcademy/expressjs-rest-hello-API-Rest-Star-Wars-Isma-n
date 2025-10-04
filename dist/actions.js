"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.removeFavoritePlanet = exports.addFavoritePlanet = exports.removeFavoritePerson = exports.addFavoritePerson = exports.getUserFavorites = exports.createPlanet = exports.getPlanet = exports.getPlanets = exports.createPerson = exports.getPerson = exports.getPeople = exports.deleteUser = exports.updateUser = exports.getUser = exports.getUsers = exports.createUser = void 0;
var typeorm_1 = require("typeorm");
var Users_1 = require("./entities/Users");
var People_1 = require("./entities/People");
var Planet_1 = require("./entities/Planet");
var utils_1 = require("./utils");
// ============= USER ACTIONS =============
var createUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepo, user, newUser, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.first_name)
                    throw new utils_1.Exception("Please provide a first_name");
                if (!req.body.last_name)
                    throw new utils_1.Exception("Please provide a last_name");
                if (!req.body.email)
                    throw new utils_1.Exception("Please provide an email");
                if (!req.body.password)
                    throw new utils_1.Exception("Please provide a password");
                userRepo = typeorm_1.getRepository(Users_1.Users);
                return [4 /*yield*/, userRepo.findOne({ where: { email: req.body.email } })];
            case 1:
                user = _a.sent();
                if (user)
                    throw new utils_1.Exception("Users already exists with this email");
                newUser = typeorm_1.getRepository(Users_1.Users).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(newUser)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createUser = createUser;
var getUsers = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).find()];
            case 1:
                users = _a.sent();
                return [2 /*return*/, res.json(users)];
        }
    });
}); };
exports.getUsers = getUsers;
var getUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found", 404);
                return [2 /*return*/, res.json(user)];
        }
    });
}); };
exports.getUser = getUser;
var updateUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found", 404);
                typeorm_1.getRepository(Users_1.Users).merge(user, req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(user)];
            case 2:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.updateUser = updateUser;
var deleteUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(req.params.id)];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found", 404);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).remove(user)];
            case 2:
                _a.sent();
                return [2 /*return*/, res.json({ message: "User deleted successfully" })];
        }
    });
}); };
exports.deleteUser = deleteUser;
// ============= PEOPLE ACTIONS =============
var getPeople = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var people;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).find()];
            case 1:
                people = _a.sent();
                return [2 /*return*/, res.json(people)];
        }
    });
}); };
exports.getPeople = getPeople;
var getPerson = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var person;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(People_1.People).findOne(req.params.people_id)];
            case 1:
                person = _a.sent();
                if (!person)
                    throw new utils_1.Exception("Person not found", 404);
                return [2 /*return*/, res.json(person)];
        }
    });
}); };
exports.getPerson = getPerson;
var createPerson = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPerson, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide a name");
                newPerson = typeorm_1.getRepository(People_1.People).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(People_1.People).save(newPerson)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPerson = createPerson;
// ============= PLANET ACTIONS =============
var getPlanets = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).find()];
            case 1:
                planets = _a.sent();
                return [2 /*return*/, res.json(planets)];
        }
    });
}); };
exports.getPlanets = getPlanets;
var getPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var planet;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).findOne(req.params.planet_id)];
            case 1:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("Planet not found", 404);
                return [2 /*return*/, res.json(planet)];
        }
    });
}); };
exports.getPlanet = getPlanet;
var createPlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var newPlanet, results;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.name)
                    throw new utils_1.Exception("Please provide a name");
                newPlanet = typeorm_1.getRepository(Planet_1.Planet).create(req.body);
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).save(newPlanet)];
            case 1:
                results = _a.sent();
                return [2 /*return*/, res.json(results)];
        }
    });
}); };
exports.createPlanet = createPlanet;
// ============= FAVORITES ACTIONS =============
var getUserFavorites = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(1, {
                    relations: ['favorite_people', 'favorite_planets']
                })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found. Create a user first.", 404);
                return [2 /*return*/, res.json({
                        id: user.id,
                        email: user.email,
                        favorites: {
                            people: user.favorite_people,
                            planets: user.favorite_planets
                        }
                    })];
        }
    });
}); };
exports.getUserFavorites = getUserFavorites;
var addFavoritePerson = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, person, isAlreadyFavorite;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(1, {
                    relations: ['favorite_people']
                })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found. Create a user first.", 404);
                return [4 /*yield*/, typeorm_1.getRepository(People_1.People).findOne(req.params.people_id)];
            case 2:
                person = _a.sent();
                if (!person)
                    throw new utils_1.Exception("Person not found", 404);
                isAlreadyFavorite = user.favorite_people.some(function (p) { return p.id === person.id; });
                if (isAlreadyFavorite)
                    throw new utils_1.Exception("Person already in favorites", 400);
                user.favorite_people.push(person);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(user)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ message: person.name + " added to favorites" })];
        }
    });
}); };
exports.addFavoritePerson = addFavoritePerson;
var removeFavoritePerson = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, person, favoriteIndex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(1, {
                    relations: ['favorite_people']
                })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found", 404);
                return [4 /*yield*/, typeorm_1.getRepository(People_1.People).findOne(req.params.people_id)];
            case 2:
                person = _a.sent();
                if (!person)
                    throw new utils_1.Exception("Person not found", 404);
                favoriteIndex = user.favorite_people.findIndex(function (p) { return p.id === person.id; });
                if (favoriteIndex === -1)
                    throw new utils_1.Exception("Person not in favorites", 400);
                user.favorite_people.splice(favoriteIndex, 1);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(user)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ message: person.name + " removed from favorites" })];
        }
    });
}); };
exports.removeFavoritePerson = removeFavoritePerson;
var addFavoritePlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, planet, isAlreadyFavorite;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(1, {
                    relations: ['favorite_planets']
                })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found. Create a user first.", 404);
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).findOne(req.params.planet_id)];
            case 2:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("Planet not found", 404);
                isAlreadyFavorite = user.favorite_planets.some(function (p) { return p.id === planet.id; });
                if (isAlreadyFavorite)
                    throw new utils_1.Exception("Planet already in favorites", 400);
                user.favorite_planets.push(planet);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(user)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ message: planet.name + " added to favorites" })];
        }
    });
}); };
exports.addFavoritePlanet = addFavoritePlanet;
var removeFavoritePlanet = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, planet, favoriteIndex;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).findOne(1, {
                    relations: ['favorite_planets']
                })];
            case 1:
                user = _a.sent();
                if (!user)
                    throw new utils_1.Exception("User not found", 404);
                return [4 /*yield*/, typeorm_1.getRepository(Planet_1.Planet).findOne(req.params.planet_id)];
            case 2:
                planet = _a.sent();
                if (!planet)
                    throw new utils_1.Exception("Planet not found", 404);
                favoriteIndex = user.favorite_planets.findIndex(function (p) { return p.id === planet.id; });
                if (favoriteIndex === -1)
                    throw new utils_1.Exception("Planet not in favorites", 400);
                user.favorite_planets.splice(favoriteIndex, 1);
                return [4 /*yield*/, typeorm_1.getRepository(Users_1.Users).save(user)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.json({ message: planet.name + " removed from favorites" })];
        }
    });
}); };
exports.removeFavoritePlanet = removeFavoritePlanet;
