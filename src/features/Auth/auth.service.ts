import { baseApi } from '@/common/api/common-api'
import { LoginType } from '@/common/utils/types/common-types'

const authService = baseApi.injectEndpoints({
   endpoints: builder => {
      return {
         login: builder.mutation<any, LoginType>({
            query: (args: LoginType) => {
               return {
                  url: `/auth/login`,
                  method: 'POST',
                  body: args,
               }
            },
         }),
      }
   },
})

export const { useLoginMutation } = authService
