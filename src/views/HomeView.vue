<script setup lang="ts">
import TheWelcome from '../components/TheWelcome.vue'
import { db, requireLogin } from '@/core/database';
import { ref, onValue } from "firebase/database";
import HelloWorld from '@/components/HelloWorld.vue';
requireLogin();

onValue(ref(db, "tasks"), (snapshot) => {
  const data = snapshot.val();
  console.log(data);
});
</script>

<template>
  <main id="grid">
    <header>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

      <div class="wrapper">
        <HelloWorld msg="You did it!" />

        <nav>
          <RouterLink to="/">Home</RouterLink>
          <RouterLink to="/auth">Auth</RouterLink>
        </nav>
      </div>
    </header>

    <main>
      <TheWelcome />
    </main>
  </main>
</template>


<style scoped>
#grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 0 2rem;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
