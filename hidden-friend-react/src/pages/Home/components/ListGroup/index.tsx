import React from 'react'
import { Group } from '../../../models/group'

import * as C from "./styles"

type Props = {
  groups: Group[],
}
export const ListGroup = ({ groups }: Props) => {
  return (
    <C.Container>
      {
        groups.map((item, index) => (
          <C.ItemGroup key={index}>
            <h1>{item.name}</h1>
          </C.ItemGroup>
        ))
      }
    </C.Container>
  )
}

