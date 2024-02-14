# Nuxt Modules: The Ultimate Guide

Master the art of Nuxt Modules in this hands-on course! From installation to crafting custom modules, you'll unleash the full potential of Nuxt, Vue, and JavaScript. Dive into practical coding sessions, and by the end, you'll be ready to create your own Nuxt magic.

## What is this repository for?

This repo is the course source code where every lesson is a commit.

## Quick Setup

1. Add `my-module` dependency to your project

```bash
# Using pnpm
pnpm add -D my-module

# Using yarn
yarn add --dev my-module

# Using npm
npm install --save-dev my-module
```

2. Add `my-module` to the `modules` section of `nuxt.config.ts`

```js
export default defineNuxtConfig({
  modules: [
    'my-module'
  ]
})
```

That's it! You can now use My Module in your Nuxt app ✨

## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Run Vitest
npm run test
npm run test:watch

# Release new version
npm run release
```
