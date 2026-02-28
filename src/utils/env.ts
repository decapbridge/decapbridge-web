export const env = (key: string): string | undefined => {
  return (typeof window !== 'undefined' && (window as any).__ENV__?.[key]) || import.meta.env[key]
}
