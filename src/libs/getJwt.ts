export function getJwtString(user: any) {
	const stringUser = JSON.stringify(user);
	const jwt = Buffer.from(stringUser).toString('base64');
  return jwt
}

export function getJwtObj(cookies: any) {
	const jwt = cookies.jwt && Buffer.from(cookies.jwt, 'base64').toString('utf-8');
  return jwt ? JSON.parse(jwt) : null
}