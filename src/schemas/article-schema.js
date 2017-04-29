const yup = require('yup')
const timeStampSchema = require('./time-stamp-schema')
const isUUID = require('validator/lib/isUUID')

const articleSchema = yup.object().shape({

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

  slug: yup.string()
    .trim(),

  title: yup.string()
    .required()
    .trim(),

  body: yup.string()
    .required()
    .trim(),

  description: yup.string()
    .required()
    .trim(),

  favoritesCount: yup.number()
    .required()
    .default(0),

  tagList: yup.array()
    .of(yup.string())

})
  .noUnknown()
  .concat(timeStampSchema)

module.exports = articleSchema
