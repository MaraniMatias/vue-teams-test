/**
 * Ordena un array de equipos según una propiedad
 * @param {String} orderKey Propiciad del equipo usada para comparar
 * @param {Team[]} items Array de equipos (Team)
 */
export default function (orderKey, items) {
  return items.sort((teamA, teamB) => {
    if (teamA[orderKey] < teamB[orderKey]) {
      return -1
    }
    if (teamA[orderKey] > teamB[orderKey]) {
      return 1
    }
    return 0
  })
}
