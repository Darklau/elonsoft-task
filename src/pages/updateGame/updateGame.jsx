import { Form, Formik } from 'formik'
import { UpdateGameStepOne } from './updateGameStepOne'
import { useEffect, useRef, useState } from 'react'
import { Box, Button, List, ListItem } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getGame, updateGame } from '../../services/game.service'
import { UpdateGameStepTwo } from './updateGameStepTwo'
import { UpdateGameStepThree } from './updateGameStepThree'
import {
  IconCheckCircleLc, IconCloseCircleLc,
  IconEmotionHappy, IconEmotionHappy2,
  IconErrorLc,
  IconErrorW300,
  IconInformation2W400,
  IconInformationLc,
  Sidebar,
  Sidenav,
  SidenavItem,
} from '@elonkit/react'

export const UpdateGame = () => {
  const { id } = useParams()
  const [currentStep, setCurrentStep] = useState('stepOne')
  const [values, setValues] = useState({})

  const [stepOneForm, setStepOneForm] = useState({})
  const [stepTwoForm, setStepTwoForm] = useState({})
  const [stepThreeForm, setStepThreeForm] = useState({})
  const { isLoading, error, data } = useQuery(['games'], () => getGame(id), {
    retry: true,
    refetchOnReconnect: true,
  })
  const navigate = useNavigate()
  const onDraft = async values => {
    await updateGame(id, values)
  }

  useEffect(() => {
    setValues(data?.game)
  }, [data])

  const addGameSteps = {
    stepOne: {
      title: 'Шаг 1',
      component: (
        <UpdateGameStepOne
          setStepForm={setStepOneForm}
          id={id}
          setTotalValues={setValues}
          setCurrentStep={setCurrentStep}
          data={data?.game}
        />
      ),
      prevStep: null,
      nextStep: 'stepTwo',
      status: '',
    },
    stepTwo: {
      title: 'Шаг 2',
      component: (
        <UpdateGameStepTwo
          setStepForm={setStepTwoForm}
          id={id}
          setTotalValues={setValues}
          data={data?.game}
          setCurrentStep={setCurrentStep}
        />
      ),
      prevStep: 'stepOne',
      nextStep: 'stepThree',
      status: '',
    },
    stepThree: {
      title: 'Шаг 3',
      component: (
        <UpdateGameStepThree
          setStepForm={setStepThreeForm}
          id={id}
          setTotalValues={setValues}
          data={data?.game}
          setCurrentStep={setCurrentStep}
        />
      ),
      prevStep: 'stepTwo',
      status: '',
    },
  }

  return (
    <section className="flex justify-between flex-col">
      <Box
        sx={{
          display: 'flex',
          gap: '20px',
          height: '100vh',
          right: '0',
          overflow: 'auto',
          position: 'relative',
          flexDirection: 'column',
        }}>
        <h1>{addGameSteps[currentStep].title}</h1>
        {isLoading ? (
          <p className="flex justify-center items-center"></p>
        ) : error ? (
          <p className="text-red-600">error</p>
        ) : (
          <div className="flex justify-center">
            <div className="mb-5">
              {Object.keys(addGameSteps).map(step => (
                <div className={currentStep === step ? 'visible' : 'hidden'}>
                  {addGameSteps[step].component}
                </div>
              ))}
            </div>
          </div>
        )}
        <div className="d-flex justify-between">
          {addGameSteps[currentStep].prevStep && (
            <Button
              onClick={() => {
                setCurrentStep(addGameSteps[currentStep].prevStep)
              }}>
              Назад
            </Button>
          )}
          <Button
            onClick={() => {
              updateGame(id, values).then(() => {
                navigate('/')
              })
              navigate('/')
            }}>
            Сохранить черновик
          </Button>
          {addGameSteps[currentStep].nextStep ? (
            <Button
              onClick={() => {
                updateGame(id, values).then(() => {
                  console.log(addGameSteps[currentStep].nextStep)
                  setCurrentStep(addGameSteps[currentStep].nextStep)
                })
              }}>
              Далее
            </Button>
          ) : null}
        </div>
        <List sx={{position: 'fixed', right: '0', top: '0', paddingRight: '20px',paddingTop: '100px'}}>
          <ListItem>
            <Button
              onClick={() => {
                setCurrentStep('stepOne')
              }}>
                {stepOneForm?.dirty
                  ? !stepOneForm.isValid
                    ? <IconCloseCircleLc color={'red'}/>
                    : stepOneForm.isValid
                      ? <IconCheckCircleLc  color={'green'}/>
                      : <IconInformationLc color={'gray'}/>
                  : <IconInformationLc color={'gray'}/>}
              <span
                className={
                  stepOneForm?.dirty
                    ? !stepOneForm.isValid
                      ? 'text-red-600'
                      : stepOneForm.isValid
                      ? 'text-green-600'
                      : ''
                    : 'text-gray-500'
                }>
                Шаг 1
              </span>
            </Button>
          </ListItem>
          <ListItem>
            <Button
              onClick={() => {
                setCurrentStep('stepTwo')
              }}>
              {stepTwoForm?.dirty
                ? !stepTwoForm.isValid
                  ? <IconCloseCircleLc color={'red'}/>
                  : stepTwoForm.isValid
                    ? <IconCheckCircleLc  color={'green'}/>
                    : <IconInformationLc color={'gray'}/>
                : <IconInformationLc color={'gray'}/>}
              <span
                className={
                  stepTwoForm?.dirty
                    ? !stepTwoForm.isValid
                      ? 'text-red-600'
                      : stepTwoForm.isValid
                        ? 'text-green-600'
                        : ''
                    : 'text-gray-500'
                }>
                Шаг 2
              </span>
            </Button>
          </ListItem>
          <ListItem>
            <Button
              onClick={() => {
                setCurrentStep('stepThree')
              }}>
              {stepThreeForm?.dirty
                ? !stepThreeForm.isValid
                  ? <IconCloseCircleLc color={'red'}/>
                  : stepThreeForm.isValid
                    ? <IconCheckCircleLc  color={'green'}/>
                    : <IconInformationLc color={'gray'}/>
                : <IconInformationLc color={'gray'}/>}
              <span
                className={
                  stepThreeForm?.dirty
                    ? !stepThreeForm.isValid
                      ? 'text-red-600'
                      : stepThreeForm.isValid
                        ? 'text-green-600'
                        : ''
                    : 'text-gray-500'
                }>
                Шаг 3
              </span>
            </Button>
          </ListItem>
        </List>
      </Box>
    </section>
  )
}
