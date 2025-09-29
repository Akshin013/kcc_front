'use client';
import React from "react";

const ImageBox = ({ src, alt = "image", size = "h-48 w-48", rounded = "rounded" }) => {
  return (
    <div className={`${size} flex items-center justify-center bg-gray-100 ${rounded} overflow-hidden`}>
      <img
        src={src}
        alt={alt}
        className="max-h-full max-w-full object-contain"
        onError={(e) => { e.target.src = "/default-car.jpg"; }}
      />
    </div>
  );
};

export default ImageBox;
