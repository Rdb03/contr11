import './App.css'
import Header from "./components/Header/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Commodities from "./containers/commodity/Commodities.tsx";
import Login from "./containers/users/Login.tsx";
import Register from "./containers/users/Register.tsx";
import NewCommodities from "./containers/commodity/NewCommodities.tsx";
import FullCommodity from "./containers/fullCommodity/fullCommodity.tsx";
import NoFound from "./components/No Found/No Found.tsx";


const App = () => {
    return (
        <div className="App">
            <Header/>
            <Routes>
                <Route path="/" element={(
                    <Commodities/>
                )}/>
                <Route path="/register" element={(
                    <Register/>
                )}/>
                <Route path="/login" element={(
                    <Login/>
                )}/>
                <Route path="/newcommodity" element={(
                    <NewCommodities/>
                )}/>
                <Route path="/fullcommodity/:id" element={(
                    <FullCommodity/>
                )}/>
                <Route path='/*' element={<NoFound />} />
            </Routes>
        </div>
    );
};

export default App
