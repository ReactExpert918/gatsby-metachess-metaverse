import { Cookies } from 'react-cookie';
import moment from 'moment';
import { COOKIE_DOMAIN } from '../config';

class TokenService {
  private userKey: string = 'sessionToken';
  private guestKey: string = 'guestSessionToken';

  // private readonly cookieOptions = () => ({ path: '/', expires: moment().add(1, 'years').toDate(), domain: `localhost` })
  private readonly cookieOptions = () => ({ path: '/', expires: moment().add(1, 'years').toDate(), domain: COOKIE_DOMAIN })

  set user(token: string) {
    const cookies = new Cookies();
    if (token) {
      cookies.set(this.userKey, token, this.cookieOptions());
    }
  }

  get user(): string {
    const cookies = new Cookies();
    debugger
    const token = cookies.get(this.userKey);
    if (!token) {
      return null;
    }
    return token;
  }

  set guest(token: string) {
    const cookies = new Cookies();
    if (token) {
      cookies.set(this.guestKey, token, this.cookieOptions());
    }
  }

  get guest(): string {
    const cookies = new Cookies();
    const token = cookies.get(this.guestKey);
    if (!token) {
      return null;
    }
    return token;
  }

  get io(): string {
    const cookies = new Cookies();
    return cookies.get('io');
  }

  remove = (): void => {
    const cookies = new Cookies();
    if (cookies.get(this.userKey)) {
      cookies.remove(this.userKey, this.cookieOptions());
    }
    if (cookies.get(this.guestKey)) {
      cookies.remove(this.guestKey, this.cookieOptions());
    }
  }
}

const TOKEN = new TokenService();
export default TOKEN;
