import {Field, Form, Formik, useFormik, useFormikContext} from "formik";
import {forwardRef, useEffect, useRef, useState} from "react";
import classNames from "classnames/bind";
import {object, string, date} from 'yup'
import {Button, Input, Select} from "@mui/material";
import {MenuItem} from "@elonkit/react";
import {useNavigate} from "react-router";
import {updateGame} from "../../services/game.service";
import {FormikValues} from "../../components/formikValues";

const genreOptions = [
    { id: 'action', title: 'Экшн', value: 'action' },
    { id: 'adventure', title: 'Приключения', value: 'adventure' },
    { id: 'rpg', title: 'Ролевые', value: 'rpg' },
    { id: 'strategy', title: 'Стратегии', value: 'strategy' },
    { id: 'simulation', title: 'Симуляторы', value: 'simulation' },
    { id: 'sports', title: 'Спорт', value: 'sports' },
    { id: 'puzzle', title: 'Головоломки', value: 'puzzle' },
    { id: 'horror', title: 'Хоррор', value: 'horror' },
    // Добавьте другие жанры по необходимости
];

export const UpdateGameStepOne = forwardRef(({ data, setStepForm}, ref) => {
    const [form, setForm] = useState(null)


    const stepOneSchema = object().shape({
        title: string().required('Название обязательно'),
        releaseDate: date().required('Введите дату').typeError('Неверная дата'),
        genre: string().required('Введите жанр')
    })




    return (
        <div className={'flex justify-center'}>
            <Formik
                enableReinitialize={true}
                validationSchema={stepOneSchema}
                innerRef={ref}
                initialValues={
                    {title: data?.title || '',
                    releaseDate: data?.releaseDate || '',
                    genre: data?.genre || ''}
            } onSubmit={values => {
                console.log(values)
            }}>
            {({errors,
                  touched,
                  handleSubmit,}) =>  (
                <Form className='items-center max-w-[500px] min-w-[400px] flex flex-col gap-y-5' onSubmit={handleSubmit}>
                    <label className={classNames('text-red-600 w-full', errors?.title && touched?.title ? 'input__label-error' : '')
                    }>
                        <Field name='title'>
                            {({field}) => {
                                return <Input className='w-full'   placeholder={'Название игры'} {...field}></Input>
                            }}
                        </Field>
                        <span className='block mt-3'>
                            {errors?.title && touched?.title  ? errors?.title : null}
                        </span>

                    </label>
                    <label className='w-full'>
                        <Field className='' name='releaseDate'>
                            {({field}) => {
                                return <Input className='w-full' type='date' placeholder={'Название игры'} {...field}></Input>
                            }}
                        </Field>

                    </label>
                    <label className='w-full'>
                        <Field className='w-full' name='genre'>
                            {({field}) => {
                                return <Select className='w-full' {...field}>
                                    {genreOptions.map((genre)=> {
                                        return <MenuItem value={genre.value} key={genre.id}>{genre.title}</MenuItem>
                                    })}
                                </Select>
                            }}

                        </Field>
                    </label>
                    <FormikValues setFormik={setStepForm}/>
                </Form>
            )}
            </Formik>

        </div>
    )
})