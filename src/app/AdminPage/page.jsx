'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdminPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cars, setCars] = useState([]);
  const [editingCarId, setEditingCarId] = useState(null);
  const [newCar, setNewCar] = useState({
    vin: '',
    marka: '',
    model: '',
    versiya: '',
    yerSayi: '',
    lyuk: false,
    il: '',
    km: '',
    boya: '',
    deyisen: '',
    yanacaq: '',
    qiymet: '',
    sold: false
  });

  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const ADMIN_USERNAME = 'kccauto';
  const ADMIN_PASSWORD = 'Mamediq1988';

  // ---------------- Водяной знак ----------------
  const addWatermark = (file, watermarkText = "KCCAUTO") => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.drawImage(img, 0, 0);

          ctx.font = `${Math.floor(img.width / 15)}px Arial`;
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(watermarkText, img.width / 2, img.height / 2);

          canvas.toBlob(blob => {
            resolve(new File([blob], file.name, { type: file.type }));
          }, file.type);
        };
        img.src = e.target.result;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  // ---------------- Получение машин ----------------
  const fetchCars = async () => {
    try {
      const res = await axios.get('https://kcc-back.onrender.com/api/cars');
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCars(sorted);
    } catch (err) {
      console.error('Ошибка получения машин:', err);
    }
  };

  // ---------------- Авторизация ----------------
  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      fetchCars();
    } else {
      alert('Неверный логин или пароль');
    }
  };

  // ---------------- Добавление/обновление машины ----------------
  const handleAddOrUpdateCar = async () => {
    try {
      const formData = new FormData();
      Object.keys(newCar).forEach(key => formData.append(key, newCar[key]));
      if (images.length > 0) images.forEach(file => formData.append("images", file));
      if (videos.length > 0) videos.forEach(file => formData.append("videos", file));

      const url = editingCarId
        ? `https://kcc-back.onrender.com/api/cars/${editingCarId}`
        : "https://kcc-back.onrender.com/api/cars";
      const method = editingCarId ? "put" : "post";

      await axios({ method, url, data: formData, headers: { "Content-Type": "multipart/form-data" } });
      alert(editingCarId ? "Maşın yeniləndi ✅" : "Maşın əlavə edildi ✅");

      // сброс формы
      setNewCar({
        vin: '',
        marka: '',
        model: '',
        versiya: '',
        yerSayi: '',
        lyuk: false,
        il: '',
        km: '',
        boya: '',
        deyisen: '',
        yanacaq: '',
        qiymet: '',
        sold: false
      });
      setImages([]);
      setVideos([]);
      setEditingCarId(null);
      fetchCars();
    } catch (err) {
      console.error("Ошибка при сохранении машины:", err.response?.data || err.message);
    }
  };

  // ---------------- Удаление ----------------
  const handleDeleteCar = async (id) => {
    if (!confirm('Silinsin?')) return;
    try {
      await axios.delete(`https://kcc-back.onrender.com/api/cars/${id}`);
      fetchCars();
    } catch (err) {
      console.error('Ошибка при удалении:', err);
      alert('Silinmə zamanı xəta');
    }
  };

  // ---------------- Поиск ----------------
  const handleSearch = () => {
    const idNum = Number(searchId.trim());
    if (!idNum) return alert("Düzgün ID daxil edin");
    const found = cars.find(car => car.carId === idNum);
    if (found) setSearchResult(found);
    else { setSearchResult(null); alert("Tapılmadı"); }
  };

  // ---------------- Редактирование ----------------
  const handleEditCar = (car) => {
    setNewCar({
      vin: car.vin || '',
      marka: car.marka || '',
      model: car.model || '',
      versiya: car.versiya || '',
      yerSayi: car.yerSayi || '',
      lyuk: car.lyuk || false,
      il: car.il || '',
      km: car.km || '',
      boya: car.boya || '',
      deyisen: car.deyisen || '',
      yanacaq: car.yanacaq || '',
      qiymet: car.qiymet || '',
      sold: car.sold || false
    });
    setImages(car.images || []);
    setVideos(car.videos || []);
    setEditingCarId(car._id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // ---------------- Форма входа ----------------
  if (!isLoggedIn) {
    return (
      <div className="p-4 flex justify-center">
        <div>
          <h1 className="text-2xl text-white font-bold mb-4">Admin giriş</h1>
          <input type="text" placeholder="Login" value={username} onChange={e => setUsername(e.target.value)} className="border p-2 mb-2 w-full text-white border-gray-400 rounded-lg" />
          <input type="password" placeholder="Parol" value={password} onChange={e => setPassword(e.target.value)} className="border p-2 mb-2 w-full text-white border-gray-400 rounded-lg" />
          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg cursor-pointer">Daxil ol</button>
        </div>
      </div>
    );
  }

  // ---------------- Интерфейс админки ----------------
  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4">Admin panel</h1>
      <h2 className="text-xl text-white font-semibold mb-2">{editingCarId ? 'Maşını düzəlt' : 'Yeni maşın əlavə et'}</h2>

      {/* VIN */}
      <div className="mb-2">
        <label className="block text-white font-semibold mb-1">VIN:</label>
        <input
          type="text"
          placeholder="VIN kodu"
          value={newCar.vin || ''}
          onChange={e => setNewCar(prev => ({ ...prev, vin: e.target.value }))}
          className="border p-2 w-full text-white border-gray-400 rounded-lg"
        />
      </div>

      {/* Остальные поля */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {Object.keys(newCar).filter(key => key !== 'vin').map(key => (
          typeof newCar[key] === 'boolean' ? (
            <label key={key} className="flex items-center gap-2 border p-2 text-white border-gray-400 rounded-lg">
              <input type="checkbox" checked={newCar[key]} onChange={e => setNewCar(prev => ({ ...prev, [key]: e.target.checked }))} className="h-5 w-5 cursor-pointer" />
              <span className="text-white">
                {key === "sold" ? (newCar[key] ? "Satilib" : "Stokda") : (newCar[key] ? "Lyuk var" : "Lyuk yox")}
              </span>
            </label>
          ) : (
            <input key={key} type={typeof newCar[key] === 'number' ? 'number' : 'text'} placeholder={key} value={newCar[key] === '' || newCar[key] === 0 ? '' : newCar[key]} onChange={e => setNewCar(prev => ({ ...prev, [key]: e.target.type === 'number' ? Number(e.target.value) : e.target.value }))} className="border p-2 text-white border-gray-400 rounded-lg" />
          )
        ))}
      </div>

      {/* Фото */}
      <div className="mb-4">
        <label className="block text-white mb-1 font-semibold">Foto:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={async e => {
            const files = Array.from(e.target.files);
            const processed = await Promise.all(files.map(f => addWatermark(f, "KCCAUTO")));
            setImages(prev => [...prev, ...processed]);
          }}
          className="border p-2 w-full text-white border-gray-400 rounded-lg"
        />
      </div>

      {/* Видео */}
      <div className="mb-4">
        <label className="block text-white mb-1 font-semibold">Video:</label>
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={e => setVideos(prev => [...prev, ...Array.from(e.target.files)])}
          className="border p-2 w-full text-white border-gray-400 rounded-lg"
        />
      </div>

      {/* Кнопка */}
      <button onClick={handleAddOrUpdateCar} className="bg-green-600 text-white px-6 py-2 rounded-lg cursor-pointer">
        {editingCarId ? "Yenilə" : "Əlavə et"}
      </button>

      {/* Список машин */}
      <div className="mt-8">
        <h2 className="text-xl text-white mb-4">Bütün maşınlar</h2>
        <div className="grid grid-cols-1 gap-4">
          {cars.map(car => (
            <div key={car._id} className="border border-gray-600 p-3 rounded-lg text-white">
              <p><strong>{car.marka} {car.model}</strong></p>
              {car.vin && <p>VIN: {car.vin}</p>}
              <p>Qiymət: {car.qiymet}</p>
              <div className="flex gap-2 mt-2">
                <button onClick={() => handleEditCar(car)} className="bg-blue-500 px-3 py-1 rounded">Düzəlt</button>
                <button onClick={() => handleDeleteCar(car._id)} className="bg-red-500 px-3 py-1 rounded">Sil</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
