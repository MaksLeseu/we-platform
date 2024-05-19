import { Navigate, Outlet } from 'react-router-dom'

import { useMeQuery } from '@/features/Auth/auth.service'
import { BASE_ROUTE } from '@/routes/Routes'

export const RequireAuth = () => {
   const { isError, isLoading } = useMeQuery()

   if (isLoading) {
      return null
   }

   const state = !isError

   return state ? <Outlet /> : <Navigate to={`${BASE_ROUTE}login`} />
}
