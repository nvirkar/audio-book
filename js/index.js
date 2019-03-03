var myscript = function () {

    function speak(text, callback) {
        var u = new SpeechSynthesisUtterance();
        u.text = text;
        u.lang = 'en-US';

        u.onend = function () {
            if (callback) {
                callback();
            }
        };

        u.onerror = function (e) {
            if (callback) {
                callback(e);
            }
        };

        speechSynthesis.speak(u);
    }

    var start = function () {
        console.log('ready')
    }



    var _events = function () {
        $('.btn').off('click').on('click', function () {
            console.log('clicked');
            var data = $('#content').val();
            speak(data);
        })
    }

    var init = function () {
        _events();
        start();
    }
    return {
        init: init
    }
}