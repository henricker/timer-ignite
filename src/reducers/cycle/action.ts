import { Cycle } from '../../interfaces/cycle'

export enum ActionCycleType {
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERUPT_CURRENT_CYCLE = 'INTERUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED',
}

export function addNewCycleAction(newCycle: Cycle) {
  return {
    type: ActionCycleType.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCurrentCycleAction() {
  return {
    type: ActionCycleType.INTERUPT_CURRENT_CYCLE,
  }
}

export function markCurrentCycleAsFinishedAction() {
  return {
    type: ActionCycleType.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}
