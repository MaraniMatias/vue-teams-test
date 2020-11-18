/**
 * Filter un array de equipos según una palabra, comparando mascota y escuela
 * @param {String} query Palabra base para compara
 * @param {Team[]} items Array de equipos (Team)
 */
export default function (query, items) {
  const q = query.toLowerCase()
  return items.filter((team) => {
    const mascot = team.mascot?.toLowerCase() || ''
    const school = team.school?.toLowerCase() || ''
    return mascot.includes(q) || school.includes(q)
  })
}
