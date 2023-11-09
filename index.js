const express = require('express')
// import express from 'express'

const app = express()

app.use(express.json())

const cars = [
  {
    id: 1,
    name: 'Fusca'
  },
  {
    id: 2,
    name: 'Brasília'
  },
  {
    id: 3,
    name: 'Chevette'
  }
]

app.get('/cars', (request, response) => {
  return response.status(200).json(cars)
})

app.get('/cars/:id', (request, response) => {
  const { id } = request.params

  const car = cars.find(car => car.id === Number(id))

  return response.status(200).json(car)
})

app.post('/cars', (request, response) => {
  console.log(request.body)

  const { name } = request.body

  const car = {
    id: cars.length + 1,
    name
  }

  cars.push(car)

  return response.status(201).json(car)
})

app.put('/cars/:id', (request, response) => {
  const { id } = request.params
  const { name } = request.body

  const car = cars.find(car => car.id === Number(id))

  car.name = name

  return response.status(200).json(car)
})

app.delete('/cars/:id', (request, response) => {
  const { id } = request.params

  const carIndex = cars.findIndex(car => car.id === Number(id))

  cars.splice(carIndex, 1)

  return response.status(200).json(cars)
})

app.listen(3333, () => console.log('Server is running'))
