<template>
  <q-layout view="lHh Lpr lFf" style="background-color: #F6F6F6;">
    <q-page class="q-pa-md">
      <div class="text-h4 q-pb-md">Welcome to Secret+</div>
      <div class="text-subtitle1">Personal Info</div>
      <q-input value="Trinmar Pogi" label="Name" />
      <div class="row q-gutter-md">
        <q-input
          class="col"
          mask="+966  ##  #######"
          fill-mask="x"
        label="Mobile No" value="" />
        <q-select
          style="min-width: 100px;"
          :options="['Male', 'Female']"
          behavior="menu"
        label="Gender" v-model="gender" />
      </div>
      <div class="text-subtitle1 q-pt-md q-pb-md">
        Preferred Therapist
      </div>
      <div class="row justify-center q-gutter-md text-grey">
        <q-btn rounded style="width: 100px;" color="accent" outline icon="fas fa-male" label="Male" stack class="q-pa-sm" />
        <q-btn rounded style="width: 100px;" color="accent" flat icon="fas fa-female" label="Female" stack class="q-pa-sm" />
        <q-btn rounded style="width: 100px;" color="accent" flat class="q-pa-sm" >
          <div class="row">
            <q-icon size="xs" name="fas fa-female" />
            <q-icon size="sm" name="fas fa-male" />
          </div>
          ANY
        </q-btn>
      </div>
      <div class="row justify-center q-gutter-md q-pt-md text-grey">
        <q-btn rounded style="width: 100px;" color="accent" outline icon="far fa-hand-paper" label="Small" stack class="q-pa-sm" />
        <q-btn rounded style="width: 100px;" color="accent" flat icon="fas fa-hand-paper" label="Big" stack class="q-pa-sm" />
      </div>
      <div class="text-subtitle1 q-pt-md">
        Hand pressure
      </div>
      <div class="q-ma-lg q-pl-md q-pr-md">
        <q-slider
          :label-value="`${pressureLevel}`"
          label-always
          color="accent"
          v-model="pressure"
          markers
          :min="1"
          :max="3"
        />
      </div>
    </q-page>
    <q-footer>
      <q-toolbar style="background-color: #F6F6F6;" class="justify-center q-pa-md" >
        <q-btn @click="$router.push('booking')" size="md" rounded color="accent" label="continue" style="width: 250px;" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
export default {
  data: () => ({
    gender: '',
    pressure: 1,
    level: ['LIGHT', 'MEDIUM', 'HARD']
  }),
  computed: {
    pressureLevel () {
      return this.level[this.pressure - 1]
    }
  }
}
</script>
