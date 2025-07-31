/**
 * Constantes pour les routes de l'API
 */

const BASE_PATH = "http://localhost:8000";
const BASE_API_PATH = `${BASE_PATH}/api`;

export const ApiPaths = {
    csrf: `${BASE_PATH}/sanctum/csrf-cookie`,
    resource: {
        get: `${BASE_API_PATH}/resource`,
        getAll: `${BASE_API_PATH}/resource/all`,
        history: `${BASE_API_PATH}/resource/history`,
        generate: `${BASE_API_PATH}/resource/generate`,
        access: `${BASE_API_PATH}/resource/access`,
    },
    auth: {
        user: `${BASE_API_PATH}/auth`,
        login: `${BASE_API_PATH}/auth/login`,
        register: `${BASE_API_PATH}/auth/register`,
        logout: `${BASE_API_PATH}/auth/logout`,
    }
};