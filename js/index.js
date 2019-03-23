var myscript = function () {
    var oFileIn;

    //  output audio with proper highlighting
    var vid = document.getElementById("ac");
    vid.ontimeupdate = function (e) {
        console.log(e.currentTarget.currentTime);
        var spans = $('.content span')
        for (i = 0; i < spans.length; i++) {
            var elem = spans[i];
            if (e.currentTarget.currentTime < elem.getAttribute('data-end') && e.currentTarget.currentTime > elem.getAttribute('data-start')) {
                elem.classList.add('active');
            }
            else {
                elem.classList.remove('active');
            }
        }
    };


    //  get excel file  and convert it into a json object
    $(function () {
        oFileIn = document.getElementById('my_file_input');
        if (oFileIn.addEventListener) {
            oFileIn.addEventListener('change', filePicked, false);
        }
    });

    function filePicked(oEvent) {
        // Get The File From The Input
        var oFile = oEvent.target.files[0];
        var sFilename = oFile.name;
        // Create A File Reader HTML5
        var reader = new FileReader();

        // Ready The Event For When A File Gets Selected
        reader.onload = function (e) {
            var data = e.target.result;
            var cfb = XLS.CFB.read(data, { type: 'binary' });
            var wb = XLS.parse_xlscfb(cfb);
            // Loop Over Each Sheet
            wb.SheetNames.forEach(function (sheetName) {
                // Obtain The Current Row As CSV
                var sCSV = XLS.utils.make_csv(wb.Sheets[sheetName]);
                var oJS = XLS.utils.sheet_to_row_object_array(wb.Sheets[sheetName]);

                //    $("#my_file_output").html(sCSV);
                console.log(oJS);
                printData(oJS)
            });
        };

        // Tell JS To Start Reading The File.. You could delay this if desired
        reader.readAsBinaryString(oFile);
    }


    // print the json data to content and attach proper data attributes from the excel file
    function printData(data) {
        var content = document.getElementsByClassName('content');
        for (var i = 0; i < data.length; i++) {
            var text = document.createElement("span");
            text.innerText = " " + data[i].word + " ";
            text.setAttribute("data-start", data[i].start);
            text.setAttribute("data-end", data[i].end);
            content[0].appendChild(text);
        }
    }


    // ignore
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