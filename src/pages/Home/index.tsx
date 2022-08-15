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

export function Home() {
  return (
    <HomeContainer>
      <form>
        <FormContainer>
          <label htmlFor="project_name">Vou trabalhar em </label>
          <TaskInput
            id="project_name"
            type="text"
            placeholder="Dê um nome para o seu projeto"
            list="task-suggestions"
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

        <ButtonCountDownButton type="submit">
          <Play size={24} />
          Começar
        </ButtonCountDownButton>
      </form>
    </HomeContainer>
  )
}
