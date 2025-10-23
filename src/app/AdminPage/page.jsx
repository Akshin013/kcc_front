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
  vin: '',        // 👈 обязательно добавь сюда
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

  // 🔹 функция для водяного знака
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

          // исходное изображение
          ctx.drawImage(img, 0, 0);

          // стиль текста
          ctx.font = `${Math.floor(img.width / 15)}px Arial`;
          ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
          ctx.textAlign = "center";
          ctx.textBaseline = "midle";

          // наносим внизу справа
          ctx.fillText(watermarkText, img.width / 2, img.height / 2);

          // обратно в File
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

  // получение машин
  const fetchCars = async () => {
    try {
      const res = await axios.get('https://kcc-back.onrender.com/api/cars');
      const sorted = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setCars(sorted);
    } catch (err) {
      console.error('Ошибка получения машин:', err);
    }
  };

  const handleLogin = () => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      fetchCars();
    } else {
      alert('Неверный логин или пароль');
    }
  };

  // добавление/редактирование
  const handleAddOrUpdateCar = async () => {
    try {
      const formData = new FormData();

      Object.keys(newCar).forEach(key => {
        formData.append(key, newCar[key]);
      });

      if (images.length > 0) {
        images.forEach(file => formData.append("images", file));
      }

      if (videos.length > 0) {
        videos.forEach(file => formData.append("videos", file));
      }

      const url = editingCarId
        ? `https://kcc-back.onrender.com/api/cars/${editingCarId}`
        : "https://kcc-back.onrender.com/api/cars";

      const method = editingCarId ? "put" : "post";

      await axios({
        method,
        url,
        data: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert(editingCarId ? "Maşın uğurla yeniləndi!" : "Maşın uğurla əlavə edildi!");
      setNewCar({
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

  const handleDeleteCar = async (id) => {
    if (!confirm('Вы уверены, что хотите удалить эту машину?')) return;
    try {
      await axios.delete(`https://kcc-back.onrender.com/api/cars/${id}`);
      fetchCars();
    } catch (err) {
      console.error('Ошибка при удалении:', err);
      alert('Ошибка при удалении машины');
    }
  };

  const handleSearch = () => {
    const idNum = Number(searchId.trim());

    if (!idNum) {
      alert("Düzgün ID daxil edin");
      return;
    }

    const found = cars.find(car => car.carId === idNum);

    if (found) {
      setSearchResult(found);
    } else {
      setSearchResult(null);
      alert("Bu ID-ile avto tapilmadi");
    }
  };

  const handleEditCar = (car) => {
    setNewCar({
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

  if (!isLoggedIn) {
    return (
      <div className="p-4 flex justify-center">
        <div>
          <h1 className="text-2xl text-white font-bold mb-4">Admin giriş</h1>
          <input
            type="text"
            placeholder="Login"
            value={username}
            onChange={e => setUsername(e.target.value)}
            className="border p-2 mb-2 w-full text-white border-gray-400 rounded-lg"
          />
          <input
            type="password"
            placeholder="Parol"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="border p-2 mb-2 w-full text-white border-gray-400 rounded-lg"
          />
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 w-full rounded-lg cursor-pointer"
          >
            Daxil ol
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl text-white font-bold mb-4">Admin panel</h1>
      <h2 className="text-xl text-white font-semibold mb-2">{editingCarId ? 'Maşını düzəldin' : 'Əlavə et'}</h2>
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
    

      {/* форма добавления */}
 <div className="grid grid-cols-2 gap-2 mb-4">
  {Object.keys(newCar)
    .filter(key => key !== 'vin') // 👈 исключаем VIN
    .map(key => (
      typeof newCar[key] === 'boolean' ? (
        <label key={key} className="flex items-center gap-2 border p-2 text-white border-gray-400 rounded-lg">
          <input
            type="checkbox"
            checked={newCar[key]}
            onChange={e => setNewCar(prev => ({ ...prev, [key]: e.target.checked }))}
            className="h-5 w-5 cursor-pointer"
          />
          <span className="text-white">
            {key === "sold" ? (newCar[key] ? "Satilib" : "Stokda") : (newCar[key] ? "Lyuk var" : "Lyuk yox")}
          </span>
        </label>
      ) : (
        <input
          key={key}
          type={typeof newCar[key] === 'number' ? 'number' : 'text'}
          placeholder={key}
          value={newCar[key] === '' || newCar[key] === 0 ? '' : newCar[key]}
          onChange={e => setNewCar(prev => ({
            ...prev,
            [key]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
          }))}
          className="border p-2 text-white border-gray-400 rounded-lg"
        />
      )
    ))}
</div>

      {/* фото */}
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

      {/* видео */}
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

      {/* предпросмотр */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {images.map((file, idx) => (
          <div key={idx} className="relative">
            <img
              src={file instanceof File ? URL.createObjectURL(file) : file}
              alt={`preview ${idx}`}
              className="h-24 w-24 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => setImages(images.filter((_, i) => i !== idx))}
              className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
            >
              X
            </button>
          </div>
        ))}
        {videos.map((file, idx) => (
          <div key={idx} className="relative">
            <video
              src={file instanceof File ? URL.createObjectURL(file) : file}
              className="h-24  w-24 object-cover rounded"
              controls
            />
            <button
              type="button"
              onClick={() => setVideos(videos.filter((_, i) => i !== idx))}
              className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-6"><button
  onClick={handleAddOrUpdateCar}
  className="
    bg-green-500 
    cursor-pointer 
    text-white 
    px-4 py-2 w-full 
    rounded 
    hover:bg-green-600 
    active:bg-green-700 
    transition-colors 
    duration-200">
  {editingCarId ? 'Dəyişiklikləri Saxla' : 'Əlavə et'}
</button>
      </div>
      {/* поиск */}
      <div className='flex items-center gap-4 mb-6'>
        <input
          type="text"
          placeholder="Axtarış"
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          className="border text-white p-2  border-gray-400 w-[80%] rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 cursor-pointer text-white w-[20%] py-2 rounded"
        >
          Axtar
        </button>
      </div>

      {searchResult && (
        <div className="border p-4 mb-6 rounded shadow bg-yellow-50">
          <h3 className="font-bold text-white text-lg mb-2">Axtarış nəticəsi:</h3>
          {searchResult.images && searchResult.images.length > 0 && (
            <img
              src={searchResult.images[0]}
              alt={`${searchResult.marka} ${searchResult.model}`}
              className="h-40 w-full object-cover rounded mb-2"
            />
          )}
          <p><strong>ID:</strong> {searchResult.carId}</p>
          <p><strong>Marka:</strong> {searchResult.marka}</p>
          <p><strong>Model:</strong> {searchResult.model}</p>
          <p><strong>Əlavə tarixi:</strong> {new Date(searchResult.createdAt).toLocaleString()}</p>
          <div className="flex gap-2 mt-2">
            <button
              onClick={() => handleEditCar(searchResult)} 
              className="bg-blue-500 cursor-pointer text-white px-3 py-1 rounded"
            >
              Edit
            </button>
            <button
              onClick={() => handleDeleteCar(searchResult._id)}
              className="bg-red-500 cursor-pointer text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      {/* список */}
      <h2 className="text-xl text-white font-semibold mb-2">Maşınların siyahısı</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map(car => (
          <div key={car._id} className="border p-4 rounded shadow">
            {car.images && car.images.length > 0 && (
              <img
                src={car.images[0]}
                alt={`${car.marka} ${car.model}`}
                className="h-40 w-full object-cover rounded mb-2"
              />
            )}
            <div className='flex gap-4'>
            <p className='text-white'><strong>{car.marka} {car.model}</strong></p>
            <p className='text-white'><strong>Vin: {car.vin}</strong></p>
            </div>
            <p className='text-white'>ID: {car.carId}</p>
            <p className='text-white'>Qiymət: ${car.qiymet}</p>
            <p className='text-white'>Tarix: {new Date(car.createdAt).toLocaleString()}</p>

            <div className="flex  items-center gap-2 mt-2">
              <input
                className='cursor-pointer'
                type="checkbox"
                checked={car.sold}
                onChange={async e => {
                  try {
                    await axios.patch(`https://kcc-back.onrender.com/api/cars/${car._id}/sold`, { sold: e.target.checked });
                    fetchCars();
                  } catch (err) {
                    console.error('ERROR:', err);
                  }
                }}
              />
              <label className={`font-semibold ${car.sold ? 'text-red-500' : 'text-green-500'}`}>
                {car.sold ? 'Satilib' : 'Stokda'}
              </label>
            </div>

            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEditCar(car)}
                className="bg-blue-500 cursor-pointer text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteCar(car._id)}
                className="bg-red-500 cursor-pointer text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
