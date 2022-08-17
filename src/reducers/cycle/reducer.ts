import produce from 'immer'
import { Cycle } from '../../interfaces/cycle'
import { ActionCycleType } from './action'

type CycleState = {
  cycles: Cycle[]
  currentCycleId: string | null
}

export function cyclesReducer(state: CycleState, action: any) {
  switch (action.type) {
    case ActionCycleType.ADD_NEW_CYCLE: {
      return produce(state, (draft) => {
        draft.cycles.push(action.payload.newCycle)
        draft.currentCycleId = action.payload.newCycle.id
      })
    }

    case ActionCycleType.INTERUPT_CURRENT_CYCLE: {
      const currentCycleIndex = state.cycles.findIndex(
        (cycle) => cycle.id === state.currentCycleId,
      )

      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.currentCycleId = null
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
      })
    }

    case ActionCycleType.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.currentCycleId
      })

      if (currentCycleIndex < 0) return state

      return produce(state, (draft) => {
        draft.currentCycleId = null
        draft.cycles[currentCycleIndex].finishedDate = new Date()
      })
    }
    default:
      return state
  }
}
