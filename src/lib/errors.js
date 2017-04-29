const {ValidationError} = require('yup')
class UnauthorizedError extends Error {}
class ForbiddenError extends Error {}
class NotFoundError extends Error {}
class ServerError extends Error {}

module.exports = {
  UnauthorizedError, // 401
  ForbiddenError, // 403
  NotFoundError,
  ValidationError,
  ServerError
}
