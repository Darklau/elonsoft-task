import { Outlet } from 'react-router'
import { Link } from 'react-router-dom'
import {
    Breadcrumb,
    Breadcrumbs,
    IconEmotionHappy2,
    IconListAlt,
    Sidebar, SidebarItem, SidebarMenu,
    SidebarToggle,
    Sidenav,
    SidenavItem,
} from '@elonkit/react'
import { Box, List, ListItem, Typography } from '@mui/material'
import { useState } from 'react'


const routes = [
  { link: '/', title: 'Главная' },
  { link: '/create', title: 'Добавить игру' },
]

export const Layout = () => {
    const [sidebarVisible, setSidebarVisible] = useState(false)
  return (
    <main>
      <nav className={'mb-4'}>
          <Sidenav sx={{
              position: 'fixed',
              top: '0',
              height: '100vh'
          }}>
          <Sidebar color={'primary'} open={sidebarVisible} width={300}>


                  <SidebarMenu >
                      <SidenavItem icon={<Typography variant={'h2'}>ML</Typography>}></SidenavItem>
                  </SidebarMenu>
              <SidebarToggle onClick={() => {setSidebarVisible(!sidebarVisible)}}/>
                <SidenavItem icon={<IconListAlt/>}>
                    <SidebarMenu behaviour={'hover'}>
                        <SidebarItem>
                            1
                        </SidebarItem>
                        <SidebarItem>
                            1
                        </SidebarItem>
                        <SidebarItem>
                            1
                        </SidebarItem>

                    </SidebarMenu>
                </SidenavItem>


                  <SidenavItem icon={<IconListAlt/>}>
                      <SidebarMenu>
                          <SidebarItem component={<Link/>} to='/create'>
                              <Box sx={{background: 'orange', padding: '10px', borderRadius: '5px'}} >
                                  <Typography variant={'h5'}>
                                      Добавить игру
                                  </Typography>
                              </Box>
                          </SidebarItem>
                      </SidebarMenu>

                  </SidenavItem>

          </Sidebar>
          </Sidenav>
        <List sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <ListItem sx={{ width: 'auto' }}>
                <Link to={'/'}>
                    <Box sx={{backgroundColor: 'cyan', padding: '10px', borderRadius: '30%'}}>
                    <Typography variant={'h1'}>ML</Typography>
                    </Box>
                </Link>
            </ListItem>
            <ListItem sx={{'width': 'auto'}}  >

                <Link to='/create'>
                    <Box sx={{background: 'orange', padding: '10px', borderRadius: '5px'}} >
                    <Typography variant={'h5'}>
                    Добавить игру
                    </Typography>
                    </Box>
                </Link>

            </ListItem>
        </List>
      </nav>
      <div>
        <Outlet />
      </div>
    </main>
  )
}
