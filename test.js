for(var i = 0; i < 6; i++) {
    (function () {
        setTimeout(() => {
            console.log(i);
        }, 1000);
    })(i)
}