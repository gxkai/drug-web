export default function ({ $axios, redirect }) {
  $axios.setToken()

  $axios.onError(error => {
    if (error.response.status === 401) {
      // $axios.removeToken()
    }
  })
}
