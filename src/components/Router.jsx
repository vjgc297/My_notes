import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from '../screens/home/Home.jsx';
import NoteDetail from "./NoteDetail.jsx"; 

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Home />} path='/'/>
                <Route element={<NoteDetail />} path='/note/:id'/>
                <Route element={<div>Sorry, something went wrong.</div>} path='*'/>
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
