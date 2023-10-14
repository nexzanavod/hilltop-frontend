import React from 'react';
import Img from "../assets/images/loading.gif"

function LoadingImage() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
      <img src={Img} alt="Loading..." />
    </div>
  );
}

export default LoadingImage;
