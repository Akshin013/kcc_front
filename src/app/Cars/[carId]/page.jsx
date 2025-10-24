'use client';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import { FaWhatsapp } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link';
import { IoIosHeart } from "react-icons/io";

const CarDetail = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [favorites, setFavorites] = useState([]);
  const [isFullscreen, setIsFullscreen] = useState(false); // новое состояние
  const whatsappNumber = '+9940553801105';

  const router = useRouter();
  const [fromPage, setFromPage] = useState('main');

  useEffect(() => {
    const page = localStorage.getItem('fromPage');
    if (page) setFromPage(page);
  }, []);

  const handleBack = () => {
    if (fromPage === 'favorites') router.push('/Favorites');
    else router.push('/');
  };
   

console.log(fromPage);

  
  const fetchFavorites = async (userId) => {
    try {
      const res = await axios.get(`https://kcc-back.onrender.com/api/favorites/${userId}`);
      const favoriteCarIds = res.data
        .map(fav => (fav.carId && fav.carId._id ? fav.carId._id : fav.carId))
        .filter(id => id);
      setFavorites(favoriteCarIds);
    } catch (err) {
      console.error("Ошибка при получении избранного:", err);
    }
  };

  const toggleFavorite = async (carId) => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    try {
      if (favorites.includes(carId)) {
        const favRes = await axios.get(`https://kcc-back.onrender.com/api/favorites/${userId}`);
        const favItem = favRes.data.find(f => f.carId?._id === carId);
        if (!favItem) return;
        await axios.delete(`https://kcc-back.onrender.com/api/favorites/${favItem._id}`);
        setFavorites(prev => prev.filter(id => id !== carId));
      } else {
        await axios.post(`https://kcc-back.onrender.com/api/favorites`, { userId, carId });
        setFavorites(prev => [...prev, carId]);
      }
    } catch (err) {
      console.error("Ошибка при изменении избранного:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = crypto.randomUUID();
      localStorage.setItem("userId", userId);
    }
    fetchFavorites(userId);

    if (!carId) return;
    axios.get(`https://kcc-back.onrender.com/api/cars/${carId}`)
      .then(res => setCar(res.data))
      .catch(err => console.error(err));
  }, [carId]);

  if (!car)
    return (
      <div className="flex items-center justify-center h-screen bg-[#333333]">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-300 text-lg animate-pulse">Yüklənir...</p>
        </div>
      </div>
    );

  const gallery = [
    ...(car.videos || []).map(src => ({ type: 'video', src })),
    ...(car.images || []).map(src => ({ type: 'image', src }))
  ];

  const handlePrev = () => setCurrentIndex(prev => (prev - 1 + gallery.length) % gallery.length);
  const handleNext = () => setCurrentIndex(prev => (prev + 1) % gallery.length);
  const current = gallery[currentIndex];
  const isFavorite = favorites.includes(car._id);

  const message = `Salam! Mən bu maşınla maraqlanıram: ${car.marka} ${car.model}, İl: ${car.il}, Qiymət: ${car.qiymet}$ (Car ID: ${car.carId})`;
  const whatsappLink = `https://wa.me/${whatsappNumber.replace('+','')}/?text=${encodeURIComponent(message)}`;

  return (
    <div className="p-4 bg-[#333333] min-h-screen text-white">
      <div>
      <button
        onClick={handleBack}
        className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded mb-4"
      >
        ← Geri
      </button>
  </div>
      <div className="max-w-4xl mx-auto border border-gray-500 bg-[#545454] rounded-lg shadow-lg p-3">
        <h1 className="text-2xl font-bold mb-4">{car.marka} {car.model} {car.versiya}</h1>

        {gallery.length > 0 && (
          <div
            className="relative mb-4 w-full aspect-[16/9] overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setIsFullscreen(true)} // открытие модалки
          >
            {current.type === 'video' ? (
              <video src={current.src} controls className="w-full h-full object-cover rounded-lg"/>
            ) : (
<img 
  src={current.src.replace('/upload/', '/upload/f_auto,q_auto,w_880/')} 
  alt="car" 
  className="w-full h-full object-cover rounded-lg" 
  loading="eager"
/>
            )}

            {gallery.length > 1 && (
              <>
                <button onClick={(e) => { e.stopPropagation(); handlePrev(); }} className="absolute cursor-pointer left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-70 hover:opacity-100">‹</button>
                <button onClick={(e) => { e.stopPropagation(); handleNext(); }} className="absolute cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-70 hover:opacity-100">›</button>
                <p className="absolute bottom-2 right-2 bg-white bg-opacity-70 px-2 py-1 rounded text-sm text-black">{currentIndex + 1} / {gallery.length}</p>
              </>
            )}
          </div>
        )}

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
          <p><strong>Vin:</strong> {car.vin || "000"}</p>
        </div>

        <div className="mt-4 flex gap-2">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 justify-center">
            Əlaqə <FaWhatsapp size={20}/>
          </a>

          <div
            onClick={(e) => { e.stopPropagation(); toggleFavorite(car._id); }}
            className={`rounded-lg w-[30%] flex items-center justify-center cursor-pointer ${
              isFavorite ? "text-red-500" : "text-gray-400"
            }`}
          >
            <IoIosHeart size={25}/>
          </div>
        </div>
      </div>

      {/* Модалка полноэкранная */}
      {isFullscreen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
        <button
          className="absolute top-4 right-4 text-white text-3xl z-[100]"
          onClick={(e) => {
            e.stopPropagation(); // остановим всплытие
            setIsFullscreen(false);
          }}
        >
          ✕
        </button>
          <div className="relative w-full h-full flex items-center justify-center">
            {current.type === 'video' ? (
              <video src={current.src} controls autoPlay className="max-h-full max-w-full rounded-lg"/>
            ) : (
<img 
  src={current.src.replace('/upload/', '/upload/f_auto,q_auto,w_1400/')} 
  alt="car" 
  className="w-full h-full object-cover rounded-lg" 
  loading="eager"
/>
            )}

            {gallery.length > 1 && (
              <>
                <button onClick={handlePrev} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl">‹</button>
                <button onClick={handleNext} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl">›</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetail;
