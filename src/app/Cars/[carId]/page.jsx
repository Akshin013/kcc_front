'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useSwipeable } from "react-swipeable";
import Link from 'next/link';

const CarDetail = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(true);
  const whatsappNumber = '+79658926701';

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNextImage(),
    onSwipedRight: () => handlePrevImage(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  useEffect(() => {
    if (!carId) return;
    axios.get(`https://kcc-back.onrender.com/api/cars/${carId}`)
      .then(res => setCar(res.data))
      .catch(err => console.error(err));
  }, [carId]);

  const handlePrevImage = () => {
    if (!car) return;
    setCurrentIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  const handleNextImage = () => {
    if (!car) return;
    setCurrentIndex((prev) => (prev + 1) % car.images.length);
  };

  if (!car) return <div className="p-4 text-white">Загрузка...</div>;

  const message = `Salam! Mən bu maşınla maraqlanıram: ${car.marka} ${car.model}, İl: ${car.il}, Qiymət: ${car.qiymet}$ (Car ID: ${car.carId})`;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+','')}/?text=${encodeURIComponent(message)}`;

  return (
    <div className="p-4 mb-20 bg-[#333333] min-h-screen text-white">

      {/* Кнопка возврата на главную */}
      <div className="mb-4">
        <Link href="/" className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
          <IoIosArrowBack size={20} /> Ana səhifə
        </Link>
      </div>

      <div className="max-w-4xl mx-auto border border-gray-500 bg-[#545454] rounded-lg shadow-lg p-4">
        <h1 className="text-2xl font-bold mb-2">{car.marka} {car.model} {car.versiya}</h1>

        <div {...swipeHandlers} className="relative mb-4">
          {car.video ? (
            <video
              src={car.video}
              controls
              autoPlay
              muted
              className="w-full h-80 object-cover rounded"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : car.images?.length > 0 ? (
            <div className="relative mb-4">
              <img
                src={car.images[currentIndex]}
                alt={`${car.marka} ${car.model}`}
                className="w-full h-80 object-cover rounded cursor-pointer"
                onClick={() => setModalOpen(true)}
                onError={(e) => { e.target.src = '/default-car.jpg'; }}
              />
              {car.images.length > 1 && !showVideo && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-70 hover:opacity-100"
                  >‹</button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-70 hover:opacity-100"
                  >›</button>
                  <p className="absolute bottom-2 right-2 bg-white bg-opacity-70 px-2 py-1 rounded text-sm text-black">
                    {currentIndex + 1} / {car.images.length} фото
                  </p>
                </>
              )}
            </div>
          ) : null}
        </div>

        <div className="mt-4">
          <p className={`font-bold text-xl ${car.sold ? 'text-red-500' : 'text-white'}`}>
            {car.sold ? 'SATILIB' : `${car.qiymet} $`}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
          <p><strong>Год:</strong> {car.il}</p>
          <p><strong>КМ:</strong> {car.km} km</p>
          <p><strong>Yer sayı:</strong> {car.yerSayi}</p>
          <p><strong>Lyuk:</strong> {car.lyuk ? "Bəli" : "Xeyr"}</p>
          <p><strong>Boya:</strong> {car.boya}</p>
          <p><strong>Dəyişən:</strong> {car.deyisen}</p>
          <p><strong>Yanacaq:</strong> {car.yanacaq}</p>
        </div>

        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Əlaqə <FaWhatsapp size={20}/>
        </a>
      </div>
    </div>
  );
};

export default CarDetail;
