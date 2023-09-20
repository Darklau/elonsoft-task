import logo from './logo.svg';
import './index.css'
import './App.css';

import {Route, Router, Routes} from 'react-router'
import {UpdateGame} from "./pages/updateGame/updateGame";
import {GamesList} from "./pages/gamesList/gamesList";
import {createTypography, Link, Sidenav, SidenavItem} from "@elonkit/react";
import {BrowserRouter} from "react-router-dom";
import {Layout} from "./components/layout";
import { createTheme, palettes, ru } from '@elonkit/react';
import {ThemeProvider} from "@mui/material";
import {ruRU} from "@mui/material/locale";
import {CreateGame} from "./pages/createGame/createGame";
import {QueryClient, QueryClientProvider} from "react-query";


function App() {
    const queryClient = new QueryClient()



    const theme = createTheme({
        palette: {
            ...palettes.common,
            ...palettes.light
        },
        typography: createTypography
       },
        {...ruRU, ru});


  return (
    <div className="App">
        {/*<Sidenav>*/}
        {/*    <SidenavItem>*/}
        {/*        <Link to={'/'}>Ваши игры</Link>*/}
        {/*    </SidenavItem>*/}
        {/*</Sidenav>*/}
        <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
        <BrowserRouter>
            <Routes>
                <Route element={<Layout/>}>
                    <Route path={'/'} element={<GamesList/>}/>
                    <Route path={'/create'} element={<CreateGame/>}/>
                    <Route path={'/update/:id'} element={<UpdateGame/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
        </ThemeProvider>
        </QueryClientProvider>
    </div>
  );
}

export default App;
