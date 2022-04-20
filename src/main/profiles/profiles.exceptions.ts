export class ProfileNotFound extends Error {
  constructor(username: string) {
    super(`Profile with username=${username} doesn't exist.`)
    this.name = 'ProfileNotFound'
  }
}
