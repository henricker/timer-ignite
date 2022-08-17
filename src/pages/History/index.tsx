import { formatDistanceToNow } from 'date-fns'
import PTBRDateFns from 'date-fns/locale/pt-BR'
import { useContext } from 'react'
import { CycleContext } from '../../context/cycle-context'
import {
  HistoryContainer,
  Status,
  TableComponent,
  TableContainer,
} from './style'

export function History() {
  const { cycles } = useContext(CycleContext)

  return (
    <HistoryContainer>
      <h1>Meu histórico</h1>
      <TableContainer>
        <TableComponent>
          <thead>
            <tr>
              <th>Tarefa</th>
              <th>Duração</th>
              <th>Início</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => (
              <tr key={cycle.id}>
                <td>{cycle.task}</td>
                <td>{cycle.minutesAmount} minutos</td>
                <td>
                  {formatDistanceToNow(cycle.createdAt, {
                    locale: PTBRDateFns,
                  })}
                </td>
                <td>
                  {cycle.finishedDate && (
                    <Status statusColor="green">Concluído</Status>
                  )}
                  {cycle.interruptedDate && (
                    <Status statusColor="red">Interrompido</Status>
                  )}
                  {!cycle.finishedDate && !cycle.interruptedDate && (
                    <Status statusColor="yellow">Em andamento</Status>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </TableComponent>
      </TableContainer>
    </HistoryContainer>
  )
}
