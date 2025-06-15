export function debounce(fn: Function, ms = 300) {
  let t: NodeJS.Timeout
  return (...args: any[]) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms) }
}