import {Form, Formik} from "formik";
import {UpdateGameStepOne} from "./updateGameStepOne";
import {useEffect, useState} from "react";
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {useQuery} from "react-query";
import {getGame, updateGame} from "../../services/game.service";
import {UpdateGameStepTwo} from "./updateGameStepTwo";
import {UpdateGameStepThree} from "./updateGameStepThree";




export const UpdateGame = () => {
    const {id} = useParams()
    const [currentStep, setCurrentStep] = useState('stepOne')
    const [values, setValues] = useState({})
    const { isLoading, error, data } = useQuery(
        ['games'],
        () => getGame(id),
        {retry: true, refetchOnReconnect: true}
    );
    const navigate = useNavigate()
    const onUpdate = (data) => {
        return console.log(data)
        updateGame(id, data).then(({status}) => {
            if(status === 'ok'){
                navigate('/')
            }
        })
    }

    useEffect(() => {
        setValues(data?.game)
    }, [data]);


    const addGameSteps = {
        stepOne: {
            title: 'Шаг 1',
            component: <UpdateGameStepOne id={id} setTotalValues={setValues} setCurrentStep={setCurrentStep} data={data?.game}/> ,
            prevStep: null,
            nextStep: 'stepTwo'

        },
        stepTwo: {
            title: 'Шаг 2',
            component: <UpdateGameStepTwo id={id} setTotalValues={setValues} data={data?.game} setCurrentStep={setCurrentStep}/>,
            prevStep: 'stepOne',
            nextStep: 'stepThree'
        },
        stepThree: {
            title: 'Шаг 3',
            component: <UpdateGameStepThree id={id} setTotalValues={setValues} data={data?.game} setCurrentStep={setCurrentStep}/>,
            prevStep: 'stepTwo',
        }}


    return (<section className='flex justify-between flex-col'>
        <h1>{addGameSteps[currentStep].title}</h1>
        {isLoading ? (
            <p className="flex justify-center items-center"></p>
        ) : error ? (
            <p className="text-red-600">error</p>
        ) : (
            <>
                <div className="mb-5">
                    {addGameSteps[currentStep].component}
                </div>

            </>
        )}




    </section>)
}