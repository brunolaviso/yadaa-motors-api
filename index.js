const express = require('express')
const { v4: uuid } = require('uuid')
const { PrismaClient } = require('@prisma/client')

const app = express()

app.use(express.json())

const prisma = new PrismaClient()

app.get('/cars', async (request, response) => {
  const cars = await prisma.cars.findMany()
  return response.status(200).json(cars)
})

app.get('/cars/:id', async (request, response) => {
  const { id } = request.params

  const car = await prisma.cars.findUnique({
    where: {
      id
    }
  })

  if (!car) return response.status(404).json({ error: 'Car not found' })

  return response.status(200).json(car)
})

app.post('/cars', async (request, response) => {
  const { name } = request.body

  if (!name) return response.status(400).json({ error: 'Name is required' })

  const car = await prisma.cars.create({
    data: {
      id: uuid(),
      name
    }
  })

  return response.status(201).json(car)
})

app.put('/cars/:id', async (request, response) => {
  const { id } = request.params
  const { name } = request.body

  if (!name) return response.status(400).json({ error: 'Name is required' })

  const car = await prisma.cars.update({
    where: {
      id
    },
    data: {
      name
    }
  })

  if (!car) return response.status(404).json({ error: 'Car not found' })

  return response.status(200).json(car)
})

app.delete('/cars/:id', async (request, response) => {
  const { id } = request.params

  const car = await prisma.cars.delete({
    where: {
      id
    }
  })

  if (!car) return response.status(404).json({ error: 'Car not found' })

  return response.status(204).json()
})

app.listen(3333, () => console.log('Server is running'))
