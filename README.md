# VictoShare
Application web pour le partage rapide de liens hypertextes et de fichiers à l'aide d'un URL raccourci.

### Installation

- ll faut minimalement les installations suivantes (idéalement dans un système Linux) : 
	1. PHP 8.x
	2. Node v22.x
	3. NPM v10.9.x.
	4. Serveur MySQL (dernière version)
	5. Composer (dernière version)
- Le partage de plusieurs fichiers requiert d'activer l'extension **zip** dans le php.ini de votre version.
- Il est également important d'augmenter la valeur **post_max_size** du php.ini
- Configurez vos variables d'environnement dans le .env du dossier **/api**.
- Exécuter les commandes suivantes :
	1. (/) npm install
	2. (/api) composer install
	3. (/api) php artisan migrate
	4. (/api) php artisan key:generate

### Exécution
- L'application web est exécutable avec **npm run dev**.
- L'API Laravel est démarrée avec **php artisan serve**.
- Pour le déploiement en production, un dossier **/dist** est créé avec **npm run build**.
- L'exécution des tests unitaires et fonctionnels se fait avec **./vendor/bin/phpunit** à partir du dossier **/api**
<img width="482" height="77" alt="image" src="https://github.com/user-attachments/assets/ceddb896-5ca2-46cb-97cd-c7d6a532aaec" />
