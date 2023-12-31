import { useQuery } from 'react-query'
import { getGame, getGames } from '../../services/game.service'
import { Link } from 'react-router-dom'
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  Typography,
} from '@mui/material'
import { IconPencilW400 } from '@elonkit/react'
import { translateStatus } from '../../utils/misc'

export const GamesList = () => {
  const { isLoading, error, data } = useQuery('gamesList', () => getGames())

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
      <Box sx={{ width: '100%' }}>
        <Link to={'/create'}>
          <Button variant={'outlined'}>Добавить игру</Button>
        </Link>
      </Box>
      <List sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '600px' }}>
        {data &&
          data.length &&
          data?.map(game => {if (game.status !== 'created') {return (
              <ListItem key={game.id} sx={{ width: '100%' }}>
                <Card
                  sx={{
                    width: '100%',
                    padding: '20px',
                  }}>
                  <CardContent
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      textAlign: 'center',
                      columnGap: '30px',
                    }}>
                    <Typography sx={{ textAlign: 'start' }} variant={'h4'}>
                      {game.title}
                    </Typography>
                    {game.description}
                    <Link to={`/update/${game.id}`}>
                      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                        <Button>
                          <IconPencilW400 />
                        </Button>
                        {translateStatus[game.status]}
                      </Box>
                    </Link>
                  </CardContent>
                </Card>
              </ListItem>
            )}
          })}
      </List>
    </Box>
  )
}
