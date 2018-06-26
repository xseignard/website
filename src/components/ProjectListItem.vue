<template>
  <a href="#" id="projectItem">
    <div class="itemID">
      <div class="hover">
        <svg width="100%" height="100%">
          <rect x="0" y="0" width="0" height="100%" fill="#4FDAB1"/>
        </svg>
        <div class="hover--details">
          <p v-html=""class="type">Type of project</p>
          <p class="type">–</p>
          <p>this is a baseline to present the project</p>
          <p>01 / 2018</p>
          <p>technologies <br>used in<br>this project</p>
        </div>
      </div>
    </div>
    <h2>name of the project</h2>
  </a>
</template>


<script>

</script>

<style scoped>
  #projectItem{
    margin:5vh;
    color:white;
    text-decoration: none;
  }
  .itemID{
    height:30vh;
    width:30vw;
    background-image: url(../assets/images/ImgTemplate.jpg);
    background-position: center;
    background-size: cover;
    position:relative;
    margin-right: 0;
  }
  .hover{
    width:100%;
    height:100%;
    position:absolute;
  }
  .hover:hover .hover--details{
    opacity:1;
  }
  rect{
    transition: 0.3s ease-out;
  }
  .hover:hover rect{
    width:85%;
  }
  .hover--details{
    opacity: 0;
    padding:5%;
    box-sizing: border-box;
    position:relative;
    z-index: 1;
    transition: 0.25s 0.1s ease-out;
  }
  .type{
    text-transform: uppercase;
    font-weight: bold;
  }
  svg{
    position:absolute;
  }
  h2{
    text-transform: uppercase;
    font-size:1.15rem;
  }
</style>
