import {useFormikContext} from "formik";
import {useEffect} from "react";

export const FormikValues = ({
                                 setFormik = (form) => {
                                 }
                             }) => {
    const form = useFormikContext()
    useEffect(() => {
        setFormik(form)
    }, [Object.keys(form | {})]);

    return <></>
}