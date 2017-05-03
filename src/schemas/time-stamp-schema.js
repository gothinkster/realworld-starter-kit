const yup = require('yup')
const isISO8601 = require('validator/lib/isISO8601').default

const timeStampsSchema = yup.object().shape({

  createdAt: yup.string()
    .required()
    .test({
      name: 'createdAt',
      message: '${path} must be valid ISO8601 date', // eslint-disable-line
      test: value => value ? isISO8601(new Date(value).toISOString()) : true
    })
    .default(() => new Date().toISOString()),

  updatedAt: yup.string()
    .required()
    .test({
      name: 'updatedAt',
      message: '${path} must be valid ISO8601 date', // eslint-disable-line
      test: value => value ? isISO8601(new Date(value).toISOString()) : true
    })
    .default(() => new Date().toISOString())

})
  .noUnknown()

module.exports = timeStampsSchema
