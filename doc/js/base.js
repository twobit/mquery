var node = $('#doc');
var width = 0;


mQuery({maxWidth: '480px'}).bind(function() {
    setLayout(320);
});

mQuery({minWidth: '320px', maxWidth: '480px'}).bind(function() {
    setLayout(480);
});

function setLayout(w) {
}

console.log(mQuery({WebkitMinDevicePixelRatio: 0}).matches());