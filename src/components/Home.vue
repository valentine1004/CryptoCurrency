<template>
  <div class="container">
  </br>
  <h1>Калькулятор биткоина и конвертер</h1>
  <div class="form-group">
    <label for="sell">Отдаем:</label>

    <div class="input-select ">
      <select @change="changeItem($event)">
        <option>Выберите валюту</option>
        <option>USD - Доллар</option>
        <option>UAH - Гривна</option>
        <option>RUB - Рубль</option>
        <option>EUR - Евро</option>
      </select>
    </div>
    <h2>{{chooseCurrency}}</h2>
    <input type="text" class="form-control" id="sell" placeholder="Введите к-во валюты:" v-model="sell" required >
  </div>
  <div class="form-group">
    <label for="gets">Получаем биткона:</label>
    <input type="text" class="form-control" id="gets" :value="sell/current" required >
  </div>
</br>
</br>
<h3>Последние данные по рынку (UAH)</h3>
</br>
<table class="border--round table--alternate-row">
  <thead>
    <tr class="table-info">
      <th scope="col">Buy (цена биткоина за покупку)</th>
      <th scope="col">Sell (цена биткоина за продажу)</th>
      <th scope="col">Low (наименьшая цена сделки за 24 часа)</th>
      <th scope="col">Hight (наибольшая цена сделки за 24 часа)</th>
      <th scope="col">Last (цена последней сделки)</th>
      <th scope="col">Vol (объём торгов в базовой валюте за 24 часа)</th>
      <th scope="col">Price (общая стоимость торгов в котируемое валюте за 24 часа)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>{{ticker.buy}}</td>
      <td>{{ticker.sell}}</td>
      <td>{{ticker.low}}</td>
      <td>{{ticker.high}}</td>
      <td>{{ticker.last}}</td>
      <td>{{ticker.vol}}</td>
      <td>{{ticker.price}}</td>
    </tr>
  </tbody> 
</table>
</br>
</hr>
<!--  <button v-on:click="getAllHistory">Получить данные</button> -->
<h3>История торгов (UAH)</h3>
<table class="border--round table--alternate-row">
  <thead>
    <tr class="table-success">
      <th scope="col">Id (идентификатор сделки)</th>
      <th scope="col">Price (цена за биткоин)</th>
      <th scope="col">Volume (обьем в биткоинах)</th>
      <th scope="col">Funds (обьем в гривнах)</th>
      <th scope="col">Market (идентификатор рынка)</th>
      <th scope="col">Created at (время сделки)</th>  
    </tr>
  </thead>
  <tbody>
    <tr v-for="hist in history">
      <td>{{hist.id}}</td>
      <td>{{hist.price}}</td>
      <td>{{hist.volume}}</td>
      <td>{{hist.funds}}</td>
      <td>{{hist.market}}</td>
      <td>{{hist.created_at.split("T").reverse().join("  ")}}</td>
    </tr>
  </tbody> 
</table>
</div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      currentApi: 'https://kuna.io/api/v2/tickers/btcuah' ,
      currentHistory: 'https://kuna.io/api/v2/trades?market=btcuah',
      ticker: {},
      history: [],
      sell: 0,
      current: 0,
      chooseCurrency: ""
    }
  },
  created(){
    this.$http.get(this.currentApi).then(function(response){
      console.log(response.body.ticker);
      this.ticker = response.body.ticker;
    }, function(error){
      console.log(error);
    }),
    this.$http.get(this.currentHistory).then(function(response){
      console.log(response.body);
      this.history = response.body;
    }, function(error){
      console.log(error);
    })
  },
  methods: {
    changeItem(event){
     if(event.target.value == 'USD - Доллар'){
      this.$http.get('https://api.cryptonator.com/api/ticker/btc-usd').then(function(response){
        console.log(response);
        this.current = response.body.ticker.price;
      }, function(error){
        console.log(error);
      })
    }else if(event.target.value == 'UAH - Гривна'){
      this.$http.get('https://api.cryptonator.com/api/ticker/btc-uah').then(function(response){
        console.log(response);
        this.current = response.body.ticker.price;
      }, function(error){
        console.log(error);
      })
    }else if(event.target.value == 'RUB - Рубль'){
     this.$http.get('https://api.cryptonator.com/api/ticker/btc-rub').then(function(response){
        console.log(response);
        this.current = response.body.ticker.price;
      }, function(error){
        console.log(error);
      })
   }else if(event.target.value == 'EUR - Евро'){
    this.$http.get('https://api.cryptonator.com/api/ticker/btc-eur').then(function(response){
        console.log(response);
        this.current = response.body.ticker.price;
      }, function(error){
        console.log(error);
      })
  }
}
}
}
</script>

<style>
th{
  font-size: 12px;
}  
</style>