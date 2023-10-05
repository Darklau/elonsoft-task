import { UpdateGameStepOne } from './updateGameStepOne'
import { useCallback, useMemo, useState } from 'react'
import { Box, Button, List, ListItem, Tooltip, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getGame, updateGame } from '../../services/game.service'
import { UpdateGameStepTwo } from './updateGameStepTwo'
import { UpdateGameStepThree } from './updateGameStepThree'
import { IconCheckCircleLc, IconCloseCircleLc, IconInformationLc } from '@elonkit/react'

export const UpdateGame = () => {
  const { id } = useParams()
  const [currentStep, setCurrentStep] = useState('stepOne')
  const [stepForms, setStepForms] = useState(null)
  const { isLoading, error, data } = useQuery(['games'], () => getGame(id), {})
  const navigate = useNavigate()

  const getCurrentData = () => {
    let game = {}
    for(let step in stepForms){
      game = {...game, ...stepForms[step].values}
    }
    return game

  }
  const checkStep = () => {
    for (let key in stepForms[currentStep].values) {
      if (stepForms[currentStep].values[key] && stepForms[currentStep].errors[key]) {
        alert(`${key} - ${stepForms[currentStep].errors[key]}`)
        return false
      }
    }
    return true
  }

  const onSaveDraft = () => {
    for (let key in stepForms) {
      console.log(stepForms[key].values)

      for (let valueKey in stepForms[key].values) {
        if (stepForms[key].values[valueKey]) {
          if (stepForms[key].errors[valueKey]) {
            return alert(`${valueKey} - ${stepForms[key].errors[valueKey]}`)
          }
        }
      }
    }

    updateGame(id, {...getCurrentData(), status: 'draft'}).then(() => {
      navigate('/')
    })
  }

  const onComplete = () => {
    let errors = ''
    for (let key in stepForms) {
      console.log(stepForms[key].isValid)
      if (!stepForms[key].isValid) {
        console.log('not Valid', key)
        for (let errorKey in stepForms[key].errors) {
          console.log(errorKey, stepForms[key].errors[errorKey])
          errors = errors + `\n${errorKey}: ${stepForms[key].errors[errorKey]}`
        }
      }
    }
    if (errors) {
      alert(errors)
    } else {

      updateGame(id, { ...getCurrentData(), status: 'published' })
        .then(() => {
          navigate('/')
        })
        .catch(err => {
          console.log(err)
          alert(`Ошибка`)
        })
    }
  }

  const stepNavigate = step => {
    if (checkStep()) {
      updateGame(id, { ...stepForms[currentStep].values, status: 'draft' }).then(() => {
        setCurrentStep(step)
      })
    }
  }



  const stepProps = useCallback((step) => ({
    setStepForm: (form) => {
      setStepForms(prev => {
        return { ...prev, [step]: form }
      })
    },
    id,
    setCurrentStep,
    data: data?.game
  }), [data])

  const addGameSteps = {
    stepOne: {
      title: 'Шаг 1',
      component: <UpdateGameStepOne {...stepProps('stepOne')} />,
      prevStep: null,
      nextStep: 'stepTwo',
      status: '',
    },
    stepTwo: {
      title: 'Шаг 2',
      component: <UpdateGameStepTwo {...stepProps('stepTwo')} />,
      prevStep: 'stepOne',
      nextStep: 'stepThree',
      status: '',
    },
    stepThree: {
      title: 'Шаг 3',
      component: <UpdateGameStepThree {...stepProps('stepThree')} />,
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
        <Typography variant={'h1'}>{addGameSteps[currentStep].title}</Typography>
        {isLoading ? (
          <p className="flex justify-center items-center"></p>
        ) : error ? (
          <p className="text-red-600">error</p>
        ) : (
          <div className="flex justify-center">
            <div className="mb-5 max-w-[500px] min-w-[400px]">
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
          <Button onClick={onSaveDraft}>Сохранить черновик</Button>
          {addGameSteps[currentStep].nextStep ? (
            <Button
              onClick={() => {
                stepNavigate(addGameSteps[currentStep].nextStep)
              }}>
              Далее
            </Button>
          ) : (
            <Button onClick={onComplete}>Сохранить</Button>
          )}
        </div>
        <List
          sx={{
            position: 'fixed',
            right: '20px',
            top: '150px',
          }}>
          {stepForms &&
            Object.keys(stepForms).map((step, index) => (
              <ListItem>
                <Tooltip title={
                  Object.values(stepForms[step].errors).length
                    ? Object.entries(stepForms[step].errors).map(error => (
                      <ListItem>{error[0] + ': ' + error[1] + '\n'}</ListItem>
                    )) : null
                }>
                <Button
                  onClick={() => {
                    stepNavigate(step)
                  }}>
                  {Object.values(stepForms[step]).length && stepForms[step]?.isValid ? (
                    <IconCheckCircleLc color={'green'} />
                  ) : Object.keys(stepForms[step]?.touched).length ? (
                    !stepForms[step]?.isValid ? (
                      <IconCloseCircleLc color={'red'} />
                    ) : (
                      <IconInformationLc color={'gray'} />
                    )
                  ) : (
                    <IconInformationLc color={'gray'} />
                  )}
                  <span
                    className={
                      stepForms[step] &&
                      Object.values(stepForms[step]).length &&
                      stepForms[step]?.isValid
                        ? 'text-green-600'
                        : Object.keys(stepForms[step]?.errors).length &&
                          Object.keys(stepForms[step]?.touched).length
                        ? !stepForms[step]?.isValid
                          ? 'text-red-600'
                          : ''
                        : 'text-gray-500'
                    }>
                    Шаг {index + 1}
                  </span>
                </Button>
                </Tooltip>
              </ListItem>
            ))}
        </List>
      </Box>
    </section>
  )
}
