import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QrCode = () => {
  const [url, setUrl] = useState('');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [fgColor, setFgColor] = useState('#000000');
  const [margin, setMargin] = useState(false);
  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector('canvas');
    let image = canvas.toDataURL('image/*');
    let anchor = document.createElement('a');
    anchor.href = image;
    anchor.download = 'qr-code.png';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setUrl('');
  };

  const qrCodeEncoder = (e) => {
    setUrl(e.target.value);
  };

  const selectBgColor = (e) => {
    setBgColor(e.target.value);
  };
  const selectFgColor = (e) => {
    setFgColor(e.target.value);
  };

  const selectMargin = (e) => {
    setMargin(e.target.checked);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={url}
      size={300}
      level={'H'}
      bgColor={bgColor}
      fgColor={fgColor}
      includeMargin={margin}
    />
  );
  return (
    <div className="qrcode__container">
      <div
        ref={qrRef}
        className="qrcodecanvas"
        style={{ backgroundColor: bgColor }}
      >
        {qrcode}
      </div>
      <div className="input__group">
        <form onSubmit={downloadQRCode}>
          <label>Enter URL</label>
          <input
            type="text"
            value={url}
            onChange={qrCodeEncoder}
            placeholder="Your site here"
            className="input__group--link"
          />
          <div className="input__bgcolor">
            <label>Background Color</label>
            <input
              type="color"
              value={bgColor}
              onChange={selectBgColor}
              className="input__bgcolor--bglink"
            />
            <label>Foreground Color</label>
            <input
              type="color"
              value={fgColor}
              onChange={selectFgColor}
              className="input__bgcolor--fglink"
            />
            <label>Include Margin</label>
            <input
              type="checkbox"
              onChange={selectMargin}
              className="checkbox"
            />
          </div>
          <br />
          <button type="submit" diseable={!url}>
            Download QR code
          </button>
        </form>
      </div>
    </div>
  );
};

export default QrCode;
