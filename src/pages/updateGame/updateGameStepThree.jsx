import { Field, Form, Formik } from 'formik'
import { TextField } from '@mui/material'
import { MenuItem } from '@elonkit/react'
import { number, string, object } from 'yup'
import { forwardRef } from 'react'
import { FormikValues } from '../../components/formikValues'

const stepThreeSchema = object().shape({
  price: number().required('Укажите цену').min(100, 'Цена должна быть не меньше 100 рублей'),
  requirements: string()
    .required('Введите системные требования')
    .max(5000, 'Слишком много символов'),
  language: string().required('Обязательное поле'),
})

const languageOptions = [
  { value: 'ru', title: 'RU' },
  { value: 'en', title: 'EN' },
  { value: 'multi', title: 'Multi' },
]
export const UpdateGameStepThree = forwardRef(({ data, setStepForm }, ref) => {
  return (
    <div className="flex justify-center">
      <Formik
        enableReinitialize={false}
        validationSchema={stepThreeSchema}
        innerRef={ref}
        validateOnMount={true}
        initialValues={{
          price: data?.price || 0,
          requirements: data?.requirements || '',
          language: data?.language || '',
        }}
        onSubmit={values => {
          console.log(values)
        }}>
        {({ errors, touched, handleSubmit, values }) => (
          <Form className="items-center w-full flex flex-col gap-y-5" onSubmit={handleSubmit}>
            <Field name="language">
              {({ field }) => {
                return (
                  <TextField
                    select
                    label={'Язык'}
                    error={errors?.language && touched?.language}
                    helperText={errors?.language && touched?.language ? errors?.language : null}
                    className="w-full"
                    {...field}>
                    {languageOptions.map(language => {
                      return (
                        <MenuItem value={language.value} key={language.title}>
                          {language.title}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                )
              }}
            </Field>
            <Field name="price">
              {({ field }) => {
                return (
                  <>
                    <TextField
                      className={'w-full'}
                      label={'Цена'}
                      error={errors?.price && touched?.price}
                      helperText={errors?.price && touched?.price ? errors?.price : null}
                      placeholder={'Цена'}
                      type={'number'}
                      {...field}></TextField>
                  </>
                )
              }}
            </Field>

            <label className="w-full">
              <Field name="requirements">
                {({ field }) => {
                  return (
                    <TextField
                      className="w-full"
                      label={'Системные требования'}
                      rows={5}
                      multiline
                      error={errors?.requirements && touched?.requirements}
                      helperText={
                        errors?.requirements && touched?.requirements ? errors?.requirements : null
                      }
                      placeholder={'Системные требования'}
                      {...field}></TextField>
                  )
                }}
              </Field>
            </label>
            <FormikValues setFormik={setStepForm} />
          </Form>
        )}
      </Formik>
    </div>
  )
})
