import { styled } from "@material-ui/system";

export const Container = styled('div')({
  width: '100%',
  padding: 10,
  backgroundColor: '#FDFDFF',
  overflow: 'hidden',
})

export const Wrapper = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
  maxHeight: '100%',
})

export const Steps = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  paddingTop: 2,
})

export const BoxButtons = styled('div')({
  flex: '1 1 auto'
})

export const BasicForm = styled('div')({
  display: 'flex',
  width: '100%',
  justifyContent: 'space-between',
})

export const Search = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '35%',
})

export const Participants = styled('div')(({
  width: '60%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  backgroundColor: '#EFF1F1',
  borderRadius: 5,
  'h1': {
    fonstSize: 24,
    fontWeight: 'bold',
  }
}))