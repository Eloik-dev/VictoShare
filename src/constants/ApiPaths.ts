const BASE_API_PATH = "http://localhost:8000/api";

export const ApiPaths = {
    resource: {
        get: `${BASE_API_PATH}/resource`,
        generate: `${BASE_API_PATH}/resource/generate`,
        access: `${BASE_API_PATH}/resource/access`,
    },
    auth: {
        login: `${BASE_API_PATH}/auth/login`,
        register: `${BASE_API_PATH}/auth/register`,
    }
};