<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #FFFFFF;">
    <q-page class="column flex flex-center text-blue-grey-8 q-pa-lg">
      <div class="text-h4 q-pb-md">
        Hello
        <span class="text-accent">Trinmar</span>!
      </div>
      <div>Address</div>
      <div class="text-accent text-center" >
        Metal Industry Research & Deelopment Center, MIRDC Compound, Taguig, Paranaque 1633, Philippines
      </div>
      <img alt="Quasar logo"
      class="q-ma-md"
      style="max-width: 300px;"
      src="~assets/massage.png">
      <div class="q-pb-md">
        I want a massage
      </div>
      <div class="row q-gutter-md q-pb-sm">
        <div class="row items-center">
          for &nbsp;
          <q-select
            label-color="accent"
            style="width: 90px;"
            dense
            :options="['1 person', '2 people']"
          behavior="menu" v-model="pax" >
            <template v-slot:selected-item="scope">
              <span class="text-accent" >{{ scope.opt }}</span>
            </template>
          </q-select>
        </div>
        <div class="row items-center">
          for &nbsp;
          <q-select
            style="width: 90px;"
            dense
            :options="[
              '1 hour',
              '1½ hours',
              '2 hours'
            ]"
          behavior="menu" v-model="duration" >
            <template v-slot:selected-item="scope">
              <span class="text-accent" >{{ scope.opt }}</span>
            </template>
          </q-select>
        </div>
      </div>
      <q-select
        style="width: 150px;"
        dense
        :options="[]"
      behavior="menu" v-model="time" >
        <template v-slot:selected-item="scope">
          <span class="text-accent" >Today, {{ scope.opt }}</span>
        </template>
        <q-popup-proxy @before-show="proxTime = time" transition-show="scale" transition-hide="scale">
          <q-time
            mask="hh[:]mm[ ]A"
            :minute-options="[0, 15, 30, 45]"
          v-model="proxTime">
            <div class="row items-center justify-end q-gutter-sm">
              <q-btn label="Cancel" color="primary" flat v-close-popup />
              <q-btn label="OK" color="primary" v-close-popup flat @click="time = proxTime" />
            </div>
          </q-time>
        </q-popup-proxy>
      </q-select>
      <q-input style="max-width: 500px; max-height: 120px;"
        hint="Booking for others? Enter name and phone number"
      class="full-width q-pa-md" type="textarea" label=" remarks"></q-input>
    </q-page>
    <q-footer>
      <q-toolbar style="background-color: #F6F6F6;" class="justify-center q-pa-md" >
        <q-btn @click="$router.push('booking')"
          size="md"
          rounded
          color="accent"
          label="book"
        style="width: 250px;" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { format } from 'date-fns'

export default {
  data: () => ({
    pax: '1 person',
    duration: '1 hour',
    time: format(new Date(), 'KK:mm b'),
    proxTime: format(new Date(), 'KK:mm b')
  })
}
</script>
