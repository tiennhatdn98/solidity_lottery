<template>
  <div>
    <router-link :to="{ name: 'home' }">Back</router-link>
    <form @submit="handleSubmit">
      <div>
        <input type="text" v-model="info.username" placeholder="Username" />
      </div>
      <div>
        <input type="password" v-model="info.password" placeholder="Password" />
      </div>
      <div>
        <input
          type="text"
          v-model="info.address"
          placeholder="Wallet Address"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {
        username: '',
        password: '',
        address: '',
      },
    };
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      console.log('alo');
    },
  },
};
</script>
