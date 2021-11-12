import { ListItemText } from "@material-ui/core"
import { Home, ListAlt, NotificationsNone, Person } from "@mui/icons-material"
import { List, ListItem, ListItemButton, ListItemIcon } from "@mui/material"
import * as C from "./styles"

export const OptionsList = () => {
  return (
    <C.Container>
      <List>
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Home /> {/* Icons */}
            </ListItemIcon>
            <ListItemText primary="Página Inicial"/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <NotificationsNone /> {/* Icons */}
            </ListItemIcon>
            <ListItemText primary="Notificações"/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <Person /> {/* Icons */}
            </ListItemIcon>
            <ListItemText primary="Perfil"/>
          </ListItemButton>
        </ListItem>

        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <ListAlt /> {/* Icons */}
            </ListItemIcon>
            <ListItemText primary="Meus Grupos"/>
          </ListItemButton>
        </ListItem>

      </List>
    </C.Container>
  )
}
