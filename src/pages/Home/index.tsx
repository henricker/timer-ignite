import { Hand, Play } from 'phosphor-react'
import {
  StartCountDownButton,
  HomeContainer,
  StopCountDownButton,
} from './style'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useContext } from 'react'
import { CountDownTime } from './components/Countdown'
import { Form } from './components/Form'
import { CycleContext } from '../../context/cycle-context'

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
  const { handleInteruptCycle, createNewCycle, cycles, currentCycleId } =
    useContext(CycleContext)
  const formStateHook = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  const { handleSubmit, watch, reset } = formStateHook

  function handleCreateCycle(data: newCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const isSubmitDisabled = !watch('task')
  const hasActiveCycle = cycles.find((c) => c.id === currentCycleId)

  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateCycle)}>
        <FormProvider {...formStateHook}>
          <Form />
        </FormProvider>
        <CountDownTime />

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
