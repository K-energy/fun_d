'use strict'

const express = require('express')
const router = express.Router()

const Project = require('../models/Project')
const Company = require('../models/Company')

router.get('/project', async (req, res) => {
  const projects = await Project.find({})
  res.json(projects)
})

router.get('/project/:id', async (req, res) => {
  const { id } = req.params

  const project = await Project.findById(id).populate({
    path: 'contributors',
    model: 'Company'
  })
  res.json(project)
})

router.get('/company', async (req, res) => {
  const companies = await Company.find({})
  res.json(companies)
})

router.get('/company/:id', async (req, res) => {
  const { id } = req.params

  const company = await Company.findById(id)
  res.json(company)
})

module.exports = router