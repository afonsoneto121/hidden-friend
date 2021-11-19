import { Autocomplete, Avatar, Button, Card, CardContent, CardHeader, Checkbox, CircularProgress, FormControl, FormControlLabel, FormGroup, List, ListItem, ListItemAvatar, Step, StepLabel, Stepper, TextField, Typography } from '@material-ui/core';
import { Box } from '@material-ui/system';
import { CardActions, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../../app/hooks';
import { Theme } from '../../../components/Theme'
import { Group } from '../../models/group';
import { User } from '../../models/user';
import { createGroup } from '../../service/group';
import { getAllUsers } from '../../service/user';
import * as C from "./styles"

export const NewGroup = () => {
  const steps = ['Informações Básicas', 'Participantes', 'Confirmar'];

  const userCurrent = useAppSelector(select => select.login.currente)
  const [group, setGroup] = useState<Group>({ "admin": userCurrent })

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const [openAutocomplete, setOpenAutocomplete] = useState(false)
  const [optionsAutocomplete, setOptionsAutocomplete] = useState<User[]>([])
  const loading = openAutocomplete && optionsAutocomplete.length === 0;
  const [usersAdded, setUsersAdded] = useState<User[]>([userCurrent])


  useEffect(() => {
    let active = true;
    if (!loading) {
      return undefined;
    }
    (async () => {
      const result = await getAllUsers()
      if (active) {
        setOptionsAutocomplete(result)
      }
    })()

    return () => {
      active = false;
    }

  }, [loading])

  useEffect(() => {
    if (!openAutocomplete) {
      setOptionsAutocomplete([]);
    }
  }, [openAutocomplete]);

  const isStepOptional = (step: number) => {
    return step === 1;
  }
  const isStepSkipped = (step: number) => {
    return skipped.has(step)
  }

  const isStepLast = () => {
    return activeStep === steps.length - 1
  }
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1)
    setSkipped(newSkipped)

    if (isStepLast()) {
      setGroup((prev) => ({
        ...prev,
        users: usersAdded
      }))
      createGroup(group)
    }
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setGroup({ "admin": userCurrent })
    setUsersAdded([userCurrent])
    setActiveStep(0);
  };

  const handleOnChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroup((prev) => ({ ...prev, "name": event.target.value }))
  }
  const handleOnChangeDescription = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroup((prev) => ({ ...prev, "description": event.target.value }))
  }

  const handleOnChangePrivate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGroup((prev) => ({ ...prev, "private": event.target.checked }))
  }

  const BoxButtons = (
    <C.Steps>
      <Button
        disabled={activeStep === 0}
        sx={{ mr: 1 }}
        onClick={handleBack}
      > Voltar </Button>

      <Box sx={{ flex: '1 1 auto' }} />

      {isStepOptional(activeStep) && (
        <Button
          color="inherit"
          sx={{ mr: 1 }}
          onClick={handleSkip}
        >Pular</Button>
      )}

      <Button
        sx={{ mr: 1 }}
        onClick={handleNext}

      > {activeStep === steps.length - 1 ? 'Finalizar' : 'Próximo'} </Button>
    </C.Steps>
  );
  const Participants = (
    <C.Participants>
      <h1>Participantes</h1>
      {
        usersAdded?.length > 0 ?
          <List>
            {
              usersAdded?.map((value, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{value.name?.charAt(0)}</Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={value.name} secondary={`@${value.username}`} />
                </ListItem>
              ))

            }
          </List>
          : <h3>Sem participantes</h3>
      }

    </C.Participants>
  )
  const StepComponent = (step: number) => {
    if (step === 0) { //Basic Information
      return (
        <Card sx={{
          width: '100%',
        }}>
          <CardContent>
            <C.BasicForm>
              <TextField sx={{ width: '30%' }}
                label='Nome'
                variant='standard'
                value={group?.name}
                onChange={handleOnChangeName}
              />
              <TextField sx={{ width: '65%' }}
                label='Descrição'
                multiline
                value={group?.description}
                rows={4}
                onChange={handleOnChangeDescription}
              />
            </C.BasicForm>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={group?.private} onChange={handleOnChangePrivate} />}
                label='Privado'
              />
            </FormGroup>
          </CardContent>
          {BoxButtons}
        </Card>
      )
    } else if (step === 1) { //Participants
      return (<Card sx={{
        width: '100%',
      }}>
        <CardContent>
          <C.Wrapper>
            <C.Search>
              <Autocomplete
                sx={{ width: '100%' }}
                open={openAutocomplete}
                onOpen={() => { setOpenAutocomplete(true) }}
                onClose={() => { setOpenAutocomplete(false) }}
                options={optionsAutocomplete}
                loading={loading}

                isOptionEqualToValue={(option, value) => (
                  option.name === value.name
                )}
                getOptionLabel={(option) => option.name || ''}

                onChange={(event: any, value: User | null) => {
                  if (value !== null) {
                    const _ = usersAdded.push(value)
                    setUsersAdded(usersAdded)
                    setGroup(prev => ({
                      ...prev,
                      users: usersAdded
                    }))
                  }
                }}
                renderInput={(params) => (
                  <TextField {...params}
                    label='Pesquisar'
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <React.Fragment>
                          {loading ? <CircularProgress color='inherit' size={20} /> : null}
                          {params.InputProps.endAdornment}
                        </React.Fragment>
                      ),
                    }}
                  /> // Close TextField
                )}

              />
            </C.Search>

            <>
              {Participants}
            </>
          </C.Wrapper>
        </CardContent>
        {BoxButtons}
      </Card>)

    } else if (step === 2) { //Confirm
      return (<Card sx={{
        width: '100%',
      }}>
        <CardContent>
          <C.Wrapper>
            <C.Search>
              <TextField sx={{ width: '100%' }} value={group?.name} disabled variant='standard' />
              <Box sx={{ height: 12 }} />
              <TextField sx={{ width: '100%' }} value={group?.description} disabled variant='standard' multiline rows={4} />
            </C.Search>
            <>
              {Participants}
            </>
          </C.Wrapper>
        </CardContent>
        {BoxButtons}
      </Card>)
    }
  }
  return (
    <Theme>
      <C.Container>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: { optional?: React.ReactNode } = {};

            if (isStepOptional(index)) {
              labelProps.optional = (
                <Typography variant='caption'>Opcional</Typography>
              );
            }
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={index} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            )
          })}
        </Stepper>
        {activeStep === steps.length ? (
          <C.Steps>
            <Card sx={{
              width: '100%',
            }}>
              <CardContent>
                <h2>Grupo criado</h2>
              </CardContent>
              <C.BoxButtons>
                <Button
                  onClick={handleReset}
                >Reset</Button>
              </C.BoxButtons>
            </Card>
          </C.Steps>
        ) : (
          <>
            {StepComponent(activeStep)}
          </>
        )
        }
      </C.Container>
    </Theme>
  )
}
