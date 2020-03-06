<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
      </q-avatar>

      <q-toolbar-title>Todos: {{todos.length}}</q-toolbar-title>

      <q-btn @click="downloadPDF" flat round dense icon="cloud_download" />
      <q-btn @click="openPDF" flat round dense icon="picture_as_pdf" />
      <q-btn v-show="!user" @click="register" flat round dense icon="person_add" />
      <q-btn v-show="!user" @click="login" flat round dense icon="fas fa-sign-in-alt" />
      <q-btn v-if="user" @click="logout" flat dense :label="user.email.split('@')[0]" icon="fas fa-sign-out-alt" />
    </q-toolbar>
    <!-- <input ref="n" v-model="task" type="text"> -->
    <div class="row q-ma-md q-gutter-sm">
      <!-- {{ user }} -->
      <q-input class="col" ref="n" v-model="task" label="Task" />
      <!-- <button @click="save">save</button> -->
      <div class="column justify-center">
        <q-btn :disable="task === ''" @click="save" round color="primary" icon="save" />
      </div>
    </div>
    <q-list bordered>
      <q-item clickable v-ripple v-for="(t, i) in todos" :key="i">
        <q-item-section side>
          <q-checkbox @click.native="todosSrvc.patch(t._id, { isDone: !t.isDone })" :value="t.isDone" />
        </q-item-section>
        <q-item-section v-if="i !== editingIndex">{{ t.desc }}</q-item-section>
        <q-item-section v-else>
          <input ref="draft" v-model="draft" type="text">
        </q-item-section>
        <q-item-section side >
          <div v-if="i !== editingIndex" class="row">
            <q-btn @click="edit(i)" size="sm" flat icon="edit" round />
            <q-btn @click="remove(i)" size="sm" flat icon="delete" round color="negative" />
          </div>
          <div v-else class="row">
            <q-btn @click="update(i)" :disable="t.desc === draft" size="sm" flat icon="save" color="positive" round />
            <q-btn @click="editingIndex = null" size="sm" flat icon="cancel" round color="negative" />
          </div>
        </q-item-section>
      </q-item>
    </q-list>
    <greet name="Trinmar Pogi" />
    <pie-chart :donut="true" :data="[
      ['Finished', finished.length],
      ['Unfinished', unfinished.length]
    ]"></pie-chart>
    <!-- <ol>
      <li v-for="(t, i) in todos" :key="i">
        <div v-if="i !== editingIndex">
          <span>{{ t }}</span>
          <button @click="edit(i)">edit</button>
          <button @click="remove(i)">x</button>
        </div>
        <div v-else>
          <input ref="draft" v-model="draft" type="text">
          <button @click="update(i)">save</button>
          <button @click="editingIndex = null">cancel</button>
        </div>
      </li>
    </ol> -->
  </div>
</template>

<style>
  /* .hello {
    background-color: aqua;
  }
  h1 {
    background-color: pink;
  } */
</style>

<script>
import greet from 'src/components/greet.vue'

export default {
  components: {
    greet
  },
  beforeDestroy () {
    this.todosSrvc.destroy()
  },
  mounted () {
    this.todosSrvc = this.$dbCon.wingsService('todos-auth')
    this.todosSrvc.on('dataChange', (tasks) => {
      this.todos = tasks
      console.log(tasks)
    }).init()
    this.$dbCon.on('login', (result) => {
      this.todosSrvc.reset()
      console.log('logged in', result)
      this.user = result.user
      this.$q.notify({
        type: 'positive',
        message: 'logged in'
      })
    })
    this.$dbCon.on('logout', () => {
      this.user = null
    })
    this.$dbCon.authenticate()
  },
  data () {
    return {
      user: null,
      todosSrvc: null,
      editingIndex: null,
      draft: '',
      count: 0,
      count2: 0,
      task: 'hello',
      todos: [
        {
          desc: 'add button',
          isDone: false
        },
        {
          desc: 'edit button',
          isDone: false
        }
      ]
    }
  },
  methods: {
    // increase () {
    //   this.count++ // this.count = this.count + 1
    //   // this.count += 1
    // },
    // increaseWith (x) {
    //   this.count2 += (x)
    // },
    register () {
      this.$dbCon.service('users').create({
        email: 'pogi@pogi.com',
        password: 'qwerty!@#$%'
      }).then(e => this.$q.notify({
        type: 'positive',
        message: 'Registered successfuly'
      })).catch(e => this.$q.notify({
        type: 'negative',
        message: 'email already used'
      }))
    },
    login () {
      this.$dbCon.authenticate({
        strategy: 'local',
        email: 'pogi@pogi.com',
        password: 'qwerty!@#$%'
      }).catch(e => this.$q.notify({
        type: 'negative',
        message: e.message
      }))
    },
    logout () {
      this.$dbCon.logout()
    },
    openPDF () {
      this.$pdfMake.createPdf({
        content: [
          {
            table: {
              body: [
                ['', 'Total'],
                ['Finished', this.finished.length],
                ['Unfinished', this.unfinished.length]
              ]
            }
          }
        ]
      }).open()
    },
    downloadPDF () {
      this.$pdfMake.createPdf({
        content: [
          {
            table: {
              body: [
                ['', 'Total'],
                ['Finished', this.finished.length],
                ['Unfinished', this.unfinished.length]
              ]
            }
          }
        ]
      }).download(`batch 27 - ${new Date()}`)
    },
    update (ind) {
      this.editingIndex = null
      this.todos[ind].desc = this.draft
    },
    edit (ii) {
      this.editingIndex = ii
      this.draft = this.todos[ii].desc
      setTimeout(() => this.$refs.draft[0].focus(), 0)
    },
    remove (ind) {
      this.todos.splice(ind, 1)
      console.log(this.todos)
    },
    save () {
      // this.todos.unshift({
      //   desc: this.task,
      //   isDone: false
      // })
      this.todosSrvc.create({
        desc: this.task,
        isDone: false
      })
      this.task = ''
      this.$refs.n.focus()
    }
  },
  computed: {
    multiply () {
      return this.count * this.count2
    },
    finished () {
      return this.todos.filter(t => t.isDone)
    },
    unfinished () {
      return this.todos.filter(function (t) {
        return t.isDone === false
      })
    }
  }
}
</script>
