/* eslint-disable import/prefer-default-export */
export function parseError(error) {
  let errors;
  let message;

  if (error
    && error.response
    && error.response.data
    && error.response.data.errors instanceof Object) {
    ({ errors } = error.response.data);
  }
  if (error) {
    ({ message } = error);
  }
  return { errors, message };
}
/* eslint-enable */
