import { Grid } from '@mui/material'
import React, { ReactNode } from 'react'
import { User } from '../../pages/models/user'
import { Init } from './components/Init'
import { OptionsList } from './components/OptionsList'
import { Profile } from './components/Profile'
import * as C from "./styles"

type Props = {
  children: ReactNode,
  user: User
}

export const Theme = ({ children, user }: Props) => {
  return (
    <C.Container>
      <C.Area>
        <Grid container spacing={0}>

          <Grid item xs={3}>
            <C.Item>
              <C.SideBar>
                <Init />
                <OptionsList />
                <Profile user={user}/>
              </C.SideBar>
            </C.Item>

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
