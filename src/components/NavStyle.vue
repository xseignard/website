<template>
  <div id="nav">
    <router-link to="/">HOME
      <svg width="100%" height="100%">
        <line x1="15%" y1="50%" x2="85%" y2="50%"/>
      </svg>
    </router-link>
    <router-link to="/about">ABOUT
      <svg width="100%" height="100%">
        <line x1="15%" y1="50%" x2="85%" y2="50%"/>
      </svg>
    </router-link>
    <router-link to="/projects">PROJECTS
      <svg width="100%" height="100%">
        <line x1="15%" y1="50%" x2="85%" y2="50%"/>
      </svg>
    </router-link>
  </div>
</template>

<script>
  export default {
  	name: 'NavStyle',
  };
</script>

<style scoped>
  #nav {
    padding: 50px;
    display: flex;
    justify-content: flex-end;
    width:100%;
    box-sizing: border-box;
  }

  #nav a {
    padding : 0 15px 0 15px;
    font-family: 'Qontra';
    letter-spacing: 2px;
    font-weight: bold;
    color: white;
    text-decoration:none;
    position:relative;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg{
    position:absolute;
    stroke:white;
    stroke-width:2px;
    stroke-dasharray:100 100;
    stroke-dashoffset:100;
    transition:0.25s ease-out;
    stroke-linecap:round;
  }
  #nav a.router-link-exact-active svg, #nav a:hover svg{
    stroke-dashoffset:0;
  }
</style>
