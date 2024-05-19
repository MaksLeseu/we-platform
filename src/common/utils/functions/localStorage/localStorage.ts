export const setTokenToLocalStorage = (accessToken: string) => {
   if (accessToken) {
      localStorage.setItem('accessToken', JSON.stringify(accessToken))
   }

   return
}

export const getTokenFromLocalStorage = () => {
   const accessToken = localStorage.getItem('accessToken')

   return accessToken && JSON.parse(accessToken)
}
