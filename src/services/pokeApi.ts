import type { Pokemon, PokemonListResponse } from '../types/pokemon'
const API = 'https://pokeapi.co/api/v2'
const cache = new Map<string, Pokemon>()

async function request<T>(path: string): Promise<T> {
  const response = await fetch(`${API}${path}`)
  if (!response.ok) throw new Error(response.status === 404 ? 'Pokémon não encontrado.' : 'Não foi possível conectar à PokéAPI.')
  return response.json() as Promise<T>
}
export async function getPokemon(identifier: string | number) {
  const key = String(identifier).toLowerCase()
  if (!cache.has(key)) cache.set(key, await request<Pokemon>(`/pokemon/${key}`))
  return cache.get(key)!
}
export async function getPokemonPage(offset: number, limit: number) { return request<PokemonListResponse>(`/pokemon?offset=${offset}&limit=${limit}`) }
export async function getTypePokemon(type: string) { return request<{ pokemon: { pokemon: { name: string } }[] }>(`/type/${type}`) }
