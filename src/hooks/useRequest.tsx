import { useState } from "react";

/**
 * Hook pour accéder à la gestion des requêtes HTTP 
 */
const useRequest = () => {
    const [error, setError] = useState<Error | null>(null);

    /**
     * Fait une requête GET
     * @param url L'url de la requête
     * @param config La configuration de la requête
     * @returns Le JSON de la réponse
     */
    const get = async (url: string, config: HeadersInit = {}) => {
        setError(null);

        try {
            const response = await fetch(url, {
                ...config,
                credentials: 'include',
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.status >= 500) {
                throw new Error(`Erreur lors de la requête: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    };

    /**
     * Fait une requête POST
     * @param url L'url de la requête
     * @param data Les données de la requête
     * @param config La configuration de la requête
     * @returns Le JSON de la réponse
     */
    const post = async (url: string, data: any = {}, config: HeadersInit = {}) => {
        setError(null);

        try {
            const response = await fetch(url, {
                ...config,
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
                body: data instanceof FormData ? data : JSON.stringify(data),
            });

            if (response.status >= 500) {
                throw new Error(`Erreur lors de la requête: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    };

    /**
     * Fait une requête DELETE
     * Je ne peux pas appeler la fonction delete car le terme est réservé
     * 
     * @param url L'url de la requête
     * @param config La configuration de la requête
     * @returns Le JSON de la réponse
     */
    const remove = async (url: string, config: HeadersInit = {}) => {
        setError(null);

        try {
            const response = await fetch(url, {
                ...config,
                method: 'DELETE',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                },
            });

            if (response.status >= 500) {
                throw new Error(`Erreur lors de la requête: ${response.status}`);
            }

            return await response.json();
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    };

    return { get, post, remove, error };
};

export default useRequest;