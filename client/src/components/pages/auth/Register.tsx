import { Links } from '@/components/view/Link'
import React from 'react'
import  Forms  from './Form'

export default function Register() {
  return (
    <div>
      <h1>Create a new account</h1>
      <Forms type='register' />
      <Links href='/login'>already have an account?</Links>
    </div>
  )
}
