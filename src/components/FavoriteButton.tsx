import { Heart } from 'lucide-react'
export function FavoriteButton({ active, onClick }: { active: boolean; onClick: () => void }) { return <button className={`favorite ${active ? 'active' : ''}`} onClick={onClick} aria-label={active ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}><Heart size={19} fill={active ? 'currentColor' : 'none'} /></button> }
