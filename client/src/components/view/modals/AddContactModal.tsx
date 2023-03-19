import { Button } from '../Button'
import { Text } from '../input/Text'
import {Formik, Form} from 'formik'
import * as Yup from 'yup'
import useAddContact from '@/components/hooks/mutations/useAddContact'
const initialValues = {
  username: '',
}

const ContactSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, 'Username is too short')
    .max(20, 'Username is too long')
    .required('This field is required'),
})

const AddContactModal: React.FC = () => {
  const {mutate, error, isLoading} = useAddContact()

  return (
    <div>
      <h3>Add new contact</h3>

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => mutate(values.username)}
        validationSchema={ContactSchema}
      >
        <Form>
          <Text name='username' type='text' label='Username' />
          <Button>{isLoading ? 'Loading...' : 'Add'}</Button>
          <div>{error ?? null}</div>
        </Form>
      </Formik>
    </div>
  )
}

export default AddContactModal