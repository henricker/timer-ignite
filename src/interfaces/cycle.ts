export type Cycle = {
  id: string
  task: string
  minutesAmount: number
  createdAt: Date
  interruptedDate?: Date
  finishedDate?: Date
}
