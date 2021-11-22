import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { MoreHoriz } from '@mui/icons-material'
import { Avatar } from '@mui/material'
import React, { useState } from 'react'
import { User } from '../../../../pages/models/user'
import * as C from "./styles"
import * as ServiceAuth from "../../../../pages/service/auth/auth"
import { useNavigate } from 'react-router'
type Props = {
  user: User
}

export const Profile = ({ user }: Props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const navigate = useNavigate()
  const handleOnClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleOnClickClose = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(null)
  }

  const handleOnClickLogout = () => {
    ServiceAuth.logout()
    navigate("/")
  }

  return (
    <C.Container>
      <C.Profile>
        <C.Avatar>
          <Avatar>{user.name?.charAt(0)}</Avatar>
        </C.Avatar>

        <C.ProfileDetails>
          <p className="name">{user.name} </p>
          <p className="username"> @{user.username} </p>
        </C.ProfileDetails>
        <div className="open">
          <IconButton
            aria-label="settings"
            aria-controls="basic-menu"
            aria-haspopup={open ? 'true' : undefined}
            onClick={handleOnClickMore}
          >
            <MoreHoriz />
          </IconButton>

          <Menu
            id='menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleOnClickClose}
          >
            <MenuItem
              onClick={handleOnClickLogout}
            >Sair</MenuItem>

          </Menu>
        </div>
      </C.Profile>
    </C.Container>
  )
}
