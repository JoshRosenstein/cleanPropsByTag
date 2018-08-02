
export default function memoize(fn) {
  const cache = {}
  return (tag,prop) => {
    const key = JSON.stringify(tag+prop)
    if (cache[key] === undefined) cache[key] = fn(tag,prop)
    return cache[key]
  }
}
