import { Routes, Route } from 'react-router-dom'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { FavoritesPage } from './pages/FavoritesPage'
export default function App() { return <><Header/><main><Routes><Route path="/" element={<HomePage/>}/><Route path="/favorites" element={<FavoritesPage/>}/></Routes></main></> }
