## Demo-kod för en klient som kommunicerar med ett REST API

Det här är en enkel webbsida som erbjuder en inloggning mot ett REST API som kör på http://localhost:3000 och har en POST-route `/login`. Om inloggningen lyckas används resultatet från inloggninen som _BEARER token_ vid efterföljande GET-request till `/users`. Den requesten triggas av ett tryck på knappen _Hämta användare_. När responset för den requesten kommer så skrivs användarna ut i sidan.

Koden förutsätter att `GET /users` returnerar en array med user-objekt och att en `user` som returneras från APIet ser ut på föjande sätt:

```
{
  username: "ett username",
  name: "ett namn",
  email: "en epostadress"
}
```

### Förutsättningar

För att sidan ska fungera som tänkt måste du ha ett REST API körandes på http://localhost:3000 som svarar på `POST /login` och `GET /users`
