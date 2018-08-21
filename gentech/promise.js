function waitUpToThreeSeconds(time) {

  var promise = new Promise(function(resolve,reject){

    console.log(`I will wait for 3 seconds, you asked me to wait for ${time} seconds`)


      setTimeout(function (){
        resolve(`${time} seconds complete`)
      }, time * 1000);

  })


}
