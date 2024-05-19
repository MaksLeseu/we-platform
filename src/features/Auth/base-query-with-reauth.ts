import { fetchBaseQuery } from '@reduxjs/toolkit/query'
import type { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { Mutex } from 'async-mutex'

import {
   getTokenFromLocalStorage,
   setTokenToLocalStorage,
} from '@/common/utils/functions/localStorage/localStorage'

// create a new mutex
const mutex = new Mutex()
const baseQuery = fetchBaseQuery({
   baseUrl: 'http://localhost:3000',
   credentials: 'include',
   prepareHeaders: headers => {
      const token = getTokenFromLocalStorage()

      if (token) {
         headers.set('authorization', `Bearer ${token}`)
      }

      return headers
   },
})

export const baseQueryWithReauth: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, api, extraOptions) => {
   // wait until the mutex is available without locking it
   await mutex.waitForUnlock()
   let result = await baseQuery(args, api, extraOptions)

   if (result.error && result.error.status === 401) {
      // checking whether the mutex is locked
      if (!mutex.isLocked()) {
         const release = await mutex.acquire()

         try {
            const refreshResult = await baseQuery(
               { method: 'POST', url: '/auth/refresh-token' },
               api,
               extraOptions
            )

            const data = refreshResult.data as { accessToken: string }

            setTokenToLocalStorage(data.accessToken)

            // retry the initial query
            result = await baseQuery(args, api, extraOptions)
         } finally {
            // release must be called once the mutex should be released again.
            release()
         }
      } else {
         // wait until the mutex is available without locking it
         await mutex.waitForUnlock()
         result = await baseQuery(args, api, extraOptions)
      }
   }

   return result
}
