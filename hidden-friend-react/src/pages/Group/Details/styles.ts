import { CardContent } from "@material-ui/core";
import { styled } from "@material-ui/system";

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

export const Participants = styled('div')({
  display: 'flex',
  flexWrap: 'wrap',
  width: '100%',
})

export const Participant = styled('div')({
  display: 'flex',
  width: 150,
  height: 70,
  alignItems: 'center',
  padding: 4,
  border: '1px solid #EFF3F4'
})
export const ParticipantText = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  marginLeft: 5,
  '.name': {
    margin: 0,
    padding: 0,
    fontSize: '18px',
  },
  '.username': {
    margin: 0,
    padding: 0,
    fontSize: '14px',
  }

})

