import { baseApi } from '@/common/api/common-api'
import { LoginType } from '@/common/utils/types/common-types'

const authService = baseApi.injectEndpoints({
   endpoints: builder => {
      return {
         login: builder.mutation<LoginResponseType, LoginType>({
            query: (args: LoginType) => {
               return {
                  url: `/auth/login`,
                  method: 'POST',
                  body: args,
               }
            },
         }),
         me: builder.query({
            query: () => '/auth/me',
         }),
      }
   },
})

export const { useLoginMutation, useMeQuery } = authService

type LoginResponseType = {
   accessToken: string
}
