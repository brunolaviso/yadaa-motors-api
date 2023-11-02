const express = require('express')
// import express from 'express'

const app = express()

app.get('/', (request, response) => {
  const { name } = request.query

  return response.status(201).json({
    message: `Hello ${name}`
  })
})

app.listen(3333, () => console.log('Server is running'))
