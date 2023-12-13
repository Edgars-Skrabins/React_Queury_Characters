import './App.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {Header} from "./Components/header.tsx";

const queryClient = new QueryClient();

const App = () => {

    return (
        <>
            <QueryClientProvider client={queryClient}>
                <Header/>
            </QueryClientProvider>
        </>
    )
}

export default App
