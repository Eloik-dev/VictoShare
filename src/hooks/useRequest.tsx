import { useState } from "react";

const useRequest = () => {
    const [error, setError] = useState<Error | null>(null);

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

    return { get, post, error };
};

export default useRequest;

