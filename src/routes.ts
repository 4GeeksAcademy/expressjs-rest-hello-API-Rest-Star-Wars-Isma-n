import { Router } from 'express';
import { safe } from './utils';
import {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getPeople,
  getPerson,
  createPerson,
  getPlanets,
  getPlanet,
  createPlanet,
  getUserFavorites,
  addFavoritePerson,
  removeFavoritePerson,
  addFavoritePlanet,
  removeFavoritePlanet
} from './actions';

const router = Router();

// ============= USER ROUTES =============
router.post('/user', safe(createUser));
router.get('/users', safe(getUsers));
router.get('/user/:id', safe(getUser));
router.put('/user/:id', safe(updateUser));
router.delete('/user/:id', safe(deleteUser));

// ============= PEOPLE ROUTES =============
router.get('/people', safe(getPeople));
router.get('/people/:people_id', safe(getPerson));
router.post('/people', safe(createPerson));

// ============= PLANET ROUTES =============
router.get('/planets', safe(getPlanets));
router.get('/planets/:planet_id', safe(getPlanet));
router.post('/planet', safe(createPlanet));
router.post('/planets', safe(createPlanet));

// ============= FAVORITES ROUTES =============
router.get('/users/favorites', safe(getUserFavorites));
router.post('/favorite/people/:people_id', safe(addFavoritePerson));
router.delete('/favorite/people/:people_id', safe(removeFavoritePerson));
router.post('/favorite/planet/:planet_id', safe(addFavoritePlanet));
router.delete('/favorite/planet/:planet_id', safe(removeFavoritePlanet));

export default router;