import {Field, Form, Formik} from "formik";
import classNames from "classnames/bind";
import {Button, Input, Select, Slider, TextField} from "@mui/material";
import {Dropzone, MenuItem} from "@elonkit/react";
import {number, string, object} from "yup";
import {useNavigate} from "react-router";
import {updateGame} from "../../services/game.service";
import {forwardRef} from "react";
import {FormikValues} from "../../components/formikValues";

const stepThreeSchema = object().shape({
    price: number().required().min(100, 'Цена должна быть не меньше 100 рублей'),
    requirements: string().required().max(5000, 'Слишком много символов'),
    language: string().required()
})

const languageOptions = [
    {value: 'ru', title: 'RU'},
    {value: 'en', title: 'EN'}
]
export const UpdateGameStepThree = forwardRef(({data, setStepForm}, ref) => {

    const navigate = useNavigate()

    return (<div className='flex justify-center'>
        <Formik

            enableReinitialize={true}
            validationSchema={stepThreeSchema}
            innerRef={ref}
            initialValues={
                {price: data?.price || 0,
                    requirements: data?.requirements || '',
                    language: data?.language || ''}
            } onSubmit={values => {
            console.log(values)
        }}>
            {({errors,
                  touched,
                  handleSubmit,
                isValid,
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
                        <span>Язык</span>
                        <Field name='language'>
                            {({field, // { name, value, onChange, onBlur }
                                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  meta,}) => {
                                return <Select className='w-full' {...field}>
                                    {languageOptions.map((language)=> {
                                        return <MenuItem value={language.value} key={language.id}>{language.title}</MenuItem>
                                    })}
                                </Select>
                            }}
                        </Field>
                        <span className='block mt-3'>
                            {errors?.title && touched?.title  ? errors?.title : null}
                        </span>

                    </label>
                    <label className='w-full'>
                        <span>Цена</span>
                        <Field name='price'>
                            {({field, form: {touched, errors, meta}}) => {
                                return <Slider min={0} max={1000} value={field.value} {...field}></Slider>
                            }}
                        </Field>
                        <span>{values?.price ? values?.price : 0}</span>

                    </label>
                    <label className='w-full'>
                        <Field name='requirements'>
                            {({field, // { name, value, onChange, onBlur }
                                  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
                                  meta,}) => {
                                return <TextField className='w-full' rows={5} multiline placeholder={'Системные требования'} {...field}></TextField>
                            }}
                        </Field>
                    </label>
                    <FormikValues setFormik={setStepForm}/>
                </Form>
            )}
        </Formik></div>)
})