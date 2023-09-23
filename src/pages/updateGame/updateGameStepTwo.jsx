import {Dropzone, MenuItem} from '@elonkit/react'
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import classNames from "classnames/bind";
import {Button, Input, Select, TextField} from "@mui/material";
import {string, object, array} from "yup";
import {useNavigate} from "react-router";
import {updateGame} from "../../services/game.service";


const stepTwoSchema = object().shape({
    description: string().required('Обязательное поле').max(500),
    files: array(),
    platform: string().required()
})

const getDataUrl = (file) => {
    return URL.createObjectURL(file)
}

export const UpdateGameStepTwo = ({setCurrentStep, id, data, setTotalValues}) => {
    const navigate = useNavigate()


    return (<div className='flex justify-center'>
        <Formik
            enableReinitialize={true}
            validationSchema={stepTwoSchema}
            initialValues={
                {files: data?.files || '',
                    description: data?.description || '',
                    platform: data?.platform || ''}
            } onSubmit={values => {
            console.log(values)
        }}>
            {({errors,
                  touched,
                  handleSubmit,
                  handleChange,
                  handleBlur,
                  setFieldValue,
                  values}) =>  (
                <Form className='items-center max-w-[500px] min-w-[400px] flex flex-col gap-y-5' onSubmit={handleSubmit}>
                    <label className={classNames('text-red-600 w-full', errors?.title && touched?.title ? 'input__label-error' : '')
                    }>
                        {/*<input*/}
                        {/*    name='title'*/}
                        {/*    onChange={handleChange}*/}
                        {/*    onBlur={handleBlur}*/}
                        {/*    value={values?.title}></input>*/}
                        <Field name='platform'>
                            {({field, // { name, value, onChange, onBlur }
                                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  meta,}) => {
                                return <Input className='w-full'   placeholder={'Название игры'} {...field}></Input>
                            }}
                        </Field>
                        <span className='block mt-3'>
                            {errors?.title && touched?.title  ? errors?.title : null}
                        </span>

                    </label>
                    <label className='w-full'>
                        <Field className='' name='description'>
                            {({field, // { name, value, onChange, onBlur }
                                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  meta,}) => {
                                return <TextField multiline className='w-full' type='date' placeholder={'Название игры'} {...field}></TextField>
                            }}
                        </Field>

                    </label>
                    <label className='w-full mb-5'>
                        <Field className='w-full' name='files'>
                            {({field, // { name, value, onChange, onBlur }
                                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  meta,}) => {
                                return <Dropzone  accept="image/*" multiple   onChange={(event,files) => {
                                    console.log(event,files)
                                setFieldValue('files', [...field.value, ...files.map(file => getDataUrl(file))])}
                                } style={{width: '300px'}}/>
                            }}


                        </Field>

                    </label>
                    <ul className='flex justify-stretch flex-wrap'>
                        {values?.files.length && values?.files?.map(file => {
                            return <li className='relative w-[33.3%] p-[10px]'><img className='border-blue-500 border-[1px]' src={file}/><button onClick={() => {setFieldValue('files', values.files.filter(val => val !== file))}} className='absolute right-[20px] top-[10px]'>remove</button></li>
                        })}
                    </ul>
                    <div className="d-flex justify-between">
                        <Button onClick={() => {
                            updateGame(id, values).then(() => {
                                setCurrentStep('stepOne')
                            })
                        }}>Назад</Button>
                        <Button onClick={() => {
                            data = {...data, ...values}
                            navigate('/')
                        }}>Сохранить черновик</Button>
                        <Button onClick={() => {
                            updateGame(id, values).then(() => {
                                setCurrentStep('stepThree')
                            })
                        }}>Дальше</Button>
                    </div>

                </Form>
            )}
        </Formik></div>)
}
