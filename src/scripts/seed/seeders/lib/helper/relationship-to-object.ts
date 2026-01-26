export function relationshipIsObject<T>(relationship: string | T): relationship is T {
  return typeof relationship !== 'string'
}
