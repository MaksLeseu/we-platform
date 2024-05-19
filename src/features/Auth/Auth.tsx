import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { setTokenToLocalStorage } from '@/common/utils/functions/localStorage/localStorage'
import { LoginType } from '@/common/utils/types/common-types'
import { useLoginMutation } from '@/features/Auth/auth.service'
import { BASE_ROUTE } from '@/routes/Routes'

export const Auth = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<LoginType>()
   const [login] = useLoginMutation()
   const navigate = useNavigate()

   const onSubmit = async (data: LoginType) => {
      try {
         const res = await login(data)

         if ('data' in res) {
            const token: string = res.data.accessToken

            setTokenToLocalStorage(token)
            navigate(`${BASE_ROUTE}`)
         } else if ('error' in res) {
            console.log(res.error)
         }
      } catch (err) {
         console.log(err)
      }
   }

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         {errors.loginOrEmail?.message && <span>{errors.loginOrEmail.message}</span>}
         <input
            {...register('loginOrEmail', {
               required: 'Email is required',
               minLength: { value: 3, message: 'Invalid email or login' },
            })}
            placeholder={'Email or Username'}
         />
         {errors.password?.message && <span>{errors.password.message}</span>}
         <input
            {...register('password', {
               required: 'Password is required',
               minLength: { value: 3, message: 'Password has to be at least 3 characters long' },
            })}
            placeholder={'Password'}
         />
         <button type={'submit'}>Sign In</button>
      </form>
   )
}
