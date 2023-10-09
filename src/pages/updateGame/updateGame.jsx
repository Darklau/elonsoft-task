import { UpdateGameStepOne } from './updateGameStepOne'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button, Card, List, ListItem, Tooltip, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router'
import { useQuery } from 'react-query'
import { getGame, updateGame } from '../../services/game.service'
import { UpdateGameStepTwo } from './updateGameStepTwo'
import { UpdateGameStepThree } from './updateGameStepThree'
import { IconCheckCircleLc, IconCloseCircleLc, IconInformationLc } from '@elonkit/react'
import { isValueNotEmpty } from '../../utils/functional'
import { translateStatus } from '../../utils/misc'

export const UpdateGame = () => {
  const { id } = useParams()
  const [currentStep, setCurrentStep] = useState('stepOne')
  const [stepForms, setStepForms] = useState(null)
  const { isLoading, error, data, refetch } = useQuery(['games', id], () => getGame(id), {
    retry: false,
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (data && !data.game) {
      refetch()
    }
  }, [data, refetch])
  useEffect(() => {
    if (data && !data?.game?.status) {
      navigate('/404')
    }
  }, [data])
  const navigate = useNavigate()

  const getCurrentData = () => {
    /** Просто аккумулируем все данные из форм в один объект */
    let game = {}
    for (let step in stepForms) {
      game = { ...game, ...stepForms[step].values }
    }
    return game
  }

  const checkCurrentStep = () => {
    /** Здесь идет проверка на наличие ошибок при условии, что поле заполнено
     * Если поле заполнено, но есть ошибка, форма мы говорим об этом юзеру через alert */
    for (let key in stepForms[currentStep].values) {
      if (
        isValueNotEmpty(stepForms[currentStep].values[key]) &&
        stepForms[currentStep].errors[key]
      ) {
        /** Здесь бы я использовал какой-нибудь кастомный alert, но решил на этом не зацикливаться */
        alert(`${key} - ${stepForms[currentStep].errors[key]}`)
        return false
      }
    }
    return true
  }

  const onSaveDraft = () => {
    for (let key in stepForms) {
      for (let valueKey in stepForms[key].values) {
        if (isValueNotEmpty(stepForms[key].values[valueKey])) {
          if (stepForms[key].errors[valueKey]) {
            /** Здесь бы я использовал какой-нибудь кастомный alert, но решил на этом не зацикливаться */
            return alert(`${valueKey} - ${stepForms[key].errors[valueKey]}`)
          }
        }
      }
    }

    updateGame(id, { ...getCurrentData(), status: 'draft' }).then(() => {
      navigate('/')
    })
  }

  const onComplete = () => {
    /** Функция для проверки на ошибки в формах, если есть ошибки,
     *  она их аккумулирует а потом показывает через алерт */
    let errors = ''
    for (let key in stepForms) {
      if (!stepForms[key].isValid) {
        for (let errorKey in stepForms[key].errors) {
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
    if (checkCurrentStep()) {
      updateGame(id, { ...stepForms[currentStep].values, status: 'draft' }).then(() => {
        setCurrentStep(step)
      })
    }
  }

  const stepProps = useCallback(
    step => ({
      setStepForm: form => {
        setStepForms(prev => {
          return { ...prev, [step]: form }
        })
      },
      id,
      setCurrentStep,
      data: data?.game,
    }),
    [data]
  )

  const addGameSteps = {
    stepOne: {
      title: 'Шаг 1',
      component: <UpdateGameStepOne {...stepProps('stepOne')} />,
      prevStep: null,
      nextStep: 'stepTwo',
    },
    stepTwo: {
      title: 'Шаг 2',
      component: <UpdateGameStepTwo {...stepProps('stepTwo')} />,
      prevStep: 'stepOne',
      nextStep: 'stepThree',
    },
    stepThree: {
      title: 'Шаг 3',
      component: <UpdateGameStepThree {...stepProps('stepThree')} />,
      prevStep: 'stepTwo',
    },
  }

  return (
    !isLoading &&
    data && (
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
            alignItems: 'center',
          }}>
          <Card  sx={{ width: 'auto', padding: '30px 40px 50px 40px' }} variant={'outlined'}>
            <Typography variant={'h1'}>{addGameSteps[currentStep].title}</Typography>
            <Typography sx={{ display: 'block', marginBottom: '30px' }} variant={'subtitle1'}>
              {translateStatus[data?.game?.status]}
            </Typography>
            {isLoading ? (
              <p className="flex justify-center items-center"></p>
            ) : error ? (
              <p className="text-red-600">error</p>
            ) : (
              <div className="flex justify-center">
                <div className="mb-5  min-w-[400px]">
                  {Object.keys(addGameSteps).map(step => (
                    <div key={step} className={currentStep === step ? 'visible' : 'hidden'}>
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
                    stepNavigate(addGameSteps[currentStep].prevStep)
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
          </Card>
          <List
            sx={{
              zIndex: '3',
              background: 'white',
              borderRadius: '4px',
              outline: '1px solid rgba(0, 0, 0, 0.12)',
              position: 'fixed',
              right: '20px',
              top: '150px',
            }}>
            {!isLoading &&
              stepForms &&
              Object.keys(stepForms).map((step, index) => (
                <ListItem key={index}>
                  <Tooltip
                    title={
                      Object.values(stepForms[step].errors).length
                        ? Object.entries(stepForms[step].errors).map(error => (
                            <ListItem key={error[0]}>{error[0] + ': ' + error[1] + '\n'}</ListItem>
                          ))
                        : null
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
  )
}
