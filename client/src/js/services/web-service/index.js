import { get, post, put, request } from 'requests'

export class WebService {
  getBadge = async () => {
    try {
      const res = await get('/sample.svg')
      return Promise.resolve(res.data)
    } catch (err) {
      throw new Error(err)
    }
  }

  login = async ({ username, password, twoFactorSecret }) => {
    const data = {
      username: username,
      password: password
    };
    if (twoFactorSecret && twoFactorSecret.length) {
      data['twoFactor'] = twoFactorSecret;
    }
    return post('/user/login', data);
  };

}
