import { differenceInSeconds } from 'date-fns/esm'
import {
  createContext,
  ReactNode,
  useEffect,
  useReducer,
  useState,
} from 'react'
import { Cycle } from '../interfaces/cycle'
import {
  addNewCycleAction,
  interruptCurrentCycleAction,
  markCurrentCycleAsFinishedAction,
} from '../reducers/cycle/action'
import { cyclesReducer } from '../reducers/cycle/reducer'

type CycleContextProviderProps = {
  children: ReactNode
}

type NewCycleType = {
  task: string
  minutesAmount: number
}

type CycleContextType = {
  cycles: Cycle[]
  hasActiveCycle?: Cycle
  currentCycleId: string | null
  totalSecondsAmount: number
  setCyclesState: () => void
  settotalSecondsAmount: (secondsPassed: number) => void
  createNewCycle: (data: NewCycleType) => void
  handleInteruptCycle: () => void
}

export const CycleContext = createContext({} as CycleContextType)

export function CycleContextProvider({ children }: CycleContextProviderProps) {
  const [cyclesState, dispatch] = useReducer(cyclesReducer, {
    cycles: [],
    currentCycleId: null,
  })

  const { cycles, currentCycleId } = cyclesState

  useEffect(() => {
    const stateJSON = JSON.stringify(cyclesState)

    localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
  }, [cyclesState])

  const hasActiveCycle = cycles.find((c) => c.id === currentCycleId)
  const [totalSecondsAmount, settotalSecondsAmount] = useState(() => {
    if (hasActiveCycle) {
      return differenceInSeconds(new Date(), hasActiveCycle.createdAt)
    }

    return 0
  })

  function handleFinishedCycle() {
    dispatch(markCurrentCycleAsFinishedAction())
  }

  function createNewCycle(data: NewCycleType) {
    const newCycle = {
      id: new Date().getMilliseconds().toString(),
      task: data.task,
      minutesAmount: data.minutesAmount,
      createdAt: new Date(),
    }

    dispatch(addNewCycleAction(newCycle))
    settotalSecondsAmount(0)
  }

  function handleInteruptCycle() {
    dispatch(interruptCurrentCycleAction())
  }

  return (
    <CycleContext.Provider
      value={{
        currentCycleId,
        totalSecondsAmount,
        hasActiveCycle,
        settotalSecondsAmount,
        setCyclesState: handleFinishedCycle,
        createNewCycle,
        handleInteruptCycle,
        cycles,
      }}
    >
      {children}
    </CycleContext.Provider>
  )
}
