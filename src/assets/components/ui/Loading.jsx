import React, { useEffect, useState } from "react";
import initLoader from "@/assets/js";

function Loading() {
    
  useEffect(() => {
    initLoader();

  }, []);

  return (
    <div className="loading-container">
      <div className="loading-screen">
        <div className="loading-dark overlay"></div>
        <div className="icon-box">
          <video
            playsInline
            muted
            autoPlay
          >
            <source src='https://res.cloudinary.com/dyyglc78v/video/upload/v1731428939/rentcon_animate_black_uf91z1.mp4' type="video/mp4" />
          </video>
        </div>
        <div className="shutter"></div>
        <div className="shutter"></div>
        <div className="shutter"></div>
        <div className="shutter"></div>
        <div className="shutter"></div>
        <div className="shutter"></div>
      </div>
    </div>
  );
}

export default Loading;
