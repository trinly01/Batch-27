<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
      </q-avatar>

      <q-toolbar-title>GeoMap</q-toolbar-title>

      <q-btn flat round dense icon="map" />
    </q-toolbar>
      <l-map
      ref="myMap"
      :zoom="zoom"
      :center="center"
      :options="mapOptions"
      style="height: calc(100vh - 50px);">
        <l-tile-layer

          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />
        <l-marker :lat-lng="center" >
          <l-icon
          :icon-size="[32, 32]"
          :icon-url="icon"/>
        </l-marker>
      </l-map>
  </div>
</template>

<script>
import 'leaflet/dist/leaflet.css'
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css'
import L from 'leaflet'
import 'leaflet-routing-machine'
import { LMap, LTileLayer, LMarker, LIcon } from 'vue2-leaflet'
export default {
  components: {
    LMap,
    LTileLayer,
    LMarker,
    LIcon
  },
  beforeDestroy () {
    navigator.geolocation.clearWatch(this.positionWatcher)
  },
  mounted () {
    console.log('Hi hello')
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0
    }
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords
      const mapObject = this.$refs.myMap.mapObject
      L.Routing.control({
        waypoints: [
          L.latLng(latitude, longitude),
          L.latLng(16.3215969, 120.3671083)
        ]
      }).addTo(mapObject)
      this.setLocation(pos)
    }, this.locationError, options)
    this.positionWatcher = navigator.geolocation.watchPosition(this.setLocation, this.locationError, options)
  },
  data () {
    return {
      icon: require('src/assets/marker.png'),
      positionWatcher: null,
      zoom: 13,
      center: L.latLng(47.41322, -1.219482),
      mapOptions: {
        zoomSnap: 0.5
      }
    }
  },
  methods: {
    setLocation (pos) {
      console.log('hello', L)
      const { latitude, longitude } = pos.coords
      this.center = L.latLng(latitude, longitude)
    },
    locationError () {}
  }
}
</script>
