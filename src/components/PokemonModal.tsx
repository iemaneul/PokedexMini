import { useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight, Ruler, Weight, X } from 'lucide-react'
import type { Pokemon } from '../types/pokemon'
import { getPokemon } from '../services/pokeApi'
import { FavoriteButton } from './FavoriteButton'
import { StatBar } from './StatBar'
import { TypeBadge } from './TypeBadge'
import { formatPokemonName, getTypeColor } from '../utils/pokemon'

interface Props { initialPokemon: Pokemon; isFavorite: (id: number) => boolean; onFavorite: (id: number) => void; onClose: () => void }
export function PokemonModal({ initialPokemon, isFavorite, onFavorite, onClose }: Props) {
  const [pokemon, setPokemon] = useState(initialPokemon)
  const [moving, setMoving] = useState(false)
  useEffect(() => { setPokemon(initialPokemon) }, [initialPokemon])
  useEffect(() => { const close = (event: KeyboardEvent) => event.key === 'Escape' && onClose(); window.addEventListener('keydown', close); return () => window.removeEventListener('keydown', close) }, [onClose])
  const move = async (id: number) => { if (id < 1) return; setMoving(true); try { setPokemon(await getPokemon(id)) } finally { setMoving(false) } }
  const mainColor = getTypeColor(pokemon.types[0]?.type.name || '')
  const totalStats = pokemon.stats.reduce((total, stat) => total + stat.base_stat, 0)
  return <div className="modal-backdrop" role="presentation" onMouseDown={onClose}><section className="pokemon-modal" role="dialog" aria-modal="true" aria-label={`Detalhes de ${pokemon.name}`} onMouseDown={event => event.stopPropagation()}><button className="modal-close" onClick={onClose} aria-label="Fechar detalhes"><X size={21}/></button><div className="detail-card"><div className="detail-image"><span>#{String(pokemon.id).padStart(3, '0')}</span><img src={pokemon.sprites.other['official-artwork'].front_default || ''} alt={pokemon.name}/></div><div className="detail-content"><div className="detail-top"><div><p className="eyebrow">DADOS DO POKÉMON</p><div className="pokemon-name-row"><h1>{formatPokemonName(pokemon.name)}</h1><div className="types">{pokemon.types.map(type => <TypeBadge key={type.type.name} type={type.type.name}/>)}</div></div></div><FavoriteButton active={isFavorite(pokemon.id)} onClick={() => onFavorite(pokemon.id)}/></div><div className="measurements"><div><Ruler/><span>Altura<b>{(pokemon.height / 10).toFixed(1)} m</b></span></div><div><Weight/><span>Peso<b>{(pokemon.weight / 10).toFixed(1)} kg</b></span></div></div><div className="stats-panel"><div className="stats-heading"><h2>Estatísticas base</h2><span>Total <b>{totalStats}</b></span></div>{pokemon.stats.map(stat => <StatBar key={stat.stat.name} name={stat.stat.name} value={stat.base_stat} color={mainColor}/>)}</div></div></div><div className="detail-nav"><button onClick={() => move(pokemon.id - 1)} disabled={pokemon.id === 1 || moving}><ChevronLeft/> Pokémon anterior</button><button onClick={() => move(pokemon.id + 1)} disabled={moving}>Próximo Pokémon <ChevronRight/></button></div></section></div>
}
