<template>
  <div>
    <div class="container-fluid navbar-inverse bg-light">
      <div class="row">
        <div class="col">
          <nav class="navbar">

            <router-link to="/"><a class="btn" href="#"><span class="btn__text">Главная</span></a></router-link>
            <router-link to="/hist"><a class="btn" href="#"><span class="btn__text">Конвертор валют</span></a></router-link>
          </nav>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      currentApi: 'http://coincap.io/front' ,
      history: []
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
    getNowCurrent(){
      this.$http.get(this.currentApi).then(function(response){
        console.log(response);
        this.history = response.body;
      }, function(error){
        console.log(error);
      })
    }
  }
 // created(){
 //   var socket = io.connect('https://coincap.io');
 //   socket.on('trades', function (tradeMsg) {
 //     // console.log(tradeMsg);
 //     this.history = tradeMsg.msg;
 //     console.log(this.history);
 //   })
 // }
}

</script>

<style>
th{
  font-size: 12px;
}  
</style>