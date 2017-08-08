//==WECHAT==
//TO-DO: awaiting weChatQrCode fix
let weChatQrCode = undefined;
const createWeChatPaySource = (amount) => {
  if (weChatQrCode === undefined) {
    weChatQrCode = new QRCode(document.getElementById("wechat-qrcode"), "http://google.com" + amount);
    // stripe.createSource({
    //   type: 'wechat',
    //   amount: (parseInt(amount)*100),
    //   currency: 'usd',
    // }).then(function(result) {
    //   weChatQrCode = new QRCode(document.getElementById("wechat-qrcode"), result.source.wechat.qr_code_url);
    // });
  } else {
    weChatQrCode.clear();
    weChatQrCode.makeCode("http://google.com" + amount);
    // stripe.createSource({
    //   type: 'wechat',
    //   amount: (parseInt(amount)*100),
    //   currency: 'usd'
    // }).then(function(result) {
    //   weChatQrCode.makeCode(result.source.wechat.qr_code_url);
    // });
  };
};