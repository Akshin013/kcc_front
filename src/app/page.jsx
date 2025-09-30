'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from "uuid";
import Link from 'next/link';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { FaWhatsapp } from "react-icons/fa";

const Main = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [carImagesIndex, setCarImagesIndex] = useState({});
  const whatsappNumber = '+79658926701';

  useEffect(() => {
    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = uuidv4();
      localStorage.setItem("userId", userId);
    }
    fetchFavorites(userId);
  }, []);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const res = await axios.get('https://kcc-back.onrender.com/api/cars');
      const sorted = res.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCars(sorted);
      setFilteredCars(sorted);

      const initialIndex = {};
      sorted.forEach(car => initialIndex[car._id] = 0);
      setCarImagesIndex(initialIndex);

      setLoading(false);
    } catch (err) {
      console.error("Ошибка при получении машин:", err);
      setLoading(false);
    }
  };

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

    if (favorites.includes(carId)) {
      try {
        const favRes = await axios.get(`https://kcc-back.onrender.com/api/favorites/${userId}`);
        if (!Array.isArray(favRes.data)) return;
        const favItem = favRes.data.find(f => f.carId?._id === carId);
        if (!favItem) return;
        await axios.delete(`https://kcc-back.onrender.com/api/favorites/${favItem._id}`);
        setFavorites(prev => prev.filter(id => id !== carId));
      } catch (err) {
        console.error("Ошибка при удалении из избранного:", err.response?.data || err.message);
      }
    } else {
      try {
        await axios.post("https://kcc-back.onrender.com/api/favorites", { userId, carId });
        setFavorites(prev => [...prev, carId]);
      } catch (err) {
        console.error("Ошибка добавления в избранное:", err.response?.data || err.message);
      }
    }
  };

  const handlePrevImage = (carId) => {
    setCarImagesIndex(prev => {
      const length = cars.find(c => c._id === carId)?.images?.length || 1;
      return { ...prev, [carId]: (prev[carId] - 1 + length) % length };
    });
  };

  const handleNextImage = (carId) => {
    setCarImagesIndex(prev => {
      const length = cars.find(c => c._id === carId)?.images?.length || 1;
      return { ...prev, [carId]: (prev[carId] + 1) % length };
    });
  };

  if (loading) return <div>Yüklənir...</div>;

  const years = [];
  for (let y = 2025; y >= 2010; y--) years.push(y);

  const filteredBySearchYear = filteredCars.filter(car => {
    const searchLower = search.toLowerCase();
    const matchesSearch = search
      ? (car.marka?.toLowerCase().includes(searchLower) ||
         car.model?.toLowerCase().includes(searchLower) ||
         car.versiya?.toLowerCase().includes(searchLower) ||
         car.yanacaq?.toLowerCase().includes(searchLower))
      : true;
    const matchesYear = yearFilter ? car.il === Number(yearFilter) : true;
    return matchesSearch && matchesYear;
  });

  const filteredByDate = filteredBySearchYear.filter(car => {
    if (dateFilter === 'all') return true;
    const carDate = new Date(car.createdAt);
    const now = new Date();
    if (dateFilter === 'today') return carDate.toDateString() === now.toDateString();
    if (dateFilter === 'week') {
      const weekAgo = new Date(); weekAgo.setDate(now.getDate() - 7);
      return carDate >= weekAgo;
    }
    if (dateFilter === 'month') {
      const monthAgo = new Date(); monthAgo.setMonth(now.getMonth() - 1);
      return carDate >= monthAgo;
    }
    return true;
  });

  return (
    <div className="p-2 bg-[#333333] text-white">
      <div className="flex flex-col md:flex-row gap-2 mb-4">
        <input
          type="text"
          placeholder="Axtar: Marka, Model, Versiya, Yanacaq..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border border-gray-400 rounded-lg p-2 flex-1"
        />
        <div className='flex justify-between gap-3'>
          <select
            value={yearFilter}
            onChange={e => setYearFilter(e.target.value)}
            className="border border-gray-400 rounded-lg p-2 w-1/2"
          >
            <option value="">Bütün illər</option>
            {years.map(year => <option key={year} value={year}>{year}</option>)}
          </select>

          <select
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="border border-gray-400 rounded-lg p-2 w-1/2"
          >
            <option value="all">Hamısı</option>
            <option value="today">Bügün</option>
            <option value="week">Bu həftə</option>
            <option value="month">Bu ay</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
        {filteredByDate.map(car => {
          const message = `Salam! Mən bu maşınla maraqlanıram: ${car.marka} ${car.model}, İl: ${car.il}, Qiymət: ${car.qiymet}$ (Car ID: ${car.carId})`;
          const whatsappLink = `https://wa.me/${whatsappNumber.replace('+','')}/?text=${encodeURIComponent(message)}`;
          const isFavorite = favorites.includes(car._id);
          const currentIndex = carImagesIndex[car._id] || 0;

          return (
            <div key={car._id} className="border border-gray-500 bg-[#545454] p-1 rounded-lg shadow-md hover:shadow-xl transition cursor-pointer">
              <Link href={`/Cars/${car._id}`} className="no-underline block">
                {/* Картинка с серым фоном */}
                <div className="h-48 w-full overflow-hidden rounded-lg bg-gray-400 relative">
                  {car.images?.[0] && (
                    <img
                      src={car.images[0]}
                      alt={`${car.marka} ${car.model}`}
                      className="h-full w-full object-cover absolute top-0 left-0"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                  )}
                </div>
                <p className="text-sm text-gray-100 mb-1">
                  {new Date(car.createdAt).toLocaleString([], {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </Link>

              <div>
                <p className={`font-bold w-fit ${car.sold ? 'text-white bg-red-800 rounded-lg px-1' : ''}`}>
                  {car.sold ? 'SATILIB' : `${car.qiymet} $`}
                </p>
              </div>

              <div className='flex gap-2'>
                <p>{car.marka || ''}</p>
                <p>{car.model || ''}</p>
                <p>{car.versiya || ''}</p>
              </div>
              <div className='flex gap-2'>
                <p>{car.il || ''}</p>
                <p>{car.yanacaq || ''}</p>
                <p>{car.km ? `${car.km} km` : ''}</p>
              </div>


              <div className="flex gap-2 mt-2">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation(car.carId)}
                  className="bg-green-500 text-white h-7 w-[70%] rounded-lg flex items-center justify-center gap-[10%]">
                  Əlaqə <FaWhatsapp size={25}/>
                </a>
                <div
                  onClick={(e) => { e.stopPropagation(); toggleFavorite(car._id); }}
                  className={`rounded-lg w-[30%] flex items-center justify-center ${isFavorite ? '' : 'text-white'}`}>
                  {isFavorite ? <IoIosHeart color='red' size={25}/> : <IoIosHeartEmpty color='black' size={25}/>}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Main;
