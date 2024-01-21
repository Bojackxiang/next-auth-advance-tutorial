import React from 'react'
import CardWrapper from './card-wrapper'

const LoginForm = () => {
  return (
    <CardWrapper headLabel='Welcome back' backButtonLabel='Dont have an account?' backButtonHref='/auth/register' showSocial>
      log in form 
    </CardWrapper>
  )
}

export default LoginForm
