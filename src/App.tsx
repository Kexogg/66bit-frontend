import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout/Layout.tsx'
import Home from './pages/Home/Home.tsx'
import Profile from './pages/Profile/Profile.tsx'

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/profile/:id" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
