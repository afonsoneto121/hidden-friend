import React, { useEffect, useState } from 'react'
import { Theme } from '../../../components/Theme'
import { Group } from '../../models/group'
import { useParams } from 'react-router-dom'
import { Avatar, Button, Card, CardActions, CardHeader } from '@material-ui/core'
import * as C from "./styles"
import * as ServiceGroup from '../../service/group'
import * as ServiceAuth from '../../service/auth/auth'
import { useCurrentUser } from '../../../app/hook'
import { User } from '../../models/user'
import { Box } from '@material-ui/system'

export const DetailsGroup = () => {
  const [group, setGroup] = useState<Group>()
  const userCurrent: User = useCurrentUser()
  const params = useParams()
  
  const isAdmin = () => {
    return group?.admin?._id === userCurrent._id
  }
  
  useEffect(() => {
    (async () => {
      const result = await ServiceGroup.gettGroupByID(params.id || "")
      console.log(result)
      setGroup(result)
    })()
  }, [])
  const handleOnClick = () => {
    (async ()=> {
      await ServiceGroup.generateMatches(userCurrent,group?._id || "")
    })()
    alert("Combinação criada")
  }
  return (
    <Theme>
      <C.Container>
        <C.TitlePage>Detalhes </C.TitlePage>
        {
          group !== undefined ?
            <Card>
              <CardHeader title={group?.name} />
              <C.Content>
                <p className="description">{group?.description}</p>
                <p className="length">{group?.users == null ? "0 participante " :
                  group?.users?.length === 1 ? "1 participante" :
                    `${group?.users?.length} participantes`} </p>
                <C.Participants>
                  {
                    group !== undefined && group.users !== undefined && group?.users?.length > 0 &&
                    group?.users?.map((user, index) => (
                      <C.Participant key={index}>
                        <Avatar>{user.name?.charAt(0)}</Avatar>
                        <C.ParticipantText>
                          <p className="name">{user.name}</p>
                          <p className="username">@{user.username}</p>
                        </C.ParticipantText>
                      </C.Participant>
                    ))
                  }
                </C.Participants>
              </C.Content>
              <CardActions>
                {
                  isAdmin() && <Button variant="outlined" onClick={handleOnClick}> Gerar Combinações</Button>
                }
              </CardActions>
            </Card>
            :
            <Card>
              <h2>Groupo não encontrado</h2>
            </Card>
        }
      </C.Container>
    </Theme>
  )
}
