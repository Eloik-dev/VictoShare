import { useState } from "react";

const useRequest = () => {
    const [error, setError] = useState<Error | null>(null);

    const get = async (url: string, config: HeadersInit = {}) => {
        setError(null);

        try {
            const response = await fetch(url, { ...config, method: 'GET' });
            if (!response.ok) {
                throw new Error(`Erreur: ${response.status}`);
            }
            return await response.json();
        } catch (err) {
            setError(err as Error);
            throw err;
        }
    };

    const post = async (url: string, formData: FormData, config: HeadersInit = {}) => {
        setError(null);

        try {
            const response = await fetch(url, {
                ...config,
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error(`Erreur: ${response.status}`);
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

