import { useContext } from 'react'
import { useFormContext } from 'react-hook-form'
import { CycleContext } from '../../../../context/cycle-context'
import { FormContainer, TaskInput, TimeInput } from './style'

export function Form() {
  const { hasActiveCycle } = useContext(CycleContext)

  const { register } = useFormContext()

  return (
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
  )
}
