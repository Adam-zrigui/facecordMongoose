import { Links } from '@/components/view/Link'
import React from 'react'
import Forms from './Form'

export default function Login() {
  return (
<div>
      <h1>sign in</h1>
      <Forms type='login' />
      <Links href='/register'>dont't have an account?</Links>
    </div>
  )
}
