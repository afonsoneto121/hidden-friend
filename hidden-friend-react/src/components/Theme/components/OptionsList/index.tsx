import { Button, ListItemText } from "@material-ui/core"
import { Add, Home, ListAlt, NotificationsNone, Person } from "@mui/icons-material"
import { List, ListItem, ListItemButton, ListItemIcon } from "@mui/material"
import { useNavigate } from "react-router"
import * as C from "./styles"

export const OptionsList = () => {
  
  const navigate = useNavigate()
  const handleOnClickHome = () => {
    navigate('/home')
  }

  const handleOnClickNotification = () => {
    navigate('/home')
  }

  const handleOnClickProfile = () => {
    navigate('/home')
  }

  const handleOnClickMyGroups = () => {
    navigate('/home')
  }

  const handleOnClickNewGroup = () => {
    navigate('/group/new')
  }

  return (
    <C.Container>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Home /> {/* Icons */}
            </ListItemIcon>
            <ListItemText primary="Página Inicial" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <NotificationsNone /> {/* Icons */}
            </ListItemIcon>
            <ListItemText primary="Notificações" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Person /> {/* Icons */}
            </ListItemIcon>
            <ListItemText primary="Perfil" />
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ListAlt /> {/* Icons */}
            </ListItemIcon>
            <ListItemText primary="Meus Grupos" />
          </ListItemButton>
        </ListItem>

      </List>
      <C.NewGroup>
        <Button 
          variant="text"
          startIcon={<Add sx={{fontSize: 20 }} /> } 
          fullWidth
          onClick={handleOnClickNewGroup}
          >
          Novo Grupo
        </Button>
      </C.NewGroup>
    </C.Container>
  )
}
