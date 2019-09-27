<template>
  <div id="app">
    <navbar/>
    <router-view id="app-view"></router-view>
  </div>
</template>

<script>
import navbar from './components/navbar'
  export default {
    name: 'my-project' ,
    components : {
      navbar
    }
    
  }
</script>

<style>
  /* CSS */
@font-face {
  font-family: myFirstFont;
  src: url("./font/HelveticaNeueW23forSKY-Bd.ttf");
}
  *
  {
    font-family: myFirstFont ;
  }

  body{
    background-color: whitesmoke;
  }

       

</style>
