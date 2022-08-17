import { createContext } from 'react'
import { Cycle } from '../../../interfaces/cycle'

type CycleContextType = {
  hasActiveCycle?: Cycle
  currentCycleId: string | null
  totalSecondsAmount: number
  setCyclesState: () => void
  settotalSecondsAmount: (secondsPassed: number) => void
}

export const CycleContext = createContext({} as CycleContextType)
