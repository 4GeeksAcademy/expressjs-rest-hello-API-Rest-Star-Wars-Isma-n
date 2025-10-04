import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import { Users } from './entities/Users'
import { People } from './entities/People'
import { Planet } from './entities/Planet'
import { Exception } from './utils'

// ============= USER ACTIONS =============

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  if (!req.body.first_name) throw new Exception("Please provide a first_name")
  if (!req.body.last_name) throw new Exception("Please provide a last_name")
  if (!req.body.email) throw new Exception("Please provide an email")
  if (!req.body.password) throw new Exception("Please provide a password")

  const userRepo = getRepository(Users)
  const user = await userRepo.findOne({ where: { email: req.body.email } })
  if (user) throw new Exception("Users already exists with this email")

  const newUser = getRepository(Users).create(req.body)
  const results = await getRepository(Users).save(newUser)
  return res.json(results)
}

export const getUsers = async (req: Request, res: Response): Promise<Response> => {
  const users = await getRepository(Users).find()
  return res.json(users)
}

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(Users).findOne(req.params.id)
  if (!user) throw new Exception("User not found", 404)
  return res.json(user)
}

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(Users).findOne(req.params.id)
  if (!user) throw new Exception("User not found", 404)
  
  getRepository(Users).merge(user, req.body)
  const results = await getRepository(Users).save(user)
  return res.json(results)
}

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(Users).findOne(req.params.id)
  if (!user) throw new Exception("User not found", 404)
  
  await getRepository(Users).remove(user)
  return res.json({ message: "User deleted successfully" })
}

// ============= PEOPLE ACTIONS =============

export const getPeople = async (req: Request, res: Response): Promise<Response> => {
  const people = await getRepository(People).find()
  return res.json(people)
}

export const getPerson = async (req: Request, res: Response): Promise<Response> => {
  const person = await getRepository(People).findOne(req.params.people_id)
  if (!person) throw new Exception("Person not found", 404)
  return res.json(person)
}

export const createPerson = async (req: Request, res: Response): Promise<Response> => {
  if (!req.body.name) throw new Exception("Please provide a name")
  
  const newPerson = getRepository(People).create(req.body)
  const results = await getRepository(People).save(newPerson)
  return res.json(results)
}

// ============= PLANET ACTIONS =============

export const getPlanets = async (req: Request, res: Response): Promise<Response> => {
  const planets = await getRepository(Planet).find()
  return res.json(planets)
}

export const getPlanet = async (req: Request, res: Response): Promise<Response> => {
  const planet = await getRepository(Planet).findOne(req.params.planet_id)
  if (!planet) throw new Exception("Planet not found", 404)
  return res.json(planet)
}

export const createPlanet = async (req: Request, res: Response): Promise<Response> => {
  if (!req.body.name) throw new Exception("Please provide a name")
  
  const newPlanet = getRepository(Planet).create(req.body)
  const results = await getRepository(Planet).save(newPlanet)
  return res.json(results)
}

// ============= FAVORITES ACTIONS =============

export const getUserFavorites = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(Users).findOne(1, {
    relations: ['favorite_people', 'favorite_planets']
  })
  
  if (!user) throw new Exception("User not found. Create a user first.", 404)
  
  return res.json({
    id: user.id,
    email: user.email,
    favorites: {
      people: user.favorite_people,
      planets: user.favorite_planets
    }
  })
}

export const addFavoritePerson = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(Users).findOne(1, {
    relations: ['favorite_people']
  })
  
  if (!user) throw new Exception("User not found. Create a user first.", 404)
  
  const person = await getRepository(People).findOne(req.params.people_id)
  if (!person) throw new Exception("Person not found", 404)
  
  const isAlreadyFavorite = user.favorite_people.some(p => p.id === person.id)
  if (isAlreadyFavorite) throw new Exception("Person already in favorites", 400)
  
  user.favorite_people.push(person)
  await getRepository(Users).save(user)
  
  return res.json({ message: `${person.name} added to favorites` })
}

export const removeFavoritePerson = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(Users).findOne(1, {
    relations: ['favorite_people']
  })
  
  if (!user) throw new Exception("User not found", 404)
  
  const person = await getRepository(People).findOne(req.params.people_id)
  if (!person) throw new Exception("Person not found", 404)
  
  const favoriteIndex = user.favorite_people.findIndex(p => p.id === person.id)
  if (favoriteIndex === -1) throw new Exception("Person not in favorites", 400)
  
  user.favorite_people.splice(favoriteIndex, 1)
  await getRepository(Users).save(user)
  
  return res.json({ message: `${person.name} removed from favorites` })
}

export const addFavoritePlanet = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(Users).findOne(1, {
    relations: ['favorite_planets']
  })
  
  if (!user) throw new Exception("User not found. Create a user first.", 404)
  
  const planet = await getRepository(Planet).findOne(req.params.planet_id)
  if (!planet) throw new Exception("Planet not found", 404)
  
  const isAlreadyFavorite = user.favorite_planets.some(p => p.id === planet.id)
  if (isAlreadyFavorite) throw new Exception("Planet already in favorites", 400)
  
  user.favorite_planets.push(planet)
  await getRepository(Users).save(user)
  
  return res.json({ message: `${planet.name} added to favorites` })
}

export const removeFavoritePlanet = async (req: Request, res: Response): Promise<Response> => {
  const user = await getRepository(Users).findOne(1, {
    relations: ['favorite_planets']
  })
  
  if (!user) throw new Exception("User not found", 404)
  
  const planet = await getRepository(Planet).findOne(req.params.planet_id)
  if (!planet) throw new Exception("Planet not found", 404)
  
  const favoriteIndex = user.favorite_planets.findIndex(p => p.id === planet.id)
  if (favoriteIndex === -1) throw new Exception("Planet not in favorites", 400)
  
  user.favorite_planets.splice(favoriteIndex, 1)
  await getRepository(Users).save(user)
  
  return res.json({ message: `${planet.name} removed from favorites` })
}