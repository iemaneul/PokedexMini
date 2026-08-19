import { getTypeColor } from '../utils/pokemon'
export function TypeBadge({ type }: { type: string }) { return <span className="type" style={{ backgroundColor: getTypeColor(type) }}>{type}</span> }
