import { Collapse } from "@material-ui/core";
import {  CardContent,  IconButton } from "@mui/material";
import { styled } from '@mui/material/styles';

export const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  backgroundColor: '#FDFDFF',

})

export const TitlePage = styled('div')({
  padding: 10,
  width: '100%',
  border: '1px solid #EFF3F4',
  'h1': {
    margin: 0,
    fontSize: '24px',
    fontWeight: 'bold',
  }
})

export const Wrapper = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
})

export const Content = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',

  '.description': {
    margin: 0,
    marginBottom: 3,
    fontSize: '16px',
    fontWeight: 'lighter',
  },
  '.length': {
    margin: 0,
    marginBottom: 3,
    fontSize: '16px',
    fontWeight: 'lighter',
  }
})

type Props = {
  expand: boolean,
}

export const ExpandMore = styled(IconButton)(({expand} : Props) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: 'all ease 0.2s'
}))

export const Participants = styled(Collapse)(({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#EFF1F1',
  borderRadius: 5,
  'h1': {
    fonstSize: 24,
    fontWeight: 'bold',
  },
  top: 0,
  position: 'sticky', 
}))