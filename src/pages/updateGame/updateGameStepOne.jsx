import { Field, Form, Formik, useFormik, useFormikContext } from 'formik'
import { forwardRef, useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import { object, string, date } from 'yup'
import { Button, Input, Select } from '@mui/material'
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
  {id: 'sandbox', title: 'Песочница', value: 'sandbox'}
]

export const UpdateGameStepOne = forwardRef(({ data, setStepForm }, ref) => {
  const stepOneSchema = object().shape({
    title: string().required('Название обязательно').min(3, 'Минимум 3 символа'),
    releaseDate: date().required('Введите дату').typeError('Неверная дата'),
    genre: string().required('Введите жанр'),
  })
  return (
    <div className={'flex justify-center'}>
      <Formik
        enableReinitialize={true}
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
            <label
              className={classNames(
                ' w-full',
                errors?.title && touched?.title ? 'input__label-error' : ''
              )}>
              <span className="block mb-3">
                        Название игры
                      </span>
              <Field name="title">

                {({ field, form: {errors} }) => {
                  return (
                    <>
                      <Input className="w-full" placeholder={'Название игры'} {...field} />
                      <span className="block mt-3">
                        {errors?.title && touched?.title  ? errors?.title : null}
                      </span>
                    </>
                  )
                }}
              </Field>
            </label>
            <label className="w-full">
              <Field className="" name="releaseDate">
                {({ field }) => {
                  return (
                    <Input
                      className="w-full"
                      type="date"
                      {...field}></Input>
                  )
                }}
              </Field>
            </label>
            <label className={classNames(
              ' w-full',
              errors?.genre && touched?.genre ? 'input__label-error' : ''
            )}>
              <span className='block mb-3'>
                Жанр
              </span>
              <Field className="w-full" name="genre">
                {({ field }) => {
                  return (
                    <Select displayEmpty className="w-full" {...field}>
                      <MenuItem value={''}>
                        Выберите жанр
                      </MenuItem>
                      {genreOptions.map(genre => {
                        return (
                          <MenuItem value={genre.value} key={genre.id}>
                            {genre.title}
                          </MenuItem>
                        )
                      })}
                    </Select>
                  )
                }}
              </Field>
              <span>
                {errors?.genre && touched?.genre && errors?.genre}
              </span>
            </label>
            <FormikValues setFormik={setStepForm} />
          </Form>
        )}
      </Formik>
    </div>
  )
})
