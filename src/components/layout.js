import {Outlet} from "react-router";
import {Link} from 'react-router-dom'
import {Breadcrumb, Breadcrumbs} from "@elonkit/react";
import {Box} from "@mui/material";

const routes = [
    {link: '/', title: 'Главная',},
    {link: '/create', title: 'Добавить игру',}
]

export const Layout = () => {
    return (
        <main>
            <Box>
                <Breadcrumbs>
                    <Breadcrumb component='button'>
                        'hello
                    </Breadcrumb>
                </Breadcrumbs>
            </Box>
        <nav><ul>{routes.map(route => {
            return <li><Link key={route.link} to={route.link}>{route.title}</Link></li>
        })}</ul></nav>
        <div><Outlet/></div>
        </main>
    )
}
