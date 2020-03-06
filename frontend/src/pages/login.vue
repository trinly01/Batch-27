<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #F6F6F6;">
    <q-page class="column flex flex-center">
      <img alt="Quasar logo"
      class="q-ma-md"
      style="max-width: 300px;"
      src="~assets/logo.jpg">
      <div class="q-gutter-md">
        <!-- <div class="row justify-center">or</div> -->
        <div class="row">
          <q-btn
          class="q-mr-sm"
          icon="phone"
          label="phone"
          color="accent"
          rounded
          outline />
          <q-btn
          icon="email"
          label="email"
          color="accent"
          rounded
          outline />
        </div>
        <div class="row">
          <q-btn
          @click="$router.push('register')"
          label="Log in with Twitter"
          icon="fab fa-twitter"
          class="full-width"
          color="primary"
          rounded
          outline/>
        </div>
      </div>
    </q-page>
  </q-layout>
</template>
