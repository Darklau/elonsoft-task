import { Outlet, useLocation } from 'react-router'
import { Link } from 'react-router-dom'
import {
  IconListAlt,
  IconPencilW500,
  Sidebar,
  SidebarMenu,
  SidebarToggle,
  Sidenav,
  SidenavItem,
} from '@elonkit/react'
import { Box, Typography } from '@mui/material'
import { useState } from 'react'

export const Layout = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false)
  const location = useLocation()

  return (
    <main>
      <nav className={'mb-4'}>
        <Sidenav
          sx={{
            position: 'fixed',
            top: '0',
            height: '100vh',
          }}>
          <Sidebar color={'primary'} open={sidebarVisible} width={300}>
            <SidebarMenu>
              <SidenavItem
                component={Link}
                to="/"
                icon={<Typography typography={'h4'}>ML</Typography>}></SidenavItem>
            </SidebarMenu>
            <SidebarToggle
              onClick={() => {
                setSidebarVisible(!sidebarVisible)
              }}
            />
            <SidenavItem
             component={Link}
             to="/"
              text={'Список игр'}
              selected={location.pathname === '/'}
              icon={<Box sx={{display: 'flex', columnGap: '10px'}}><IconListAlt /></Box>}
            />

            <SidenavItem
              component={Link}
              selected={location.pathname.includes('/update')}
              to={'/create'}
              text={'Создать игру'}
              icon={<Box sx={{display: 'flex', columnGap: '10px'}}><IconPencilW500 /></Box>}
            />
          </Sidebar>
        </Sidenav>
      </nav>
      <Box sx={{ paddingTop: '50px' }}>
        <Outlet />
      </Box>
    </main>
  )
}
