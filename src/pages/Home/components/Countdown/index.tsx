import { differenceInSeconds } from 'date-fns'
import { useContext, useEffect } from 'react'
import { CycleContext } from '../../../../context/cycle-context'
import { CountDownContainer, Separator } from './style'

export function CountDownTime() {
  const {
    hasActiveCycle,
    currentCycleId,
    setCyclesState,
    totalSecondsAmount,
    settotalSecondsAmount,
  } = useContext(CycleContext)

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
          new Date(hasActiveCycle.createdAt),
        )

        if (secondsDiff >= totalSeconds) {
          setCyclesState()
          settotalSecondsAmount(totalSeconds)
          clearInterval(interval)
        } else {
          settotalSecondsAmount(secondsDiff)
        }
      }, 1000)
    }

    return () => {
      clearInterval(interval)
    }
  }, [
    currentCycleId,
    hasActiveCycle,
    setCyclesState,
    settotalSecondsAmount,
    totalSeconds,
  ])

  useEffect(() => {
    if (hasActiveCycle) {
      document.title = `${missingMinutes}:${missingSeconds}`
    }
  }, [hasActiveCycle, missingMinutes, missingSeconds])

  return (
    <CountDownContainer>
      <span>{missingMinutes[0]}</span>
      <span>{missingMinutes[1]}</span>
      <Separator>:</Separator>
      <span>{missingSeconds[0]}</span>
      <span>{missingSeconds[1]}</span>
    </CountDownContainer>
  )
}
