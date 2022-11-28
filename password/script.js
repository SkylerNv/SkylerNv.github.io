// https://stackoverflow.com/questions/9719570/generate-random-password-string-with-requirements-in-javascript

function generate(length, special) {
    let wishlist = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (special) wishlist += '~!@-#${}[]';
    return Array.from(crypto.getRandomValues(new Uint32Array(length)))
            .map((x) => wishlist[x % wishlist.length])
            .join('')
}

function generatePassword() {
    let length = document.getElementById('password-length-input').value;
    let special = document.getElementById('use-special-input').checked;
    document.getElementById('password-input').value = generate(length, special);
    if(qrIsVisible()) makeQr();
}

function copyPassword() {
    let text = document.getElementById('password-input').value;
    navigator.clipboard.writeText(text).then(() => {
        let messageDiv = document.getElementById('success-copy-message');
		if(!messageDiv.style.display || messageDiv.style.display === 'none'){
            messageDiv.style.display = 'block';
            setTimeout(() => {
                messageDiv.style.display = 'none';
            }, 2000);
        }
	}, err => {
		console.error('Async: Could not copy text: ', err);
	});
}

var qrcode = new QRCode(document.getElementById("qr-code"), {
    width: 128,
    height: 128,
    colorDark : "#000000",
    colorLight : "#ffffff",
    correctLevel : QRCode.CorrectLevel.H
});

function makeQr() {
    qrcode.makeCode(document.getElementById('password-input').value);
}

function qrIsVisible() {
    return document.getElementById('qr-code').style.display === 'block';
}

function toggleQrCode() {
    if(qrIsVisible()){
        document.getElementById('qr-code').style.display = 'none';
        document.getElementById('qr-toggle').innerHTML = 'Show QR code';
    }
    else {
        makeQr();
        document.getElementById('qr-code').style.display = 'block';
        document.getElementById('qr-toggle').innerHTML = 'Hide QR code';
    }
}

generatePassword();