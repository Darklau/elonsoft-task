import {useFormikContext} from "formik";
import {useEffect} from "react";

export const FormikValues = ({
                                 setFormik = (form) => {
                                 }
                             }) => {
    const form = useFormikContext()
    useEffect(() => {
        setTimeout(() => {setFormik(form)}, 0)
    }, [Object.values(form | {})]);

    return <></>
}