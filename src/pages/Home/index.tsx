import { Play } from 'phosphor-react'
import {
  ButtonCountDownButton,
  CountDownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  TaskInput,
  TimeInput,
} from './style'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

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
  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  function handleCreateNewCycle(data: newCycleFormData) {
    console.log(data)
    reset()
  }

  const isSubmitDisabled = !watch('task')
  return (
    <HomeContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)}>
        <FormContainer>
          <label htmlFor="project_name">Vou trabalhar em </label>
          <TaskInput
            id="project_name"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto 1" />
            <option value="Projeto 2" />
            <option value="Projeto 3" />
          </datalist>

          <label id="minutes">durante</label>
          <TimeInput
            id="minutes"
            type="number"
            placeholder="00"
            step={5}
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountDownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountDownContainer>

        <ButtonCountDownButton type="submit" disabled={isSubmitDisabled}>
          <Play size={24} />
          Começar
        </ButtonCountDownButton>
      </form>
    </HomeContainer>
  )
}
