<script setup lang="ts">
import { ref } from 'vue'
import disconnected from '../assets/disconnected.png'
//import google from '../assets/google.png'
import draw from '../assets/draw.png'
import anon from '../assets/anon.png'
import jwtDecode from 'jwt-decode'

interface User {
  name: string
  email: string
  picture: string
}

const loggedUser = ref({
  name: 'Login richiesto',
  email: 'utilizza il bottone qui sotto',
  picture: anon
} as User)

// this gotta be defined globally otherwise the stupid shitty google button will complain
const onLoggedIn = (user: any) => {
  let decodedUser = jwtDecode(user.credential) as any
  loggedUser.value.name = decodedUser.name
  loggedUser.value.email = decodedUser.email
  loggedUser.value.picture = decodedUser.picture
}

globalThis.onLoggedIn = onLoggedIn

function logout()
{
  //todo: implement store logout
  loggedUser.value.name = 'Login richiesto'
  loggedUser.value.email = 'utilizza il bottone qui sotto'
  loggedUser.value.picture = anon
}

</script>

<template>
  <div id="login-panel">
    <form @click="(e) => e.preventDefault()">
      <img :src="loggedUser.picture">
      <h2>{{loggedUser.name}}</h2>
      <h3>{{loggedUser.email}}</h3>
      <button id="g_id_onload" data-client_id="492968160586-kg62g4k23mldd1pucbc0k9o4saq8p79q.apps.googleusercontent.com"
        data-context="signin" data-ux_mode="popup" data-callback="onLoggedIn" data-auto_prompt="false">
      </button>

      <button class="g_id_signin" data-type="standard" data-shape="rectangular" data-theme="outline"
        data-text="signin_with" data-size="large" data-logo_alignment="left">
      </button>
      <button><img :src="draw">Apri Lavagna</button>
      <button @click="logout"><img :src="disconnected">Logout</button>
    </form>
  </div>
</template>

<style scoped>
#login-panel {
  text-align: center;
  position: absolute;
  background: #fafafa;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  padding: 25px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  min-height: 400px;
  min-width: 350px;
}

form img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin: auto;
  margin-bottom: 10px;
}

form button {
  position: initial;
  background: #fafafa;
  min-width: 70%;
  display: block;
  border: none;
  border-radius: 10px;
  margin: 20px auto 0 auto;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

.container, iframe button
{
  background: #fafafa;
  min-width: 70%;
  display: block;
  border: none;
  border-radius: 10px;
  margin: 20px auto 0 auto;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

#g_id_signin {
  background: #fafafa;
  min-width: 70%;
  display: block;
  border: none;
  border-radius: 10px;
  margin: 20px auto 0 auto;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
}

button img {
  width: 30px;
  height: 30px;
  margin-top: 10px;
  display: inline;
  vertical-align: middle;
  margin-right: 5px;
}

h2 {
  font-size: 1.5em;
  font-weight: bold;
  margin: 0;
  padding: 0;
}

@media (max-width: 600px) {
  #login-panel {
    min-width: 80%;
    min-height: 60%;
  }
}
</style>
