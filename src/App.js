import React from 'react';
import './style.scss';
import QrCode from './components/QrCode';

export default function App() {
  return (
    <div className="section container">
      <QrCode />
      <p>Made by David Cortez</p>
    </div>
  );
}
