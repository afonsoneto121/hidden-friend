import { Avatar, Grid } from '@mui/material'
import React, { ReactNode } from 'react'
import { User } from '../../../../pages/models/user'
import * as C from "./styles"

type Props = {
  user: User
}

export const Profile = ({ user }: Props) => {
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
          <p> ... </p>
        </div>
      </C.Profile>
    </C.Container>
  )
}
