import { AppBar, IconButton, Toolbar } from "@material-ui/core"
import { Box } from "@material-ui/system"
import { ReactNode } from "react"
import MenuIcon from '@mui/icons-material/Menu';
import * as C from "./styles"
import { AccountCircle } from "@mui/icons-material";
import Menu from "@mui/icons-material/Menu";
import { Typography } from "@mui/material";

type Props = {
  children: ReactNode,
  namePage: string
}
export const Nav = ({ children, namePage }: Props) => {
  return (
    <Box sx={{ flexGrow: 1 }} >
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {namePage}
          </Typography>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>

        </Toolbar>
      </AppBar>
    </Box>
  )
}
