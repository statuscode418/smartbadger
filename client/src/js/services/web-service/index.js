import { get, post, put, request } from 'requests'

export class WebService {
  getSampleBadge = async () => {
    try {
      const res = await get('/sample.svg')
      console.log(res)
      return Promise.resolve(res.data)
    } catch (err) {
      throw new Error(err)
    }
  }
  getBalanceBadge = async (contractAddress) => {
    try {
      const res = await get(`/${contractAddress}/balance.svg`)
      return Promise.resolve(res.data)
    } catch (err) {
      throw new Error(err)
    }
  }
}
