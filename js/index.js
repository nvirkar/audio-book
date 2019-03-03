var myscript = function(){

    var start = function(){
        alert('ready');
    }

    var init= function(){
        start();
    }
    return {
        init:init
    }
}