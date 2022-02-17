# Développez une interface utilisateur pour une application web Python

### Principe du projet
Une application web permettant de visualiser en temps réel
un classement de films intéressants.

### Lancer le serveur
Cloner le dépôt du serveur avec cette ligne de commande:
```
 git clone https://github.com/OpenClassrooms-Student-Center/OCMovies-API-EN-FR.git server-API
```
Pour démarrer le serveur, créer et lancer l'environnement virtuel 
depuis le dossier server-API

### Windows

La création d'un environnement virtuel est faite en exécutant la commande venv :
```
 python -m venv \path\to\new\virtual\env
````
Pour commencer à utiliser l’environnement virtuel, il doit être activé :
```
 env\Scripts\activate
````

### Unix

La création d'un environnement virtuel est faite en exécutant la commande venv :
```
 python3 -m venv env
````
Pour commencer à utiliser l’environnement virtuel, il doit être activé :
```
source env/bin/activate
````

### Installation du serveur
Une fois dans l'environnement virtuel, intallez les dépendances de projets
en exécutant la commande suivante :
```
 pip install -r requirements.txt
````

Ensuite créer et alimenter la base de données avec la commande :
##### Windows
```
 python manage.py create_db
````
##### Unix
```
 python3 manage.py create_db
````

Démarrer le serveur avec la commande :
##### Windows
```
 python manage.py runserver
````
##### Unix
```
 python3 manage.py runserver
````
