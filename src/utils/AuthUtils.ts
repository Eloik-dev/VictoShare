/**
 * Classe utilitaire pour la gestion de l'authentification
 */
export default class AuthUtils {

    static EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    /**
     * Valide si un courriel est au format valide
     * @param email L'adresse courriel à valider
     * @returns Vrai si le courriel est au format valide
     */
    static isEmailValid(email: string): boolean {
        return this.EMAIL_REGEX.test(email);
    }
}

