import { styled } from "@material-ui/system";

export const Container = styled('div')({
  width: '100%',
  paddingTop: 10,
  'ul': {
    margin: 0,
    padding: 0,
    'li': {
      margin: 0,
      padding: 0,
    }
  }
})

export const NewGroup = styled('div')({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingTop: 10,
})