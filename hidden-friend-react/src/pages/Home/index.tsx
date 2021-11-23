
import { useEffect, useState } from "react";
import { Group } from "../models/group";
import { getAllGroups, gettUserGroup } from "../service/group"

import * as C from "./styles"
import { Theme } from "../../components/Theme";
import { Menu, MenuItem, Avatar, Card, CardActions, CardHeader, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Skeleton } from "@mui/material";
import { Box } from "@material-ui/system";
import { KeyboardArrowRight, MoreVert } from "@mui/icons-material";
import { User } from "../models/user";
import { useNavigate } from "react-router";

export const Home = () => {
  const navigate = useNavigate()

  const [groups, setGroups] = useState<Group[]>([])
  const [expanded, setExpanded] = useState(false)
  const [groupCurrent, setGroupCurrent] = useState<Group>()
  const [usersGroup, setUsersGroup] = useState<User[]>([])
  let [currentID, setCurrentID] = useState('')

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>, id: string) => {
    setCurrentID(id)
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  }
  useEffect(() => {

    const allGroup = async () => {
      const result = await getAllGroups()
      setGroups(result)
    }
    allGroup()
  }, [])

  useEffect(() => {
    const getCurrentGroup = async () => {
      const id = groupCurrent?._id || ' '
      const result = await gettUserGroup(id)
      setUsersGroup(result)
    }
    getCurrentGroup();
  }, [groupCurrent])

  const handleExpandClick = (index: number) => {
    setGroupCurrent(groups[index])
    setGroups(groups.map((group, key) => {
      if (key === index) {
        group.expand = !group.expand
        setExpanded(group.expand)

      } else {
        group.expand = false
      }
      return group
    }))
  };

  return (
    <Theme>
      <C.Container>
        <Grid container spacing={0.5}>
          <C.TitlePage> <h1>Página Inicial </h1> </C.TitlePage>
          <Grid item xs={8}>
            <C.Wrapper>
              {
                groups !== null && groups?.length > 0 ?
                  groups.map((group, index) => (
                    <Card key={index} sx={{ marginBottom: 3 }}>
                      <CardHeader
                        action={
                          <IconButton
                            aria-label="settings"
                            aria-controls='basic-menu'
                            aria-haspopup={open ? 'true' : undefined}
                            onClick={(e)=> handleClick(e,group._id || "")}
                          >
                            <MoreVert />
                          </IconButton>
                        }
                        title={group.name}
                      />
                      <Menu
                        id='basic-menu'
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                      >
                        <MenuItem>Entrar</MenuItem>
                        <MenuItem onClick={()=> navigate(`/group/details/${currentID}`)}>Detalhes</MenuItem>
                      </Menu>
                      <C.Content>
                        <p className="description">{group.description}</p>
                        <p className="length">{group.users == null ? "0 participante " :
                          group.users?.length === 1 ? "1 participante" :
                            `${group.users?.length} participantes`} </p>

                      </C.Content>

                      <CardActions >
                        <C.ExpandMore
                          expand={group.expand || false}
                          onClick={() => handleExpandClick(index)}
                          aria-expanded={group.expand || false}
                          aria-label="show more"
                        >
                          <KeyboardArrowRight />
                        </C.ExpandMore>

                      </CardActions>
                    </Card>
                  ))
                  : <Box sx={{ width: 300 }}>
                    <Skeleton />
                  </Box>
              }
            </C.Wrapper>

          </Grid>

          <Grid item xs={4}>
            
              
                <C.Participants
                  in={expanded}
                  timeout='auto'
                  orientation='horizontal'

                >
                  <h1>Participantes</h1>
                  {
                    usersGroup?.length > 0 ?
                      <List>
                        {
                          usersGroup.map((user, index) => (
                            <ListItem key={index}>
                              <ListItemAvatar>
                                <Avatar>{user.name?.charAt(0)}</Avatar>
                              </ListItemAvatar>
                              <ListItemText primary={user.name} secondary={`@${user.username}`} />

                            </ListItem>
                          ))
                        }
                      </List>
                      : <h2>Sem participantes</h2>
                  }

                </C.Participants>
              
            
          </Grid>
        </Grid>
      </C.Container>
    </Theme>
  )
}
