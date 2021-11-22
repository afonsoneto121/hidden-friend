import { Grid } from '@mui/material'
import React, { ReactNode } from 'react'
import { useCurrentUser } from '../../app/hook'
import { User } from '../../pages/models/user'
import { Init } from './components/Init'
import { OptionsList } from './components/OptionsList'
import { Profile } from './components/Profile'
import * as C from "./styles"

type Props = {
  children: ReactNode,
}

export const Theme = ({ children }: Props) => {

  const user: User = useCurrentUser()

  return (
    <C.Container>
      <C.Area>
        <Grid container spacing={1}>

          <Grid item xs={3}>
            <C.SideBar>
              <Init />
              <OptionsList />
              <Profile user={user} />
            </C.SideBar>
          </Grid>
          <Grid item xs={9}>
            <C.Item>
              {children}
            </C.Item>
          </Grid>
        </Grid>
      </C.Area>
    </C.Container>
  )
}
