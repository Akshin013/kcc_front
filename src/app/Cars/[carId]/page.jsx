'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
// import { useSwipeable } from "react-swipeable";
import Link from 'next/link';

const CarDetail = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [video, setVideo] = useState([])
  const whatsappNumber = '+79658926701';

  // const swipeHandlers = useSwipeable({
  //   onSwipedLeft: () => handleNextImage(),
  //   onSwipedRight: () => handlePrevImage(),
  //   preventDefaultTouchmoveEvent: true,
  //   trackMouse: true
  // });

  useEffect(() => {
    if (!carId) return;
    axios.get(`https://kcc-back.onrender.com/api/cars/${carId}`)
      .then(res => setCar(res.data))
      .catch(err => console.error(err));
      // console.log(car);
      axios.get(`https://kcc-back.onrender.com/api/cars/${carId}`)
      .then(res =>  setVideo(res.data.videos))
      .catch(err => console.error(err));
      console.log(car);
      console.log(video);

  }, [carId]);
      console.log(car);
      console.log(video);

  const handlePrevImage = () => {
    if (!car || !car.images?.length) return;
    setCurrentIndex(prev => (prev - 1 + car.images.length) % car.images.length);
  };

  const handleNextImage = () => {
    if (!car || !car.images?.length) return;
    setCurrentIndex(prev => (prev + 1) % car.images.length);

  };

  if (!car) return <div className="p-4 text-white">Загрузка...</div>;

  const message = `Salam! Mən bu maşınla maraqlanıram: ${car.marka} ${car.model}, İl: ${car.il}, Qiymət: ${car.qiymet}$ (Car ID: ${car.carId})`;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+','')}/?text=${encodeURIComponent(message)}`;

  return (
    <div className="p-4 bg-[#333333] min-h-screen text-white">

      {/* Кнопка возврата на главную */}
      <div className="mb-4">
        <Link href="/" className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">
          <IoIosArrowBack size={20} /> Ana səhifə
        </Link>
      </div>

      <div className="max-w-4xl mx-auto border border-gray-500 bg-[#545454] rounded-lg shadow-lg p-4">
        <h1 className="text-2xl font-bold mb-4">{car.marka} {car.model} {car.versiya}</h1>

<div {...swipeHandlers} className="relative mb-4">
  { (video.length > 0 || car.images?.length > 0) && (() => {
    // объединяем сначала видео, потом картинки
    const gallery = [...video.map(src => ({ type: 'video', src })), 
                     ...(car.images || []).map(src => ({ type: 'image', src }))];
    const current = gallery[currentIndex];

    return (
      <div className="relative w-full aspect-[16/9] overflow-hidden rounded-lg">
        {current.type === 'video' ? (
          <video
            src={current.src}
            controls
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <img
            src={current.src}
            alt="car"
            className="w-full h-full object-cover rounded-lg"
          />
        )}

        {gallery.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((currentIndex - 1 + gallery.length) % gallery.length); }}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-70 hover:opacity-100"
            >‹</button>
            <button
              onClick={(e) => { e.stopPropagation(); setCurrentIndex((currentIndex + 1) % gallery.length); }}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-70 hover:opacity-100"
            >›</button>
            <p className="absolute bottom-2 right-2 bg-white bg-opacity-70 px-2 py-1 rounded text-sm text-black">
              {currentIndex + 1} / {gallery.length}
            </p>
          </>
        )}
      </div>
    )
  })() }
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
          
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          onClick={()=> {      console.log(car);
}}
        >
          Əlaqə <FaWhatsapp size={20}/>
        </a>
      </div>
    </div>
  );
};

export default CarDetail;
