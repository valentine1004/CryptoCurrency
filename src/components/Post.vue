<template>
	<div class="hist" >
		<div class="container">
			<div class="row" style="margin-top:50px;">
				<div class="col-lg-3">
					<h1>{{history.display_name}} ({{history.id}})</h1>
                    <p>{{history.supply}} Circulating {{history.id}} Supply</p>
				</div>
				<div class="boxed boxed--border col-lg-3">
					<h3>$ {{history.price}} ({{history.cap24hrChange}} %)</h3>
                    <p>Current value</p>
				</div>
				<div class="boxed boxed--border col-lg-3">
					<h3>$ {{history.market_cap}}</h3>
					<p>Market cap</p>

				</div>
				<div class="boxed boxed--border col-lg-3">
					<h3>$ {{history.volume}}</h3>
					<p>24hr Volume</p>

				</div>
			</div>
		</div>
	</div>
</template>


<script>
	
	export default{
		name:'hist',
		data(){
			return {
				history: [],
				hist: null,
				mas: ""
			}
		},
		created(){
			
			var url = window.location.href.toString().split("/");
			this.mas = url[url.length - 1];

			this.$http.get("http://coincap.io/page/"+this.mas).then(function(response){
				this.history = response.body;
				console.log(this.history);
			}, function(error){
				console.log(error);
			});
		}
	}
	</script>