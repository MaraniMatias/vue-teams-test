import http from './http'

const BASE_URL = 'https://api.collegefootballdata.com/teams'

export const get = async (params = {}) => {
  try {
    return await http.get(BASE_URL, { params })
  } catch (err) {
    return { error: 'No pudimos listar los equipos' }
  }
}
