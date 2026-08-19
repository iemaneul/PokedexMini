import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, ChevronLeft, ChevronRight, Ruler, Weight } from 'lucide-react'
import type { Pokemon } from '../types/pokemon'
import { getPokemon } from '../services/pokeApi'
import { TypeBadge } from '../components/TypeBadge'
import { FavoriteButton } from '../components/FavoriteButton'
import { ErrorState, LoadingState } from '../components/States'
import { StatBar } from '../components/StatBar'
import { useFavorites } from '../hooks/useFavorites'
export function DetailPage() { const { name = '' } = useParams(); const navigate = useNavigate(); const [pokemon,setPokemon]=useState<Pokemon|null>(null),[error,setError]=useState(''); const {toggle,isFavorite}=useFavorites()
 useEffect(()=>{ let alive=true; setPokemon(null); setError(''); getPokemon(name).then(p=>alive&&setPokemon(p)).catch(e=>alive&&setError(e.message)); return()=>{alive=false} },[name])
 if(error)return <><Link className="back" to="/"><ArrowLeft size={18}/> Voltar para a Pokédex</Link><ErrorState text={error}/></>; if(!pokemon)return <LoadingState/>;
 const change=(id:number)=>navigate(`/pokemon/${Math.max(1,id)}`)
 return <section className="detail"><button className="back" onClick={()=>navigate(-1)}><ArrowLeft size={18}/> Voltar</button><div className="detail-card"><div className="detail-image"><span>#{String(pokemon.id).padStart(3,'0')}</span><img src={pokemon.sprites.other['official-artwork'].front_default||''} alt={pokemon.name}/></div><div className="detail-content"><div className="detail-top"><div><p className="eyebrow">DADOS DO POKÉMON</p><h1>{pokemon.name}</h1><div className="types">{pokemon.types.map(t=><TypeBadge key={t.type.name} type={t.type.name}/>)}</div></div><FavoriteButton active={isFavorite(pokemon.id)} onClick={()=>toggle(pokemon.id)}/></div><div className="measurements"><div><Ruler/><span>Altura<b>{(pokemon.height/10).toFixed(1)} m</b></span></div><div><Weight/><span>Peso<b>{(pokemon.weight/10).toFixed(1)} kg</b></span></div></div><div className="stats-panel"><h2>Estatísticas base</h2>{pokemon.stats.map(s=><StatBar key={s.stat.name} name={s.stat.name} value={s.base_stat}/>)}</div></div></div><div className="detail-nav"><button onClick={()=>change(pokemon.id-1)} disabled={pokemon.id===1}><ChevronLeft/> Pokémon anterior</button><button onClick={()=>change(pokemon.id+1)}>Próximo Pokémon <ChevronRight/></button></div></section> }
