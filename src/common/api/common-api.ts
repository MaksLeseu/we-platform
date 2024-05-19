import { createApi } from '@reduxjs/toolkit/query/react'

import { baseQueryWithReauth } from '@/features/Auth/base-query-with-reauth'

export const baseApi = createApi({
   reducerPath: 'baseApi',
   baseQuery: baseQueryWithReauth,
   endpoints: () => ({}),
   tagTypes: ['Me'],
})
