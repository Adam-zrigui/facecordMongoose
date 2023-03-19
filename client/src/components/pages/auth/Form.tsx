import { Button } from '@/components/view/Button'
import { Text } from '@/components/view/input/Text'
import { Links } from '@/components/view/Link'
import { Formik , Form } from 'formik'
import React from 'react'
import { AuthCredentials } from '@/components/interfaces'
import valid from './util/valid'
import useAuthMutate from '@/components/hooks/mutations/useAuthMut'
const initialState : AuthCredentials = {
username: '',
password: ''
}
interface AUTHPROPS {
    type: 'login' | "register",
}
const typeMap = {
    login:"login",
    register:"register"
}
const Forms : React.FC<AUTHPROPS>= ({type}) => {
    const {error, isLoading, mutate} = useAuthMutate();

    return (
    <div>
        <Formik
       initialValues={initialState}
       validationSchema={valid}
       onSubmit={(values) => mutate({values , type})}
       >
   <Form>
    <Text name='username' type="text" label='Username' />
    <Text name='password' type="password" label='Password' />
    <Button>{isLoading ? "Loading..." : typeMap[type]}</Button>
<span>{error ? error : null}</span>
   </Form>

        </Formik>
    </div>
  )
}
export default Forms