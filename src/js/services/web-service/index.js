import { get, post, put } from 'requests';
// import * as config from "config/config.json";

export class WebService {
  checkEmailAvailability = async email => {
    try {
      const res = await get('/user/email/available', { value: email });
      return Promise.resolve(res.data.available);
    } catch (err) {
      throw new Error(err);
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
