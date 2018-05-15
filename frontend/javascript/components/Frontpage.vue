<template>
<div>
  <div class="Form">
    <h4 class="title">Login</h4>
    <div class="Form__field">
      <label for="" class="label">Email</label>
      <input type="text" class="input" v-model="lEmail">
    </div>
    <div class="Form__field">
      <label for="" class="label">Password</label>
      <input type="password" class="input" v-model="lPassword">
      <div class="Form__status">
        <span class="is-error">{{ lError }}</span>
      </div>
    </div>
    <button class="Btn Btn--default" @click="login()">Login</button>
  </div>

  <div class="Form">
    <h4 class="title">Register</h4>
    <div class="Form__field">
      <label for="" class="label">Name</label>
      <input type="text" class="input" v-model="rName">
      <div class="Form__status">
        <span class="is-error">{{ rNameError }}</span>
      </div>
    </div>

    <div class="Form__field">
      <label for="" class="label">Email</label>
      <input type="text" class="input" v-model="rEmail">
      <div class="Form__status">
        <span class="is-error">{{ rEmailError }}</span>
      </div>
    </div>

    <div class="Form-field">
      <label for="" class="label">Password</label>
      <input type="password" class="input" v-model="rPassword">
      <div class="Form__status">
        <span class="is-error">{{ rPasswordError }}</span>
      </div>
    </div>

    <div class="Form__field">
      <label for="" class="label">Repeat Password</label>
      <input type="password" class="input" v-model="rRepeatPassword">
      <div class="Form__status">
        <span class="is-error">{{ rRepeatPasswordError }}</span>
      </div>
    </div>
    <button class="Btn Btn--default" @click="register()">Register</button>
  </div>


</div>


</template>

<script>
import axios from 'axios';

export default {
  data () {
    return {
      // registration state
      rName: "Didrik Fleischer",
      rNameError: "",

      rEmail: "didrik.fleischer@mail.com",
      rEmailError: "",

      rPassword: "password123",
      rPasswordError: "",  

      rRepeatPassword: "password123",
      rRepeatPasswordError: "",

      // login state
      lEmail: "didrik.fleischer@mail.com",
      lPassword: "password123",
      lError: "",


    }
  },
  methods: {
    register () {
      axios.post('/register', {
        name: this.rName,
        email: this.rEmail,
        password: this.rPassword,
        repeatPassword: this.rRepeatPassword,
      }).then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log(error)
      })
    },
    login () {
      axios.post('/login', {
        email: this.lEmail,
        password: this.lPassword,
      }).then((response) => {
        console.log(response)        
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}
</script>

<style>

</style>
