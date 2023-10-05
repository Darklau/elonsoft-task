import { Field, Form, Formik } from 'formik'
import classNames from 'classnames/bind'
import { Button, Input, Select, Slider, TextField } from '@mui/material'
import { Dropzone, MenuItem } from '@elonkit/react'
import { number, string, object } from 'yup'
import { useNavigate } from 'react-router'
import { updateGame } from '../../services/game.service'
import { forwardRef } from 'react'
import { FormikValues } from '../../components/formikValues'

const stepThreeSchema = object().shape({
  price: number().required().min(100, 'Цена должна быть не меньше 100 рублей'),
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
        enableReinitialize={true}
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
            <label
              className={classNames(
                ' w-full',
                errors?.title && touched?.title ? 'input__label-error' : ''
              )}>
              <span>Язык</span>
              <Field name="language">
                {({ field }) => {
                  return (
                    <Select className="w-full" {...field}>
                      {languageOptions.map(language => {
                        return (
                          <MenuItem value={language.value} key={language.id}>
                            {language.title}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  )
                }}
              </Field>
              <span className="block mt-3">
                {errors?.language && touched?.language ? errors?.language : null}
              </span>
            </label>
            <label
              className={classNames(
                ' w-full',
                errors?.price && touched?.price ? 'input__label-error' : ''
              )}>
              <span>Цена</span>
              <Field name="price">
                {({ field }) => {
                  return <Slider min={0} max={1000} value={field.value} {...field}></Slider>
                }}
              </Field>
              <span>{values?.price ? values?.price : 0}</span>
              <span className="block mt-3">
                {errors?.price && touched?.price ? errors?.price : null}
              </span>
            </label>

            <label className="w-full">
              <Field name="requirements">
                {({ field }) => {
                  return (
                    <TextField
                      className="w-full"
                      rows={5}
                      multiline
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
