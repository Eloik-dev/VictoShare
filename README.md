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
- Configurez vos variables d'environnement dans le .env du dossier **/api**.
- Exécuter les commandes suivantes :
		(/) npm install
		(/api) composer install
		(/api) php artisan migrate

### Exécution
- L'application web est exécutable avec **npm run dev**.
- L'API Laravel est démarrée avec **php artisan serve**.
- Pour le déploiement en production, un dossier **/dist** est créé avec **npm run build**.
- L'exécution des tests unitaires et fonctionnels se fait avec **./vendor/bin/phpunit** à partir du dossier **/api**