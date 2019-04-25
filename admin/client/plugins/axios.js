import {getToken, removeToken} from '@/mixins'
export default async function ({ $axios, redirect }) {
  $axios.onRequest(async config => {
    config.headers.Authorization = await getToken()
  })
  // getToken(data => {
  //   console.log(data)
  //   if (data) {
  //     $axios.setHeader('Authorization', data)
  //     // $axios.setToken(data)
  //   }
  // })

  $axios.onError(error => {
    if (error.response.status === 401) {
      removeToken()
      redirect('/login')
    }
  })
}
