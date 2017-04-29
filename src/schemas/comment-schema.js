const yup = require('yup')
const timeStampSchema = require('./time-stamp-schema')
const isUUID = require('validator/lib/isUUID')

const commentSchema = yup.object().shape({

  id: yup.string()
    .test({
      name: 'id',
      message: '${path} must be uuid', // eslint-disable-line
      test: value => value ? isUUID(value) : true
    }),

  author: yup.string()
    .test({
      name: 'user',
      message: '${path} must be uuid', // eslint-disable-line
      test: value => value ? isUUID(value) : true
    }),

  article: yup.string()
    .test({
      name: 'article',
      message: '${path} must be uuid', // eslint-disable-line
      test: value => value ? isUUID(value) : true
    }),

  body: yup.string()
    .required()
    .trim()

})
  .noUnknown()
  .concat(timeStampSchema)

module.exports = commentSchema
