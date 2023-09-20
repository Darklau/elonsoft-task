import {Dropzone, MenuItem} from '@elonkit/react'
import {useState} from "react";
import {Field, Form, Formik} from "formik";
import classNames from "classnames/bind";
import {Input, Select, TextField} from "@mui/material";
import {string, object, array} from "yup";


const stepTwoSchema = object().shape({
    description: string().required('Обязательное поле').max(500),
    files: array(),
    platform: string().required()
})

export const UpdateGameStepTwo = ({data}) => {


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
                    <label className='w-full'>
                        <Field className='w-full' name='genre'>
                            {({field, // { name, value, onChange, onBlur }
                                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  meta,}) => {
                                return <Dropzone onChange={({files}) => {
                                field.onChange(files)}
                                } style={{width: '300px'}}/>
                            }}

                        </Field>
                    </label>
                    {values.files}
                    {values.description}


                </Form>
            )}
        </Formik></div>)
}
