
import { Dimensions } from 'react-native'
import styled, { css } from 'styled-components'

const width = Dimensions.get('window').width

export const StyledTextInput = styled.TextInput`
  height: 40
  width: ${width * .8}
  borderColor: silver
  borderWidth: 1
  borderRadius: 5
  paddingHorizontal: 10
  marginVertical: 12
  
  ${props => props.marginTop && css`
    marginTop: ${({marginTop}) => marginTop || 0}
  `}
  
  ${props => props.invalid && css`
    color: red
  `}
`
