import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'

import MainLayout from 'components/MainLayout'
import { signup } from 'services/index/users'

const RegisterPage = () => {
  const navigate = useNavigate()

  const { mutate, isLoading } = useMutation({
    mutationFn: ({ username, email, password }) => {
      return signup({ username, email, password })
    },
    onSuccess: (data) => {
      if (data.code === 201) {
        setTimeout(() => {
          navigate('/auth/login')
        }, 3500)
        toast.success(data.message)
      } else {
        toast.error(data.message)
      }
    },
    onError: (error) => {
      toast.error(error.message)
    }
  })

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  })

  const submitHandler = (data) => {
    const { username, email, password } = data
    mutate({ username, email, password })
  }

  const password = watch('password')

  return (
    <MainLayout>
      <section className="container mx-auto px-5 py-10">
        <div className="mx-auto w-full max-w-sm">
          <h1 className="mb-8 text-center font-roboto text-2xl font-bold text-dark-hard">
            Sign Up
          </h1>
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="username"
                className="block font-semibold text-[#5a7184]"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register('username', {
                  minLength: {
                    value: 1,
                    message: 'Username length must be at least 1 character'
                  },
                  required: {
                    value: true,
                    message: 'Username is required'
                  }
                })}
                placeholder="Enter username"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.username ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.username?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.username?.message}
                </p>
              )}
            </div>
            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="email"
                className="block font-semibold text-[#5a7184]"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email', {
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,:\s@']+(\.[^<>()[\]\\.,:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    message: 'Enter a valid email'
                  },
                  required: {
                    value: true,
                    message: 'Email is required'
                  }
                })}
                placeholder="Enter email"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.email ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.email?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.email?.message}
                </p>
              )}
            </div>
            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="password"
                className="block font-semibold text-[#5a7184]"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register('password', {
                  required: {
                    value: true,
                    message: 'Password is required'
                  },
                  minLength: {
                    value: 6,
                    message: 'Password length must be at least 6 characters'
                  }
                })}
                placeholder="Enter password"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.password ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.password?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.password?.message}
                </p>
              )}
            </div>
            <div className="mb-6 flex w-full flex-col">
              <label
                htmlFor="confirmPassword"
                className="block font-semibold text-[#5a7184]"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register('confirmPassword', {
                  required: {
                    value: true,
                    message: 'Confirm password is required'
                  },
                  validate: (value) => {
                    if (value !== password) {
                      return 'Passwords do not match'
                    }
                  }
                })}
                placeholder="Enter confirm password"
                className={`mt-3 block rounded-lg border px-5 py-4 font-semibold text-dark-hard outline-none placeholder:text-[#959ead] ${errors.confirmPassword ? 'border-red-500' : 'border-[#c3cad9]'}`}
              />
              {errors.confirmPassword?.message && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.confirmPassword?.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={!isValid || isLoading}
              className="mb-6 w-full rounded-lg bg-primary px-8 py-4 text-lg font-bold text-white disabled:cursor-not-allowed disabled:opacity-70"
            >
              Register
            </button>
            <p className="text-sm font-semibold text-[#5a7184]">
              You have an user?{' '}
              <Link to="/auth/login" className="text-primary">
                Login now
              </Link>
            </p>
          </form>
        </div>
      </section>
    </MainLayout>
  )
}

export default RegisterPage
