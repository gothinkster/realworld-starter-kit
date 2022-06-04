export function createCredentials(username: string) {
  return {
    email:
      process.env[`EMAIL_${username.toUpperCase()}`] ||
      `${username.toLowerCase()}@mail.com`,
    password:
      process.env[`PASSWORD_${username.toUpperCase()}`] || 'asdaWAdji!oi8809jk',
  }
}
