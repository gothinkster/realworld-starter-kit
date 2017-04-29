const yup = require('yup')
const timeStampSchema = require('./time-stamp-schema')
const isUUID = require('validator/lib/isUUID')

const tagSchema = yup.object().shape({

  id: yup.string()
    .test({
      name: 'id',
      message: '${path} must be uuid', // eslint-disable-line
      test: value => value ? isUUID(value) : true
    }),

  name: yup.string()
    .required()
    .max(30)
    .trim()

})
  .noUnknown()
  .concat(timeStampSchema)

module.exports = tagSchema
