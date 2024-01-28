<template>
  <div class="container">
    <figure>
      <img src="/vueschool-logo.png" alt="VueSchool Logo" />
    </figure>
    <h1>Random Wise Quotes</h1>

    <button @click="toggleSortOrder">
      Sort By Date ({{ sortOrder.toUpperCase() }})
    </button>
    <button :disabled="!quotes.length" @click="refreshQuotes">
      Refresh Quotes
    </button>

    <TransitionGroup name="list" tag="ul">
      <li v-for="quote in sortedQuotes" :key="quote._id">
        <span>{{ quote.dateAdded }}</span>
        <blockquote>
          <p>{{ quote.content }}</p>
          <cite>- {{ quote.author }}</cite>
        </blockquote>
      </li>
    </TransitionGroup>
  </div>

  <div v-observe-visibility="loadMoreQuotes" class="footer">
    <p>May the force be with you</p>
  </div>
</template>

<script setup>
const { data, refresh, execute } = await useFetch(
  "https://api.quotable.io/quotes/random?limit=10",
  {
    deep: false,
    onRequestError({ error }) {
      console.error(error);
    },
  }
);

const quotes = ref(data.value);

const refreshQuotes = async () => {
  await refresh();
  quotes.value = data.value;
};

const loadMoreQuotes = async (isVisibile, entry) => {
  if (entry.intersectionRatio > 0) {
    await execute();
    const newQuotes = data.value;
    quotes.value = [...quotes.value, ...newQuotes];
  }
};

const sortOrder = ref("desc");

const toggleSortOrder = () => {
  sortOrder.value = sortOrder.value === "desc" ? "asc" : "desc";
};

const sortedQuotes = computed(() => {
  return [...quotes.value].sort((a, b) =>
    sortOrder.value === "desc"
      ? new Date(b.dateAdded) - new Date(a.dateAdded)
      : new Date(a.dateAdded) - new Date(b.dateAdded)
  );
});
</script>

<style>
:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}

button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
  min-height: 100vh;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }

  button {
    background-color: #f9f9f9;
    color: black;
  }
}

.footer {
  background: rgb(255, 98, 251);
  background: linear-gradient(
    90deg,
    rgba(255, 98, 251, 1) 0%,
    rgba(0, 212, 255, 1) 50%,
    rgba(0, 38, 92, 1) 100%
  );
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.footer > p {
  font-weight: 700;
  font-size: 1.5rem;
}

figure {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 200px;
  height: 45px;
  background-color: white;
  padding: 10px;
  border-radius: 30px;
  overflow: hidden;
  margin: 0 auto;
}

img {
  width: 100%;
}

h1 {
  color: #fc6c94;
}

button {
  margin-bottom: 10px;
  background-color: #00bda7;
  margin: 5px;
}

button:hover {
  background-color: #00b49c;
}

ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 15px;
  place-items: center;
  justify-items: center;
  width: 100%;
}

li {
  color: white;
  background-color: #00c3fc;
  overflow: hidden;
  border-radius: 1rem;
  max-width: 600px;
  width: 100%;
  border-color: white;
  border: 1px;
  position: relative;
}

span {
  display: block;
  background-color: #342c8c;
  padding-top: 10px;
  padding-bottom: 10px;
}

blockquote {
  padding-top: 5px;
  padding-bottom: 10px;
}

p {
  font-weight: bold;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.list-leave-active {
  position: absolute;
}
</style>
