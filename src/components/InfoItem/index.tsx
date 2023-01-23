import * as C from './styles'


type props = {
    label: string,
    value: string,
}
export const InfoItem = ({label,value}:props) =>{
  return(
    <C.container>
     <C.Label>{label}</C.Label>
     <C.Value>{value}</C.Value>
    </C.container>
  )
}