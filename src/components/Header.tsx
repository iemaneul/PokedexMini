import { Heart, Search } from 'lucide-react'
import { Link, NavLink } from 'react-router-dom'
export function Header() { return <header><Link to="/" className="brand"><span>◉</span> Pokédex Mini</Link><nav><NavLink to="/" end><Search size={17}/> Explorar</NavLink><NavLink to="/favorites"><Heart size={17}/> Favoritos</NavLink></nav></header> }
