import { Hand, Play } from 'phosphor-react'
import {
  StartCountDownButton,
  HomeContainer,
  StopCountDownButton,
} from './style'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useState } from 'react'

import { Cycle } from '../../interfaces/cycle'
import { CountDownTime } from './components/Countdown'
import { CycleContext } from './context/cycle-context'
import { Form } from './components/Form'

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo deve ser de no mínimo 5 minutos')
    .max(60, 'O ciclo deve ser de no máximo 60 minutos')
    .multipleOf(5),
})

type newCycleFormData = zod.infer<typeof newCycleFormSchema>

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [currentCycleId, setCurrentCycleId] = useState<string | null>(null)
  const [totalSecondsAmount, settotalSecondsAmount] = useState(0)
  const formStateHook = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const { handleSubmit, watch, reset } = formStateHook

  function handleFinishedCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === currentCycleId) {
          return {
            ...cycle,
            finishedDate: new Date(),
          }
        }
        return cycle
      }),
    )
  }

  function handleCreateNewCycle(data: newCycleFormData) {
    const newCycle = {
      id: new Date().getMilliseconds().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      createdAt: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    setCurrentCycleId(newCycle.id)
    settotalSecondsAmount(0)
    reset()
  }

  function handleInteruptCycle() {
    setCycles((state) =>
      state.map((cycle) => {
        if (cycle.id === currentCycleId) {
          return {
            ...cycle,
            interruptedDate: new Date(),
          }
        }

        return cycle
      }),
    )

    setCurrentCycleId(null)
  }

  const isSubmitDisabled = !watch('task')
  const hasActiveCycle = cycles.find((c) => c.id === currentCycleId)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <CycleContext.Provider
          value={{
            currentCycleId,
            setCyclesState: handleFinishedCycle,
            hasActiveCycle,
            totalSecondsAmount,
            settotalSecondsAmount,
          }}
        >
          <FormProvider {...formStateHook}>
            <Form />
          </FormProvider>

          <CountDownTime />
        </CycleContext.Provider>

        {hasActiveCycle ? (
          <StopCountDownButton type="button" onClick={handleInteruptCycle}>
            <Hand size={24} />
            Interromper
          </StopCountDownButton>
        ) : (
          <StartCountDownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountDownButton>
        )}
      </form>
    </HomeContainer>
  )
}
