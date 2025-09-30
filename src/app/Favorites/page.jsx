'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import Link from 'next/link';
import { FaWhatsapp } from "react-icons/fa";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carImagesIndex, setCarImagesIndex] = useState({});
  const whatsappNumber = '+79658926701';

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem('userId', userId);
    }
    fetchFavorites(userId);
  }, []);

  const fetchFavorites = async (userId) => {
    try {
      const res = await axios.get(`https://kcc-back.onrender.com/api/favorites/${userId}`);
      const favCars = Array.isArray(res.data) ? res.data.filter(fav => fav && fav.carId) : [];
      setFavorites(favCars);

      const initialIndex = {};
      favCars.forEach(fav => { initialIndex[fav.carId._id] = 0; });
      setCarImagesIndex(initialIndex);

      setLoading(false);
    } catch (err) {
      console.error('Ошибка при получении избранного:', err);
      setLoading(false);
    }
  };

  const handlePrevImage = (carId) => {
    setCarImagesIndex(prev => {
      const car = favorites.find(fav => fav.carId._id === carId)?.carId;
      const length = car?.images?.length || 1;
      return { ...prev, [carId]: (prev[carId] - 1 + length) % length };
    });
  };

  const handleNextImage = (carId) => {
    setCarImagesIndex(prev => {
      const car = favorites.find(fav => fav.carId._id === carId)?.carId;
      const length = car?.images?.length || 1;
      return { ...prev, [carId]: (prev[carId] + 1) % length };
    });
  };

  const removeFromFavorites = async (favoriteId) => {
    try {
      await axios.delete(`https://kcc-back.onrender.com/api/favorites/${favoriteId}`);
      setFavorites(prev => prev.filter(fav => fav._id !== favoriteId));
    } catch (err) {
      console.error('Ошибка при удалении из избранного:', err.response?.data || err.message);
    }
  };

  if (loading) return <div>Yüklənir...</div>;

  return (
    <div className="p-2 bg-[#333333] text-white">
      {favorites.length === 0 && 
      
      <div className='h-screen bg-[#4b4b4d] flex'>
        <div className='h-fit mt-20'>
            <img src='https://res.cloudinary.com/dsigbmb7p/image/upload/v1759236970/logo_like_yjmshq.jpg'/>
            <p className='text-center mt-40`'>Elanlara daha sonra baxmag üçün onları<br/> seçilmişler siyahısına alava edin</p>
        </div>
      </div>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {favorites.map(fav => {
          const car = fav.carId;
          if (!car) return null;
          const currentIndex = carImagesIndex[car._id] || 0;

          const whatsappLink = `https://wa.me/${whatsappNumber.replace('+','')}/?text=${encodeURIComponent(
            `Salam! Mən bu maşınla maraqlanıram: ${car.marka} ${car.model}, İl: ${car.il}, Qiymət: ${car.qiymet}$`
          )}`;

          return (
            <div key={fav._id} className="border border-gray-500 bg-[#545454] rounded-lg shadow-md hover:shadow-xl transition">
              <Link href={`/Cars/${car._id}`} className="block no-underline">
                {car.images?.length > 0 && (
                  <div className="relative w-full aspect-[4/3] rounded-t-lg overflow-hidden">
                    <img
                      src={car.images[currentIndex]}
                      alt={`${car.marka} ${car.model}`}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.src = '/default-car.jpg'; }}
                    />
                    {car.images.length > 1 && (
                      <>
                        <button
                          onClick={(e) => { e.preventDefault(); handlePrevImage(car._id); }}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-70 hover:opacity-100"
                        >
                          ‹
                        </button>
                        <button
                          onClick={(e) => { e.preventDefault(); handleNextImage(car._id); }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded opacity-70 hover:opacity-100"
                        >
                          ›
                        </button>
                        <p className="absolute bottom-1 right-2 bg-white bg-opacity-70 px-1 rounded text-sm text-black">
                          {currentIndex + 1} / {car.images.length} фото
                        </p>
                      </>
                    )}
                  </div>
                )}

                <div className="p-2">
                  <p className={`font-bold text-lg ${car.sold ? 'text-red-500 bg-white/10 rounded-lg p-1' : ''}`}>
                    {car.sold ? 'SATILIB' : `${car.qiymet} $`}
                  </p>

                  <div className="flex gap-2 mt-1 text-sm">
                    <p>{car.marka}</p>
                    <p>{car.model}</p>
                    <p>{car.versiya}</p>
                  </div>

                  <div className="flex gap-2 text-sm">
                    <p>{car.il}</p>
                    <p>{car.yanacaq}</p>
                    <p>{car.km} km</p>
                  </div>
                </div>
              </Link>

              <div className="flex gap-2 p-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-green-500 text-white flex-1 h-8 rounded-lg flex items-center justify-center gap-2"
                >
                  Əlaqə <FaWhatsapp size={18}/>
                </a>
                <button
                  onClick={() => removeFromFavorites(fav._id)}
                  className="bg-red-500 text-white w-12 h-8 rounded-lg flex items-center justify-center"
                >
                  ❌
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
