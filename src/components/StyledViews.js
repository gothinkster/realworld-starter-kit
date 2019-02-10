
import styled, { css } from 'styled-components'
import { Dimensions } from 'react-native'

const { height, width } = Dimensions.get('window')

export const FullScreenView = styled.View`
  flex: 1
  flexDirection: column
  justifyContent: flex-start
  alignItems: center
  backgroundColor: white
  
  ${props => props.paddingTopPercent && css`
    paddingTop: ${({paddingTopPercent}) => (height * ((paddingTopPercent)/100)) || 0}
  `}
`

export const ButtonView = styled.View`
  height: 50
  width: 90
  justifyContent: center
  alignItems: center
  backgroundColor: transparent
  borderRadius: 10
  borderColor: green
  borderWidth: 2
  
  ${props => props.greenBackground && css`
    backgroundColor: green
  `}
  
  ${props => props.redBackground && css`
    backgroundColor: red
    borderColor: red
  `}

  ${props => props.themeColor && css`
    backgroundColor: ${({themeColor}) => themeColor || transparent}
    borderColor: ${({themeColor}) => themeColor || transparent}
  `}
  
  ${props => props.wide && css`
    width: 160
  `}
`
