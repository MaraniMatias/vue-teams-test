function saveToLS() {
  localStorage.setItem('favorites', JSON.stringify(Array.from(items)))
}

/**
 * @returns {Map<Team>} team
 */
function loadFromLS() {
  const itemsOnLS = JSON.parse(localStorage.getItem('favorites') || '[]')
  return new Map(itemsOnLS)
}

const items = loadFromLS()

/**
 * @returns {Team[]} team
 */
export const getAll = () => Array.from(items)

/**
 * @param {Team} team
 * @param {String } comment comentario al guardar en favorito
 */
export const save = (team, comment) => {
  items.set(team.id, comment)
  saveToLS()
}

/**
 * @param {Number} teamId
 * @returns {Team} team
 */
export const getByID = (teamId) => items.get(teamId)

/**
 * @param {Number} teamId
 */
export const remove = (teamId) => {
  items.delete(teamId)
  saveToLS()
}

/**
 * @param {Number} teamId
 * @returns {Boolean} returns true is team has on LS
 */
export const has = (teamId) => items.has(teamId)