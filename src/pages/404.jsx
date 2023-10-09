
import { Box, Typography } from '@mui/material'

export const Error404 = () => {
  return (<div>
    <Box sx={{height: '50vh',  display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
      <Typography sx={{backgroundColor: 'red'}} variant={'h1'}>
        Страница не найдена :(
      </Typography>
    </Box>
  </div>)
}