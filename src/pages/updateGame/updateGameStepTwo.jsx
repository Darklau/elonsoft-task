import { Dropzone, IconTrash2, MenuItem } from '@elonkit/react'
import { forwardRef, useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import classNames from 'classnames/bind'
import { Button, Input, Select, TextField } from '@mui/material'
import { string, object, array } from 'yup'
import { useNavigate } from 'react-router'
import { updateGame } from '../../services/game.service'
import { FormikValues } from '../../components/formikValues'
import { Link } from 'react-router-dom'

const stepTwoSchema = object().shape({
  description: string()
    .required('Обязательное поле')
    .min(7, 'Минимум 7 символов')
    .max(500, 'Не более 500 символов'),
  files: array()
    .required('Изображения обязательны')
    .test('requiredArr', 'Изображения обязательны', array => {
      return array.length
    }),
  platform: string().required('Выберите платформу'),
})

const getDataUrl = file => {
  return URL.createObjectURL(file)
}

export const UpdateGameStepTwo = forwardRef(({ data, setStepForm }, ref) => {
  return (
    <div className="flex justify-center">
      <Formik
        enableReinitialize={false}
        validationSchema={stepTwoSchema}
        innerRef={ref}
        validateOnMount={true}
        initialValues={{
          files: data?.files || '',
          description: data?.description || '',
          platform: data?.platform || '',
        }}
        onSubmit={values => {
          console.log(values)
        }}>
        {({ errors, touched, handleSubmit, setTouched, setFieldValue, values }) => (
          <Form className="items-center w-full flex flex-col gap-y-5" onSubmit={handleSubmit}>
            <Field name="platform">
              {({ field }) => {
                return (
                  <TextField
                    label={'Платформа'}
                    error={errors?.platform && touched?.platform}
                    helperText={errors?.platform && touched?.platform ? errors?.platform : null}
                    className="w-full"
                    placeholder={'Платформа'}
                    {...field}></TextField>
                )
              }}
            </Field>
            <Field name="description">
              {({
                field, // { name, value, onChange, onBlur }
                form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                meta,
              }) => {
                return (
                  <TextField
                    label={'Описание'}
                    multiline
                    error={errors?.description && touched?.description}
                    helperText={
                      errors?.description && touched?.description ? errors?.description : null
                    }
                    className="w-full"
                    placeholder={'Описание'}
                    {...field}></TextField>
                )
              }}
            </Field>
            <Field className="" name="files">
              {({ field }) => {
                return (
                  <Dropzone
                    className={'w-full'}
                    helperText={errors?.files && touched?.files ? errors?.files : null}
                    heading={'Добавьте изображения'}
                    accept="image/*"
                    multiple
                    error={errors?.files && touched?.files}
                    onChange={(event, files) => {console.log(touched)
                      setTouched({ ...touched, files: true }).then(() => {
                        setFieldValue('files', [
                          ...field.value,
                          ...files.map(file => getDataUrl(file)),
                        ])
                      })
                    }}
                  />
                )
              }}
            </Field>
            <ul className="flex w-full justify-stretch flex-wrap">
              {values?.files.length
                ? values?.files?.map(file => {
                    return (
                      <li key={file} className="relative p-[10px]">
                        <button
                          onClick={() => {
                            setTouched({ ...touched, files: true })
                            setFieldValue(
                              'files',
                              values.files.filter(val => val !== file)
                            )
                          }}
                          className="absolute rounded-[25%] right-[15px] top-[15px] bg-black">
                          <IconTrash2 color={'white'} sx={{ clipRule: 'revert' }} />
                        </button>
                        <Link target={'_blank'} to={file}>
                          <img
                            alt={file}
                            className="w-[110px]  border-blue-500 border-[1px] "
                            src={file}
                          />

                        </Link>
                      </li>
                    )
                  })
                : null}
            </ul>
            <FormikValues setFormik={setStepForm} />
          </Form>
        )}
      </Formik>
    </div>
  )
})
