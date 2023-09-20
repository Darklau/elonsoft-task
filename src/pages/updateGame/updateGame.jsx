import {Form, Formik} from "formik";
import {UpdateGameStepOne} from "./updateGameStepOne";
import {useState} from "react";
import {Button} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {useQuery} from "react-query";
import {getGame, updateGame} from "../../services/game.service";
import {UpdateGameStepTwo} from "./updateGameStepTwo";




export const UpdateGame = () => {
    const {id} = useParams()
    const [currentStep, setCurrentStep] = useState('stepOne')
    const { isLoading, error, data } = useQuery(
        ['games'],
        () => getGame(id)
    );
    const navigate = useNavigate()
    const onUpdate = () => {
        updateGame(id, data).then(({status}) => {
            if(status === 'ok'){
                navigate('/')
            }
        })
    }
    const addGameSteps = {
        stepOne: {
            title: 'Шаг 1',
            component: <UpdateGameStepOne data={data?.game}/> ,
            prevStep: null,
            nextStep: 'stepTwo'

        },
        stepTwo: {
            title: 'Шаг 2',
            component: <UpdateGameStepTwo data={data?.game}/>,
            prevStep: 'stepOne',
            nextStep: 'stepThree'
        },
        stepThree: {
            title: 'Шаг 3',
            component: <UpdateGameStepOne data={data?.game}/>,
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
                <div className="d-flex justify-between">
                    {addGameSteps[currentStep].prevStep && (
                        <Button onClick={() => setCurrentStep(addGameSteps[currentStep].prevStep)}>Назад</Button>
                    )}
                    <Button onClick={() => onUpdate()}>Сохранить черновик</Button>
                    {addGameSteps[currentStep].nextStep && (
                        <Button onClick={() => setCurrentStep(addGameSteps[currentStep].nextStep)}>Дальше</Button>
                    )}
                </div>
            </>
        )}




    </section>)
}