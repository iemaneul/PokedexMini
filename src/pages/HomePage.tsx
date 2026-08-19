import { useEffect, useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal } from 'lucide-react'
import type { Pokemon } from '../types/pokemon'
import { getPokemon, getPokemonPage, getTypePokemon } from '../services/pokeApi'
import { PokemonCard } from '../components/PokemonCard'
import { PokemonModal } from '../components/PokemonModal'
import { EmptyState, ErrorState, LoadingState } from '../components/States'
import { useFavorites } from '../hooks/useFavorites'
import { formatPokemonName, getTypeColor } from '../utils/pokemon'

const TYPES = ['all', 'normal', 'fire', 'water', 'grass', 'electric', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy']
const PAGE_SIZE = 12
type Order = 'number' | 'name' | 'attack' | 'defense'

export function HomePage() {
  const [items, setItems] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [page, setPage] = useState(0)
  const [query, setQuery] = useState('')
  const [type, setType] = useState('all')
  const [order, setOrder] = useState<Order>('number')
  const [selected, setSelected] = useState<Pokemon | null>(null)
  const { toggle, isFavorite } = useFavorites()

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError('')
    const loadPokemon = async () => {
      try {
        let result: Pokemon[]
        if (query.trim()) result = [await getPokemon(query.trim().toLowerCase())]
        else if (type !== 'all') {
          const data = await getTypePokemon(type)
          result = await Promise.all(data.pokemon.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE).map(item => getPokemon(item.pokemon.name)))
        } else {
          const data = await getPokemonPage(page * PAGE_SIZE, PAGE_SIZE)
          result = await Promise.all(data.results.map(item => getPokemon(item.name)))
        }
        if (!cancelled) setItems(result)
      } catch (cause) {
        if (!cancelled) {
          setItems([])
          setError(cause instanceof Error ? cause.message : 'Ocorreu um erro inesperado.')
        }
      } finally { if (!cancelled) setLoading(false) }
    }
    loadPokemon()
    return () => { cancelled = true }
  }, [page, query, type])

  useEffect(() => setPage(0), [query, type])
  const sorted = useMemo(() => [...items].sort((a, b) => order === 'name' ? a.name.localeCompare(b.name) : order === 'number' ? a.id - b.id : (b.stats.find(stat => stat.stat.name === order)?.base_stat || 0) - (a.stats.find(stat => stat.stat.name === order)?.base_stat || 0)), [items, order])
  const title = query ? 'Resultado da busca' : type === 'all' ? 'Todos os Pokémon' : `Tipo: ${formatPokemonName(type)}`

  return <><section className="hero"><div><p className="eyebrow">EXPLORE O UNIVERSO POKÉMON</p><h1>Encontre seu<br/><em>Pokémon favorito.</em></h1><p className="hero-copy">Explore informações, atributos e habilidades de cada Pokémon em um só lugar.</p></div><div className="hero-orb">✦</div></section><section className="controls"><label className="search-box"><Search size={20}/><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Busque por nome ou número..."/><kbd>⌘ K</kbd></label><label className="select"><SlidersHorizontal size={17}/><select value={order} onChange={event => setOrder(event.target.value as Order)}><option value="number">Ordenar: Número</option><option value="name">Ordenar: Nome</option><option value="attack">Ordenar: Attack</option><option value="defense">Ordenar: Defense</option></select></label></section><div className="type-filter">{TYPES.map(item => { const color = item === 'all' ? '#354fc1' : getTypeColor(item); const active = type === item; return <button key={item} onClick={() => setType(item)} className={active ? 'selected' : ''} style={{ backgroundColor: active ? color : `${color}22`, borderColor: active ? color : `${color}44`, color: active ? '#fff' : color }}>{item === 'all' ? 'Todos' : item}</button> })}</div><div className="section-title"><div><p className="eyebrow">POKÉDEX</p><h2>{title}</h2></div><span>{query ? `${items.length} encontrado${items.length === 1 ? '' : 's'}` : `Página ${page + 1}`}</span></div>{loading ? <LoadingState/> : error ? <ErrorState text={error}/> : sorted.length ? <div className="pokemon-grid">{sorted.map(pokemon => <PokemonCard key={pokemon.id} pokemon={pokemon} favorite={isFavorite(pokemon.id)} onFavorite={() => toggle(pokemon.id)} onSelect={() => setSelected(pokemon)}/>)}</div> : <EmptyState text={query ? 'Não encontramos nenhum Pokémon com essa busca.' : 'Não há Pokémon neste filtro.'}/>} {!query && <div className="pagination"><button disabled={page === 0 || loading} onClick={() => setPage(value => value - 1)}><ChevronLeft size={18}/> Anterior</button><span>{page + 1}</span><button disabled={loading} onClick={() => setPage(value => value + 1)}>Próxima <ChevronRight size={18}/></button></div>}{selected && <PokemonModal initialPokemon={selected} isFavorite={isFavorite} onFavorite={toggle} onClose={() => setSelected(null)}/>}</>
}
