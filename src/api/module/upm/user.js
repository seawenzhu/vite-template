import http from '@/api/index.js'
const baseUrl = '/upm/smart-user'

const createUser = (data) => {
    return http.post(baseUrl, data)
}
const updateUser = (id, data) => {
    return http.put(`${baseUrl}/${id}`, data)
}

const deleteUser = (id) => {
    return http.delete(`${baseUrl}/${id}`)
}

const getUser = (id) => {
    return http.get(`${baseUrl}/${id}`)
}
/**
 * pageRequest 具体写法参考 @/api/readme.md
 * @param pageStart
 * @param pageSize
 * @param pageRequest
 * @returns {Promise<AxiosResponse<any>>}
 */
const pageUser = (pageStart, pageSize, pageRequest) => {
    return http.post(`${baseUrl}/page?pageStart=${pageStart}&pageSize=${pageSize}`, pageRequest)
}

const batchDeleteUser = (ids) => {
    return http.delete(`${baseUrl}/batch/delete`, {data: ids})
}

const updateUserEnabled = (id, enabled=false) => {
    return http.put(`${baseUrl}/${id}/enabled?enabled=${enabled}`)
}
const checkExistsByUsername = (username) => {
    return http.get(`${baseUrl}/exist/username?username=${username}`)
}
const resetUserPassword = (id, password) => {
    return http.put(`${baseUrl}/${id}/password/reset?password=${password}`)
}

export default {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    pageUser,
    batchDeleteUser,
    updateUserEnabled,
    checkExistsByUsername,
    resetUserPassword,
}
