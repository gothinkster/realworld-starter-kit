const yup = require('yup')

const timeStampsSchema = yup.object().shape({

  createdAt: yup.date()
    .required()
    .default(() => new Date()),

  updatedAt: yup.date()
    .required()
    .default(() => new Date())

})
  .noUnknown()

module.exports = timeStampsSchema
