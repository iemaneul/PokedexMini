export interface PokemonType { slot: number; type: { name: string } }
export interface PokemonStat { base_stat: number; stat: { name: string } }
export interface Pokemon { id: number; name: string; height: number; weight: number; types: PokemonType[]; stats: PokemonStat[]; sprites: { other: { 'official-artwork': { front_default: string | null } } } }
export interface PokemonListItem { name: string; url: string }
export interface PokemonListResponse { results: PokemonListItem[]; count: number }
