import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { getTokenFromLocalStorage } from '@/common/utils/functions/localStorage/localStorage'

export const baseApi = createApi({
   reducerPath: 'baseApi',
   baseQuery: fetchBaseQuery({
      baseUrl: 'http://localhost:3000',
      prepareHeaders: (headers, { getState }) => {
         const token = getTokenFromLocalStorage()
         /*'(getState() as RootState).auth.token local storage'*/

         // If we have a token set in state, let's assume that we should be passing it.
         if (token) {
            headers.set('authorization', `Bearer ${token}`)
         }

         return headers
      },
   }),
   endpoints: () => ({}),
})
