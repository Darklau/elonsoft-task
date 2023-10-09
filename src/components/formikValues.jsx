import {useFormikContext} from "formik";
import {useEffect} from "react";

/** Функциональный компонент, поднимающий значения полей формы, в которой он находится
 * принимает проп setFormik - функцию React.Dispatch<React.SetStateAction>
 */
export const FormikValues = ({
                                 setFormik = (form) => {
                                 }
                             }) => {
    const form = useFormikContext()
    useEffect(() => {
        setTimeout(() => {setFormik(form)}, 0)
    }, [form.values, form.errors, form.isValid, form.touched]);

    return <></>
}

