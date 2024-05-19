import { useForm } from 'react-hook-form'

type FromValue = {
   loginOrEmail: string
   password: string
}

export const Auth = () => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FromValue>()

   const onSubmit = (data: FromValue) => {
      console.log(data)
   }

   const emailRegex =
      /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/

   return (
      <form onSubmit={handleSubmit(onSubmit)}>
         {errors.loginOrEmail?.message && <span>{errors.loginOrEmail.message}</span>}
         <input
            {...register('loginOrEmail', {
               required: 'Email is required',
               pattern: { value: emailRegex, message: 'Invalid email' },
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
