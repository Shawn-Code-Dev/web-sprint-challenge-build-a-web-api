const Projects = require('./projects-model')
const yup = require('yup')

async function validateProjectId(req, res, next) {
  try {
    const projId = await Projects.get(req.params.id)
    if (projId) {
      req.project = projId
      next()
    } else {
      next({ status: 404, message: 'project not found' })
    }
  } catch (err) {
    next(err)
  }
}

async function validateProject(req, res, next) {
  try {
    const project = await projectSchema.validate(req.body)
    req.body = project
    next()
  } catch (err) {
    next({ status: 400, message: err.message })
  }
}

module.exports = {
  validateProjectId,
  validateProject
}

const projectSchema = yup.object().shape({
  name: yup
    .string()
    .typeError('Name must be a string')
    .trim()
    .required('name is required'),
  description: yup
    .string()
    .typeError('Description must be a string')
    .trim()
    .required('A description is required'),
  completed: yup
    .boolean()
    .typeError('Completed must be a bool')
    .required()
})
