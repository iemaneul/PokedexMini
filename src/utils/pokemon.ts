const typeColors: Record<string, string> = {
  normal: '#a6ab9f', fire: '#f18a59', water: '#5d91e8', grass: '#58b875', electric: '#e2b930',
  psychic: '#d9699d', ghost: '#7c6eb2', dark: '#5a596b', dragon: '#7166cf', fighting: '#c45a51',
  poison: '#a36bb4', ground: '#cda75a', flying: '#7b9eea', bug: '#9eae46', rock: '#b69b5b',
  steel: '#8799b4', ice: '#6dbdca', fairy: '#df87af'
}
export const getTypeColor = (type: string) => typeColors[type] || '#526bd6'
export const formatPokemonName = (name: string) => name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
