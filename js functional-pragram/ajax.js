function ajaxFunction() {
    var xmlHttp;

    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
    }
    catch (e) {

        // Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {

            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                alert("您的浏览器不支持AJAX！");
                return false;
            }
        }
    }
}


//改造如下


function ajaxFunction() {
    var xmlHttp;

    try {
        // Firefox, Opera 8.0+, Safari
        xmlHttp = new XMLHttpRequest();
        //也是只要判断一次,就不需要再判断了
        ajaxFunction = function(){
            return new XMLHttpRequest()
        }
    }
    catch (e) {

        // Internet Explorer
        try {
            xmlHttp = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (e) {

            try {
                xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (e) {
                alert("您的浏览器不支持AJAX！");
                return false;
            }
        }
    }
}