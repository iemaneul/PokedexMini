import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import type { Pokemon } from '../types/pokemon'
import { getPokemon } from '../services/pokeApi'
import { PokemonCard } from '../components/PokemonCard'
import { PokemonModal } from '../components/PokemonModal'
import { EmptyState, ErrorState, LoadingState } from '../components/States'
import { useFavorites } from '../hooks/useFavorites'
export function FavoritesPage() { const { favorites, toggle, isFavorite } = useFavorites(); const [items, setItems] = useState<Pokemon[]>([]), [loading, setLoading] = useState(true), [error, setError] = useState(''), [selected, setSelected] = useState<Pokemon | null>(null); useEffect(() => { let alive = true; setLoading(true); Promise.all(favorites.map(getPokemon)).then(pokemon => alive && setItems(pokemon)).catch(cause => alive && setError(cause.message)).finally(() => alive && setLoading(false)); return () => { alive = false } }, [favorites]); return <><section className="favorites-heading"><div className="heart-icon"><Heart fill="currentColor"/></div><p className="eyebrow">SUA COLEÇÃO</p><h1>Pokémon favoritos</h1><p>Os Pokémon que você guardou estão todos aqui.</p></section>{loading ? <LoadingState/> : error ? <ErrorState text={error}/> : items.length ? <div className="pokemon-grid">{items.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} favorite={isFavorite(pokemon.id)} onFavorite={() => toggle(pokemon.id)} onSelect={() => setSelected(pokemon)}/>)}</div> : <EmptyState text="Você ainda não favoritou nenhum Pokémon."/>}{selected && <PokemonModal initialPokemon={selected} isFavorite={isFavorite} onFavorite={toggle} onClose={() => setSelected(null)}/>}</> }
