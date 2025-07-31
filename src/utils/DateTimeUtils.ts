/**
 * Classe utilitaire pour manipuler les dates
 */
export default class DateTimeUtils {
    /**
     * Convertit une date en string formatté 
     * @param date
     * @returns La date convertie en string
     */
    static getDateTimeString(date: Date): string {
        const options: Intl.DateTimeFormatOptions = {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
        };

        return date.toLocaleString('fr-FR', options);
    }

    /**
     * Calcule le temps restant avant une date
     * @param date 
     * @returns Le temps restant avant la date en string
     */
    static getTimeUntilString(date: Date) {
        const now = new Date();
        const diff = date.getTime() - now.getTime();
        const minutes = Math.floor(diff / 1000 / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const weeks = Math.floor(days / 7);

        if (diff < 0) {
            return 'A l\'instant';
        }

        if (weeks > 0) {
            return `${weeks} semaine${weeks > 1 ? 's' : ''}`;
        }

        if (days > 0) {
            return `${days} jour${days > 1 ? 's' : ''}`;
        }

        if (hours > 0) {
            return `${hours} heure${hours > 1 ? 's' : ''}`;
        }

        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    }
}
