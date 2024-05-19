import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

import { getTokenFromLocalStorage } from '@/common/utils/functions/localStorage/localStorage'

export const baseApi = createApi({
   reducerPath: 'baseApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:3000',
      prepareHeaders: headers => {
         const token = getTokenFromLocalStorage()

         if (token) {
            headers.set('authorization', `Bearer ${token}`)
         }

         return headers
      },
   }),
   endpoints: () => ({}),
})
