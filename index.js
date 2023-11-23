const express = require('express')
// import express from 'express'
const { v4: uuid } = require('uuid')

const app = express()

app.use(express.json())

const cars = [
  {
    id: uuid(),
    name: 'Fusca'
  },
  {
    id: uuid(),
    name: 'Brasília'
  },
  {
    id: uuid(),
    name: 'Chevette'
  }
]

app.get('/cars', (request, response) => {
  return response.status(200).json(cars)
})

app.get('/cars/:id', (request, response) => {
  const { id } = request.params

  const car = cars.find(car => car.id === id)

  if (!car) return response.status(404).json({ error: 'Car not found' })

  return response.status(200).json(car)
})

app.post('/cars', (request, response) => {
  const { name } = request.body

  if (!name) return response.status(400).json({ error: 'Name is required' })

  const car = {
    id: uuid(),
    name
  }

  cars.push(car)

  return response.status(201).json(car)
})

app.put('/cars/:id', (request, response) => {
  const { id } = request.params
  const { name } = request.body

  if (!name) return response.status(400).json({ error: 'Name is required' })

  const car = cars.find(car => car.id === id)

  if (!car) return response.status(404).json({ error: 'Car not found' })

  car.name = name

  return response.status(200).json(car)
})

app.delete('/cars/:id', (request, response) => {
  const { id } = request.params

  const carIndex = cars.findIndex(car => car.id === id)

  if (carIndex < 0) return response.status(404).json({ error: 'Car not found' })

  cars.splice(carIndex, 1)

  return response.status(200).json(cars)
})

app.listen(3333, () => console.log('Server is running'))
