const Actions = require('./actions-model')
const yup = require('yup')

async function validateActionId(req, res, next) {
  try {
    const actionId = await Actions.get(req.params.id)
    if (actionId) {
      req.action = actionId
      next()
    } else {
      next({ status: 404, message: 'action not found' })
    }
  } catch (err) {
    next(err)
  }
}

async function validateAction(req, res, next) {
  try {
    const action = await actionSchema.validate(req.body)
    req.body = action
    next()
  } catch (err) {
    next({ status: 400, message: err.message })
  }
}

module.exports = {
  validateActionId,
  validateAction
}

const actionSchema = yup.object().shape({
  project_id: yup
    .string()
    .typeError('Name must be a string')
    .trim()
    .required('name is required'),
  description: yup
    .string()
    .typeError('Description must be a string')
    .trim()
    .max(128, 'No longer than 128 chars')
    .required('A description is required'),
  notes: yup
    .string()
    .typeError('Notes must be a string')
    .required(),
  completed: yup
    .boolean()
    .typeError('completed must be bool')
    .required()
})
