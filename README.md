# CREACOSM-Backend

Backend d'un module pour application Web, dans le cadre du projet de Systèmes d'Information, en Licence 3 MIAGE à l'Université d'Orléans.

## Routes API

### Commencer la partie

- POST : `/start-game` - démarre la partie et vérifie le code du groupe
  - Le header doit contenir :
    - `'Content-Type': 'application/json'`
  - Le body doit contenir :
    - `'code': '(code)'` avec (code) le numéro de partie rentré par les joueurs
  - Retourne le code 200 si tout va bien

### Récupérer les ingrédients

- POST : `/get-ingredients` - récupère les ingrédients utilisés pour cette partie
  - Le header doit contenir :
    - `'Content-Type': 'application/json'`
  - Le body doit contenir :
    - `'group': '(numGroupe)'` avec (numGroupe) le numéro de partie rentré par les joueurs
  - Retourne une string JSON, contenant une liste d'ingredients
    ```json
    [
      {
        "id": 8,
        "label": "parfum",
        "image": "image-url"
      },
      {
        "id": 1,
        "label": "beurre de karité",
        "image": "image-url"
      }
    ]
    ```

### Analyser un ingrédient

- POST : `/analyze-ingredient` - analyse un ingrédient et renvoie l'état après le test
  - Le header doit contenir :
    - `'Content-Type': 'application/json'`
  - Le body doit contenir :
    - `'group': '(numGroupe)'` avec (numGroupe) le numéro de partie rentré par les joueurs
    - `'ingredientId': '(id)'` avec (id) l'id de l'ingrédient à analyser
    - `'condition': '(condition)'` avec (condition) soit "température", soit "humidité", soit "luminosite"
    - `'value': '(value)'` avec (value) la valeur à tester
  - Retourne un objet json avec l'état de l'ingrédient après le test. Le résultat de l'analyse sera sauvegardé dans le tableau des découvertes :
    ```json
    {
      "text": "L'ingrédient se porte très bien"
    }
    ```

### Récupérer les indices découverts

- POST : `/get-discovered-table` - récupère la table des découvertes pour un ingrédient donné
  - Le header doit contenir :
    - `'Content-Type': 'application/json'`
  - Le body doit contenir :
    - `'group': '(numGroupe)'` avec (numGroupe) le numéro de partie rentré par les joueurs
    - `'ingredientId': '(id)'` avec (id) l'id de l'ingrédient pour lequel on veut obtenir le tableau des états découverts
  - Retourne une string JSON, contenant une liste d'objets avec condition (température, humidité ou luminosité), des bornes inf et sup, et un message
    ```json
    [
      {
        "condition": "température",
        "unit": "°C",
        "lowerBound": 0,
        "upperBound": 50,
        "message": "l'acide hyaluronique est stable"
      },
      {
        "condition": "température",
        "unit": "°C",
        "lowerBound": -500,
        "upperBound": 0,
        "message": "l'acide hyaluronique est gelé"
      }
    ]
    ```

### Récupérer les stockages

- POST : `/get-storages` - récupère les options de stockage
  - Retourne une string JSON, contenant une liste d'objets avec id et libellé
    ```json
    [
      {
        "id": 1,
        "label": "Frigo"
      },
      {
        "id": 2,
        "id": "Étagère"
      }
    ]
    ```

### Essayer une combinaison ingrédient - stockage

- POST: `/try-storage` - essaie de mettre un ingrédient dans un stockage pour validation finale
  - Le header doit contenir `'Content-Type': 'application/json'`
  - Le body doit contenir :
    - `'ingredientId': '(id)'` avec (id) l'id de l'ingrédient
    - `'storageId': '(id)'` avec (id) l'id du stockage
  - Retourne un object json avec correct: `true` ou `false` selon si l'ingrédient est à sa place ou non :
    ```json
    {
      "correct": true
    }
    ```

### Finir la partie

- POST : `/end-game` - termine la partie du groupe donné
  - Le header doit contenir :
    - `'Content-Type': 'application/json'`
  - Le body doit contenir :
    - `'code': '(code)'` avec (code) le numéro de partie rentré par les joueurs
  - Retourne le code 200 si tout va bien

## Crédits

Ceci est un projet universitaire, développé pendant la L3 MIAGE à l'Université d'Orléans.

Participants :

- [Esteban Draily](https://github.com/estelar9) (Front)
- [Koffi-Hild Gomado](https://github.com/hild365) (Front)
- [Vincent Gonnet](https://github.com/VincentGonnet) (Back)
- [Arthur Goudal](https://github.com/GOUDALArthur) (Front)
