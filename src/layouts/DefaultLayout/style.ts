import styled from 'styled-components'

export const DefaultLayoutContainer = styled.div`
  max-width: 73rem;
  height: calc(100vh - 10rem);

  padding: 2.5rem;
  margin: 5rem auto;
  background-color: ${(props) => props.theme['gray-800']};

  border-radius: 8px;

  display: flex;
  flex-direction: column;
`
