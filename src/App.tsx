import './App.css'
import {useEffect, useState} from "react";

import {Header} from "./Components/header.tsx";
import {Home} from "./Components/home.tsx";
import {Characters} from "./Components/characters.tsx";
import {About} from "./Components/about.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient();

export type HeaderProps = {
    onButtonClick: (menuName: string) => void;
}

const App = () => {

    const initialMenu = 'home'

    const [activeMenu, setActiveMenu] = useState(initialMenu);

    useEffect(() => {
        console.log(activeMenu);
    }, [activeMenu]);

    const handleMenuNavigationBtnClick = (menuName: string) => {
        setActiveMenu(menuName);
    }

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <>
                    <Header onButtonClick={handleMenuNavigationBtnClick} />

                    {activeMenu === "home" && <Home />}
                    {activeMenu === "characters" && <Characters />}
                    {activeMenu === "about" && <About />}
                </>
            </QueryClientProvider>
        </>
    )
}

export default App
