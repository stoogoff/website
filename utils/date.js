
export const zulu = (date = null) => (date || new Date()).toISOString().substring(0, 19) + 'Z'
