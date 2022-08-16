import { Hand, Play } from 'phosphor-react'
import {
  StartCountDownButton,
  CountDownContainer,
  FormContainer,
  HomeContainer,
  Separator,
  TaskInput,
  TimeInput,
  StopCountDownButton,
} from './style'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
import { useEffect, useState } from 'react'
import { differenceInSeconds } from 'date-fns'

const newCycleFormSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo deve ser de no mínimo 5 minutos')
    .max(60, 'O ciclo deve ser de no máximo 60 minutos')
    .multipleOf(5),
})

type newCycleFormData = zod.infer<typeof newCycleFormSchema>

type Cycle = {
  id: string
  task: string
  minutesAmount: number
  createdAt: Date
  interruptedDate?: Date
  finishedDate?: Date
}

export function Home() {
  const [cycles, setCycles] = useState<Cycle[]>([])
  const [totalSecondsAmount, settotalSecondsAmount] = useState(0)
  const [currentCycleId, setCurrentCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<newCycleFormData>({
    resolver: zodResolver(newCycleFormSchema),
    defaultValues: {
      minutesAmount: 0,
      task: '',
    },
  })

  function handleCreateNewCycle(data: newCycleFormData) {
    const newCycle = {
      id: new Date().getMilliseconds().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      createdAt: new Date(),
    }

    setCycles((state) => [...state, newCycle])
    settotalSecondsAmount(newCycle.minutesAmount * 60)
    setCurrentCycleId(newCycle.id)
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
  const totalSeconds = hasActiveCycle ? hasActiveCycle.minutesAmount * 60 : 0

  const currentSeconds = hasActiveCycle ? totalSeconds - totalSecondsAmount : 0

  const missingMinutes = Math.floor(currentSeconds / 60)
    .toString()
    .padStart(2, '0')

  const missingSeconds = (currentSeconds % 60).toString().padStart(2, '0')

  useEffect(() => {
    let interval: number

    if (hasActiveCycle) {
      interval = setInterval(() => {
        const secondsDiff = differenceInSeconds(
          new Date(),
          hasActiveCycle.createdAt,
        )

        if (secondsDiff >= totalSeconds) {
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
          settotalSecondsAmount(totalSeconds)
          clearInterval(interval)
        } else {
          settotalSecondsAmount(secondsDiff)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
      settotalSecondsAmount(0)
    }
  }, [currentCycleId, hasActiveCycle, totalSeconds])

  useEffect(() => {
    if (hasActiveCycle) {
      document.title = `${missingMinutes}:${missingSeconds}`
    }
  }, [hasActiveCycle, missingMinutes, missingSeconds])

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
            disabled={!!hasActiveCycle}
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
            disabled={!!hasActiveCycle}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutes.</span>
        </FormContainer>

        <CountDownContainer>
          <span>{missingMinutes[0]}</span>
          <span>{missingMinutes[1]}</span>
          <Separator>:</Separator>
          <span>{missingSeconds[0]}</span>
          <span>{missingSeconds[1]}</span>
        </CountDownContainer>

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
