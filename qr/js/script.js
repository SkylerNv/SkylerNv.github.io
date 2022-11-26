var qrcode = new QRCode(document.getElementById("qr-code"), {
    width: 256,
    height: 256,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

qrcode.makeCode('skylernv.github.io/qr/about');

function makeCode(){
    let textInput = document.getElementById("text-input").value;
    if(!textInput) return;
    qrcode.makeCode(textInput);
}

let textInput = document.getElementById("text-input");

textInput.addEventListener('keypress', event => {
    if (event.key === "Enter") {
        event.preventDefault();
        document.getElementById("generate-button").click();
    }
})