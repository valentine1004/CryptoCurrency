<template>
	<div class="container">
	</br>
	<h1>Биржа криптовалют</h1>
</br>
</br>
<h3>Последние данные по рынку</h3>
<!-- <a class="btn" href="#" v-on:click="getNowCurrent"><span class="btn__text">Обновить</span></a> -->
</br>
<div class="input-select ">
	<select @change="changeItem($event)">
		<option>Выберите валюту</option>
		<option>USD</option>
		<option>UAH</option>
		<option>RUB</option>
		<option>EUR</option>
	</select>
</div>
<p><input type="text" class="form-control" placeholder="Search" v-model="name"/></p>
<div class="list__wrapper" id="style-1">
	<table class="border--round table--alternate-row">
		<thead>
			<tr class="table-success">
				<th scope="col">Coin Name </th>
				<th scope="col">Symbol </th>
				<th scope="col">Market Cap <span>{{currency}}</span></th>
				<th scope="col">Price <span>{{currency}}</span></th>
				<th scope="col">Supply <span>{{currency}}</span></th>
				<th scope="col">Change <span>%</span></th>
				<th scope="col">Actions</th>  
			</tr>
		</thead>
		<tbody v-if="currency == 'USD'">
			<tr v-for="hist in filteredList">
				<td>{{hist.name}}</td>
				<td>{{hist.symbol}}</td>
				<td>{{hist.market_cap_usd}}</td>
				<td>{{hist.price_usd}}</td>
				<td>{{hist.total_supply}}</td>
				<td>{{hist.percent_change_24h}} %</td>
				<td><router-link :to="{name: 'hist', params: {id: hist.symbol}}"><a class="btn" href="#"><span class="btn__text">coin info</span></a></router-link></td>
			</tr>
		</tbody>
		<tbody v-if="currency == 'UAH'">
			<tr v-for="hist in filteredList">
				<td>{{hist.name}}</td>
				<td>{{hist.symbol}}</td>
				<td>{{hist.market_cap_uah}}</td>
				<td>{{hist.price_uah}}</td>
				<td>{{hist.total_supply}}</td>
				<td>{{hist.percent_change_24h}} %</td>
				<td><router-link :to="{name: 'hist', params: {id: hist.symbol}}"><a class="btn" href="#"><span class="btn__text">coin info</span></a></router-link></td>
			</tr>
		</tbody>
		<tbody v-if="currency == 'RUB'">
			<tr v-for="hist in filteredList">
				<td>{{hist.name}}</td>
				<td>{{hist.symbol}}</td>
				<td>{{hist.market_cap_rub}}</td>
				<td>{{hist.price_rub}}</td>
				<td>{{hist.total_supply}}</td>
				<td>{{hist.percent_change_24h}} %</td>
				<td><router-link :to="{name: 'hist', params: {id: hist.symbol}}"><a class="btn" href="#"><span class="btn__text">coin info</span></a></router-link></td>
			</tr>
		</tbody>
		<tbody v-if="currency == 'EUR'">
			<tr v-for="hist in filteredList">
				<td>{{hist.name}}</td>
				<td>{{hist.symbol}}</td>
				<td>{{hist.market_cap_eur}}</td>
				<td>{{hist.price_eur}}</td>
				<td>{{hist.total_supply}}</td>
				<td>{{hist.percent_change_24h}} %</td>
				<td><router-link :to="{name: 'hist', params: {id: hist.symbol}}"><a class="btn" href="#"><span class="btn__text">coin info</span></a></router-link></td>
			</tr>
		</tbody>
	</table>
</div>
</br>
</hr>
<!--  <button v-on:click="getAllHistory">Получить данные</button> -->

</div>
</template>

<script>
export default {
	name: 'app',
	data () {
		return {
			// currentApi: 'http://coincap.io/front' ,
			currentApi: "https://api.coinmarketcap.com/v1/ticker/?limit=100",
			history: [],
			currency: 'USD',
			name: ''
		}
	},
	computed:{
		filteredList(){
			var nam = this.name;
			return this.history.filter(function (elem) {

				if(nam==='') return true;
				else return elem.name.indexOf(nam) > -1;
			})
		}
	},
	created(){
		this.$http.get(this.currentApi).then(function(response){
			console.log(response);
			this.history = response.body;
		}, function(error){
			console.log(error);
		})
	},
	methods: {
		changeItem(event){
			if(event.target.value == 'USD'){
				this.currency = 'USD';
			}else if(event.target.value == 'UAH'){
				this.currency = event.target.value;
				this.$http.get('https://api.coinmarketcap.com/v1/ticker/?convert=UAH&limit=100').then(function(response){
					console.log(response);
					this.history = response.body;
				}, function(error){
					console.log(error);
				})
			}else if(event.target.value == 'RUB'){
				this.currency = event.target.value;
				this.$http.get('https://api.coinmarketcap.com/v1/ticker/?convert=RUB&limit=100').then(function(response){
					console.log(response);
					this.history = response.body;
				}, function(error){
					console.log(error);
				})
			}else if(event.target.value == 'EUR'){
				this.currency = event.target.value;
				this.$http.get('https://api.coinmarketcap.com/v1/ticker/?convert=EUR&limit=100').then(function(response){
					console.log(response);
					this.history = response.body;
				}, function(error){
					console.log(error);
				})
			}
		},
		getNowCurrent(){
			this.$http.get(this.currentApi).then(function(response){
				console.log(response);
				this.history = response.body;
			}, function(error){
				console.log(error);
			})
		}
	}

}

</script>

<style>
.list__wrapper{
	height:500px;
	overflow-y: scroll;
}
#style-1::-webkit-scrollbar-track
{
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
	border-radius: 10px;
	background-color: #F5F5F5;
}

#style-1::-webkit-scrollbar
{
	width: 12px;
	background-color: #F5F5F5;
}

#style-1::-webkit-scrollbar-thumb
{
	border-radius: 10px;
	-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
	background-color: #555;
}
th{
	font-size: 12px;
} 
span{
	color:grey;
} 
</style>