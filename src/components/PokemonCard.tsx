import type { Pokemon } from '../types/pokemon'
import { TypeBadge } from './TypeBadge'
import { FavoriteButton } from './FavoriteButton'
import { formatPokemonName } from '../utils/pokemon'
export function PokemonCard({ pokemon, favorite, onFavorite, onSelect }: { pokemon: Pokemon; favorite: boolean; onFavorite: () => void; onSelect: () => void }) {
 const stats = pokemon.stats.filter(s => ['hp', 'attack', 'defense'].includes(s.stat.name))
 return <article className="pokemon-card"><FavoriteButton active={favorite} onClick={onFavorite}/><button className="card-link" onClick={onSelect}><span className="number">#{String(pokemon.id).padStart(3, '0')}</span><img src={pokemon.sprites.other['official-artwork'].front_default || ''} alt={pokemon.name} loading="lazy"/><div className="card-title"><h2>{formatPokemonName(pokemon.name)}</h2><div className="types">{pokemon.types.map(t => <TypeBadge key={t.type.name} type={t.type.name}/>)}</div></div><div className="mini-stats">{stats.map(s => <span key={s.stat.name}><b>{s.base_stat}</b>{s.stat.name === 'hp' ? ' HP' : s.stat.name.slice(0, 3).toUpperCase()}</span>)}</div></button></article>
}
