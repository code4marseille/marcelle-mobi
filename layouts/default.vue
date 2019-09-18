<template>
  <div id="fullscreen">
    <nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  height: 100vh;
}

*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
}

.button--brand {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid var(--primary);
  color: var(--primary);
  text-decoration: none;
}

.button--brand:hover {
  color: #fff;
  background-color: var(--primary);
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
}

#fullscreen {
  height: 100vh;
  width: 100wh;
}
</style>
