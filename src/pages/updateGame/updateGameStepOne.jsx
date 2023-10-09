import { Field, Form, Formik, useFormik, useFormikContext } from 'formik'
import { forwardRef, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { object, string, date } from 'yup'
import { Button, Input, Select, TextField } from '@mui/material'
import { MenuItem } from '@elonkit/react'
import { useNavigate } from 'react-router'
import { updateGame } from '../../services/game.service'
import { FormikValues } from '../../components/formikValues'

const genreOptions = [
  { id: 'action', title: 'Экшн', value: 'action' },
  { id: 'adventure', title: 'Приключения', value: 'adventure' },
  { id: 'rpg', title: 'Ролевые', value: 'rpg' },
  { id: 'strategy', title: 'Стратегии', value: 'strategy' },
  { id: 'simulation', title: 'Симуляторы', value: 'simulation' },
  { id: 'sports', title: 'Спорт', value: 'sports' },
  { id: 'puzzle', title: 'Головоломки', value: 'puzzle' },
  { id: 'horror', title: 'Хоррор', value: 'horror' },
  { id: 'sandbox', title: 'Песочница', value: 'sandbox' },
]

export const UpdateGameStepOne = forwardRef(({ data, setStepForm }, ref) => {
  const stepOneSchema = object().shape({
    title: string().required('Название обязательно').min(3, 'Минимум 3 символа'),
    releaseDate: date().required('Введите дату релиза').typeError('Неверная дата'),
    genre: string().required('Выберите жанр'),
  })
  return (
    <div className={'flex justify-center'}>
      <Formik
        enableReinitialize={false}
        validationSchema={stepOneSchema}
        innerRef={ref}
        validateOnMount={true}
        initialValues={{
          title: data?.title || '',
          releaseDate: data?.releaseDate || '',
          genre: data?.genre || '',
        }}
        onSubmit={values => {
          console.log(values)
        }}>
        {({ errors, touched, handleSubmit }) => (
          <Form className="items-center w-full flex flex-col gap-y-5" onSubmit={handleSubmit}>
            <Field name="title">
              {({ field, form: { errors } }) => {
                return (
                  <>
                    <TextField
                      className="w-full"
                      label={'Название игры'}
                      error={errors?.title && touched?.title}
                      helperText={errors?.title && touched?.title ? errors?.title : null}
                      placeholder={'Название игры'}
                      {...field}
                    />
                  </>
                )
              }}
            </Field>
            <Field className="" name="releaseDate">
              {({ field }) => {
                return (
                  <TextField
                    error={errors?.releaseDate && touched?.releaseDate}
                    helperText={
                      errors?.releaseDate && touched?.releaseDate
                        ? errors?.releaseDate
                        : 'Дата релиза'
                    }
                    label={!field?.value ? field?.value : 'Дата релиза'}
                    className="w-full"
                    type={'date'}
                    {...field}></TextField>
                )
              }}
            </Field>
            <Field className="w-full" name="genre">
              {({ field }) => {
                return (
                  <TextField
                    select
                    label={'Жанр'}
                    error={errors?.genre && touched?.genre}
                    helperText={errors?.genre && touched?.genre && errors?.genre}
                    className="w-full"
                    {...field}>
                    {genreOptions.map(genre => {
                      return (
                        <MenuItem value={genre.value} key={genre.id}>
                          {genre.title}
                        </MenuItem>
                      )
                    })}
                  </TextField>
                )
              }}
            </Field>
            <FormikValues setFormik={setStepForm} />
          </Form>
        )}
      </Formik>
    </div>
  )
})
