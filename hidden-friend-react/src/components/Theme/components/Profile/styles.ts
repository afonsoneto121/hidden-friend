import { styled } from "@material-ui/system";

export const Container = styled('div')({
  display: 'flex',
  flexGrow: 1,
})

export const Profile = styled('div')({ 
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
  width: '100%',
  maxWidth: '100%',
  alignSelf: 'flex-end',
  
  '.open': {
    display: 'flex',
    justifyContent: 'flex-end',
    fontWeight: 'bold',
    flexGrow: 1,
    paddingRight: '10px',
    cursor: 'pointer',
  },
  ':hover': {
    backgroundColor: 'rgba(0,0,0,0.1)'
  }
})

export const ProfileDetails = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 0,
  padding: '10px',
  '.name': {
    margin: 0,
    fontSize: '18px',
    fontWeight: 'bold',
  },

  '.username': {
    margin: 0,
    fontSize: '14px',
    fontWeight: 'lighter'
  }

})

export const Avatar = styled('div')({
  flexGrow: 0,
  padding: 0, 
  margin: 0,
})