<template>
	<div class="about">
		<h1>XAVIER SEIGNARD</h1>
		<div class="about--content">
			<div class="about--content--left">
				<p>Utque aegrum corpus quassari etiam levibus solet offensis,
					ita animus eius <strong>angustus</strong> et tener, quicquid increpuisset, ad
					salutis suae dispendium existimans factum aut cogitatum, insontium
					caedibus fecit victoriam luctuosam.</p>
				<p>Utque aegrum corpus quassari etiam levibus solet offensis,
					ita animus eius <strong>angustus</strong> et tener, quicquid increpuisset, ad
					salutis suae dispendium existimans factum aut <strong>cogitatum</strong>, insontium
					caedibus fecit victoriam luctuosam.</p>
			</div>
			<div class="about--content--right">
				<div class="about--content--right--domains">
					<p>Web<br>development</p>
					<svg width="100%" height="5px">
						<line x1="1" y1="1" x2="13" y2="1" stroke="#4FDAB1"/>
					</svg>
					<p>Interactive<br>installations</p>
					<svg width="100%" height="5px">
						<line x1="1" y1="1" x2="13" y2="1" stroke="#8B73CF"/>
					</svg>
					<p>Live<br>performances</p>
				</div>
				<div class="about--content--right--img">
					<svg width="100%" height="100%">
    				<polygon id="polymorph" points="0 0, 0 0, 0 15, 0 15" fill="#F88429" />
  				</svg>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
	.about{
		display: flex;
		flex-direction: column;
		justify-content: center;
		flex-grow: 1;
	}
	.about--content{
		width:100%;
		display:flex;
		justify-content: space-around;
		padding:0 15% 0 15%;
		box-sizing: border-box;
	}
	.about--content--left{
		max-width: 40%;
		flex-grow: 1;
	}
	.about--content--right{
		display:flex;
		justify-content: space-between;
		flex-grow: 2;
		align-items:center;

	}
	.about--content--right--domains{
		position:relative;
		display:flex;
		flex-direction: column;
		align-items: flex-end;
		justify-content: space-between;
		text-align: right;
		font-family: 'Qontra';
		font-size:1.25rem;
		padding-right: 5%;
	}
	.about--content--right--domains svg{
		fill:none;
		stroke-linecap:round;
		stroke-width:2px;
		transform:rotate(180deg);
	}
	.about--content--right--img{
		background-image: url(../assets/ImgTemplate.jpg);
		background-size: cover;
		background-position: center;
		min-width: 250px;
		width:22vw;
		height: 25vh;
	}
</style>
