<template>
	<div class="footer">
    <svg width="300px" height="1px">
      <line x1="0" y1="0" x2="300" y2="0"/>
    </svg>
    <div id="contacts">
      <div id="contacts--contact">
        <p>xavier.seignard+drangies@gmail.com</p>
        <p>06.00.00.00.00</p>
      </div>
      <div id="contacts--social">
        <a href="#"><img src="@/assets/github.svg" alt=""></a>
        <a href="#"><img src="@/assets/twitter.svg" alt=""></a>
        <a href="#"><img src="@/assets/linkedin.svg" alt=""></a>
      </div>
    </div>
    <div id="mentions">
      <p>2018 | <a href="#">mentions légales</a></p>
    </div>
	</div>
</template>

<script>

export default {
	name: 'FooterStyle',
};
</script>

<style scoped>

  .footer{
  padding:0 15% 2% 15%;
  box-sizing:border-box;
  margin-top:20px;
  width:100%;
  color:white;
  display:flex;
  flex-direction:column;
  align-items:center;
  }
  svg{
    stroke-linecap:round;
    stroke-width:0.5px;
    stroke:aquamarine;
    margin-bottom: 3%;
  }
  #contacts{
  display:flex;
  justify-content:space-between;
  align-items:center;
  width:100%;
  }
  #contacts--contact{
  text-align:right;
  }
  #contacts--social{
  width:20%;
  display : flex;
  justify-content : space-between;
  }
  #contacts--social img{
  height:30px;
  width:30px;
  padding:5px;
  }
  #mentions a{
    text-decoration: none;
    color:white;
  }
  #mentions p {
  font-size:0.5em;
  }
</style>
