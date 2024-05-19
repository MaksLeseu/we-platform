import { Navigate, Outlet } from 'react-router-dom'

import { useMeQuery } from '@/features/Auth/auth.service'

export const RequireAuth = () => {
   const { isError, isLoading } = useMeQuery({})

   if (isLoading) {
      return null
   }

   const isAuthenticated = !isError

   return isAuthenticated ? <Outlet /> : <Navigate to={`/login`} />
}
