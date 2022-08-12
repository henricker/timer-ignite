import { Outlet } from 'react-router-dom'
import { Header } from '../../components/Header'
import { DefaultLayoutContainer } from './style'

export function DefaultLayout() {
  return (
    <DefaultLayoutContainer>
      <Header />
      <Outlet />
    </DefaultLayoutContainer>
  )
}
