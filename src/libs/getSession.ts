import * as cookie from 'cookie';
import { getJwtObj } from './getJwt';

export function getSession(headerCookie: string | null) {
	const cookies = cookie.parse(headerCookie|| '');
  return {
    user: getJwtObj(cookies)
  }
}