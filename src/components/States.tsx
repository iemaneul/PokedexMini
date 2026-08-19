import { AlertCircle, Inbox, LoaderCircle } from 'lucide-react'
export function LoadingState() { return <div className="state"><LoaderCircle className="spinner" size={32}/><p>Carregando Pokémon...</p></div> }
export function EmptyState({ text = 'Nenhum Pokémon encontrado.' }: { text?: string }) { return <div className="state"><Inbox size={34}/><p>{text}</p></div> }
export function ErrorState({ text }: { text: string }) { return <div className="state error"><AlertCircle size={34}/><p>{text}</p></div> }
