import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Layout from './pages/Layout/Layout.tsx'
import Home from './pages/Home/Home.tsx'
import Profile from './pages/Profile/Profile.tsx'

function App() {
    document.documentElement.setAttribute(
        'data-theme',
        localStorage.getItem('theme') ?? 'light',
    )

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/employee/:id" element={<Profile />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App
