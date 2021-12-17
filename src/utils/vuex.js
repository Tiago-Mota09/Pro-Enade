export const set = property => (state, payload) => (state[property] = payload)
export const get = property => state => state[property]
export const toggle = property => state => (state[property] = !state[property])
