import { styled } from "@material-ui/system";

export const Container = styled('div')({  
  backgroundColor: '#fff',
  minHeight: '100vh'
});

export const Area = styled('div')({  
  margin: 'auto',
  maxWidth: '1500px',
  minHeight: '100vh',
});

export const Item = styled('div')({  
  display: 'flex',
  width: '100%',
  height: '100%',
});

export const SideBar = styled('div')({ 
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  height: '100vh',
  borderRight: '1px solid #EFF3F4'
})
