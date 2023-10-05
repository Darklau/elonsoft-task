import { Dropzone, IconTrash2, MenuItem } from '@elonkit/react'
import { forwardRef, useEffect, useState } from 'react'
import { Field, Form, Formik } from 'formik'
import classNames from 'classnames/bind'
import { Button, Input, Select, TextField } from '@mui/material'
import { string, object, array } from 'yup'
import { useNavigate } from 'react-router'
import { updateGame } from '../../services/game.service'
import { FormikValues } from '../../components/formikValues'

const stepTwoSchema = object().shape({
  description: string().required('Обязательное поле').min(7, 'Минимум 7 символов').max(500, 'Не более 500 символов'),
  files: array()
    .required('Изображения обязательны')
    .test('requiredArr', 'Изображения обязательны', (array) => {return array.length
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
        enableReinitialize={true}
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
            <label
              className={classNames(
                'w-full',
                errors?.platform && touched?.platform ? 'input__label-error' : ''
              )}>
                <span className={'block mb-3'}>
                    Платформа
                </span>
              <Field name="platform">
                {({ field }) => {
                  return <Input className="w-full" placeholder={'Название игры'} {...field}></Input>
                }}
              </Field>
              <span className="block mt-3">
                {errors?.platform && touched?.platform ? errors?.platform : null}
              </span>
            </label>
            <label className={classNames(
              'w-full',
              errors?.description && touched?.description ? 'input__label-error' : ''
            )}>
                <span className={'block mb-3'}>
                    Описание
                </span>
              <Field name="description">
                {({
                  field, // { name, value, onChange, onBlur }
                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                  meta,
                }) => {
                  return (
                    <TextField
                      multiline
                      className="w-full"
                      placeholder={'Название игры'}
                      {...field}></TextField>
                  )
                }}
              </Field>
                <span className="block mt-3">
                {errors?.description && touched?.description ? errors?.description : null}
              </span>
            </label>
            <label className={classNames(
              'w-full',
              errors?.files && touched?.files ? 'input__label-error' : ''
            )}>
                <span className={'block mb-3'}>Изображения</span>
              <Field className="w-full" name="files">
                {({
                  field
                }) => {
                  return (
                    <Dropzone
                      heading={'Добавьте изображения'}
                      accept="image/*"
                      multiple
                      onChange={(event, files) => {
                        setTouched({...touched, files: true})
                        setFieldValue('files', [
                          ...field.value,
                          ...files.map(file => getDataUrl(file)),
                        ])
                      }}
                      style={{ width: '300px' }}
                    />
                  )
                }}

              </Field>
                <span className="block mt-3">
                {errors?.files && touched?.files ? errors?.files : null}
              </span>
            </label>
            <ul className="flex justify-stretch flex-wrap">
              {values?.files.length ?
                values?.files?.map(file => {
                  return (
                    <li className="relative w-[33.3%] p-[10px]">
                      <img className="border-blue-500 border-[1px] " src={file} />
                      <button
                        onClick={() => {
                          setFieldValue(
                            'files',
                            values.files.filter(val => val !== file)
                          )
                        }}
                        className="absolute rounded-[25%] right-[15px] top-[15px] bg-black">
                        <IconTrash2 color={'white'} sx={{ clipRule: 'revert'}}/>
                      </button>
                    </li>
                  )
                }): null}
            </ul>
            <FormikValues setFormik={setStepForm} />
          </Form>
        )}
      </Formik>
    </div>
  )
})
