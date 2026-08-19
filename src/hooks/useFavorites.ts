import { useEffect, useState } from 'react'
const KEY = 'pokedex-mini-favorites'
export function useFavorites() {
  const [favorites, setFavorites] = useState<number[]>(() => { try { return JSON.parse(localStorage.getItem(KEY) || '[]') } catch { return [] } })
  useEffect(() => localStorage.setItem(KEY, JSON.stringify(favorites)), [favorites])
  const toggle = (id: number) => setFavorites(old => old.includes(id) ? old.filter(item => item !== id) : [...old, id])
  return { favorites, toggle, isFavorite: (id: number) => favorites.includes(id) }
}
