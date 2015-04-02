var CatwalkJs;
(function (CatwalkJs) {
    var HelloWorld = (function () {
        function HelloWorld() {
            alert('Hello World');
        }
        return HelloWorld;
    })();
    CatwalkJs.HelloWorld = HelloWorld;
})(CatwalkJs || (CatwalkJs = {}));
