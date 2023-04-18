// Det här exemplet använder ett REST API på en lokal server.
//  Koden förutsätter att REST APIet har två endpoints (routes):
//  POST /login och GET /users.

// För att köra den här sidan lokalt behöver du starta en server
// innan du kan använda den.
// Kör din server på en annan port än 3000 så ändra i värdet på API_URL nedan.

const API_URL = "http://localhost:3000"
let token // Variabel för att spara token från inloggning.

const loginMessage = document.getElementById("login-message")

// Eventlistener för att lyssna på knappen för att logga in.
document
  .getElementById("login-button")
  .addEventListener("click", async function (e) {
    e.preventDefault() // Förhindrar att sidan laddas om.
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value
    let loginResponse = await fetch(API_URL + "/login", {
      method: "POST",
      body: JSON.stringify({ username, password }),
    })
    //Om status är 200 (Ok), har inloggningen gått bra.
    if (loginResponse.status === 200) {
      let loginResponseData = await loginResponse.json()
      console.log("token från API", loginResponseData)

      token = loginResponseData // spara token från APIet i variabel
      document.getElementById("login-form").style.display = "none"
      loginMessage.innerHTML = "Inloggad"
      document.getElementById("users-container").style.display = "block"
    } else {
      // Om något gått fel och status inte är 200
      loginMessage.innerHTML = "Något gick fel"
    }
  })

// Eventlistener för att lyssna på knappen för att hämta användare.
document
  .getElementById("get-users-button")
  .addEventListener("click", async function (e) {
    //Hämta användare från API genom att göra GET på routen /users, med token i header
    let response = await fetch(API_URL + "/users", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token, //Skickar med token i header
      },
    })
    //Om status är 200 (Ok), skriv ut alla användare.
    if (response.status === 200) {
      let data = await response.json()

      console.log("users från API", data)

      let users = data
      let usersContainer = document.getElementById("users-container")

      usersContainer.innerHTML = "" //Rensa innehållet i users-container

      //Loopa igenom användarna och skriv ut dem i users-container
      for (let user of users) {
        usersContainer.insertAdjacentHTML(
          "beforeend",
          `<div>${user.username} - ${user.name} - ${user.email} </div>`
        )
      }
    } else if (response.status === 401) {
      //Om status är 401 (Unauthorized)
      loginMessage.innerHTML = "Du är inte inloggad"
    } else {
      // Om något annat gick fel
      loginMessage.innerHTML = "Något gick fel"
    }
  })
