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
    marka: '',
    model: '',
    versiya: '',
    yerSayi: 5,
    lyuk: false,
    il: 2020,
    km: 0,
    boya: '',
    deyisen: '',
    yanacaq: '',
    qiymet: 0,
    sold: false
  });
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [searchResult, setSearchResult] = useState(null);

  const ADMIN_USERNAME = 'a';
  const ADMIN_PASSWORD = 'a';

  // Получение машин
  const fetchCars = async () => {
    try {
      const res = await axios.get('https://kcc-back.onrender.com/api/cars');
      const sorted = res.data.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
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

  // Добавление или редактирование машины
  const handleAddOrUpdateCar = async () => {
    try {
      const formData = new FormData();

      // данные машины
      Object.keys(newCar).forEach(key => {
        formData.append(key, newCar[key]);
      });

      // картинки
      if (images.length > 0) {
        images.forEach(file => formData.append("images", file));
      }

      // видео
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
        yerSayi: 5,
        lyuk: false,
        il: 2020,
        km: 0,
        boya: '',
        deyisen: '',
        yanacaq: '',
        qiymet: 0,
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
  // приводим строку к числу
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
    marka: car.marka,
    model: car.model,
    versiya: car.versiya,
    yerSayi: car.yerSayi,
    lyuk: car.lyuk,
    il: car.il,
    km: car.km,
    boya: car.boya,
    deyisen: car.deyisen,
    yanacaq: car.yanacaq,
    qiymet: car.qiymet,
    sold: car.sold
  });
  setEditingCarId(car._id);

  // если нужно, можно подставить изображения и видео
  // setImages(car.images || []);
  // setVideos(car.videos || []);
};


  if (!isLoggedIn) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Admin giriş</h1>
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
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Admin panel</h1>
      <h2 className="text-xl font-semibold mb-2">{editingCarId ? 'Maşını düzəldin' : 'Əlavə et'}</h2>
      
      <div className="grid grid-cols-2 gap-2 mb-4">
 {Object.keys(newCar).map(key => (
  <input
    key={key}
    type={typeof newCar[key] === 'number' ? 'number' : 'text'}
    placeholder={key}
    value={newCar[key]}   // показываем текущее значение
    onChange={e => setNewCar({
      ...newCar,
      [key]: e.target.type === 'number' ? Number(e.target.value) : e.target.value
    })}
    className="border p-2 text-white border-gray-400 rounded-lg"
  />
))}

      </div>
      <div className="mb-4">
        <label className="block mb-1 font-semibold">Foto:</label>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={e => setImages(prev => [...prev, ...Array.from(e.target.files)])}
          className="border p-2 w-full text-white border-gray-400 rounded-lg"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 font-semibold">Video:</label>
        <input
          type="file"
          multiple
          accept="video/*"
          onChange={e => setVideos(prev => [...prev, ...Array.from(e.target.files)])}
          className="border p-2 w-full text-white border-gray-400 rounded-lg"
        />
      </div>

      {/* предпросмотр новых фото */}
      <div className="mb-4 flex gap-2 flex-wrap">
        {images.map((file, idx) => (
          <div key={idx} className="relative">
            <img
              src={URL.createObjectURL(file)}
              alt={`preview ${idx}`}
              className="h-24 w-24 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => setImages(images.filter((_, i) => i !== idx))}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
            >
              X
            </button>
          </div>
        ))}
        {videos.map((file, idx) => (
          <div key={idx} className="relative">
            <video
              src={URL.createObjectURL(file)}
              className="h-24 w-24 object-cover rounded"
              controls
            />
            <button
              type="button"
              onClick={() => setVideos(videos.filter((_, i) => i !== idx))}
              className="absolute top-0 right-0 bg-red-500 text-white text-xs px-1 rounded"
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={handleAddOrUpdateCar}
          className="bg-green-500 text-white px-4 py-2 w-full rounded"
        >
          {editingCarId ? 'Dəyişiklikləri Saxla' : 'Əlavə et'}
        </button>
        </div>
        
        <div className='flex items-center gap-4 mb-6'>       
          <input
          type="text"
          placeholder="Axtarış"
          value={searchId}
          onChange={e => setSearchId(e.target.value)}
          className="border p-2 border-gray-400 w-[80%] rounded-lg"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white  w-[20%] py-2 rounded"
        >
          Axtar
        </button>
      </div>

      {searchResult && (
        <div className="border p-4 mb-6 rounded shadow bg-yellow-50">
          <h3 className="font-bold text-lg mb-2">Axtarış nəticəsi:</h3>
          {/* <p><strong>ID:</strong> {searchResult.images}</p> */}
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
            className="bg-blue-500 text-white px-3 py-1 rounded">
            Edit
          </button>
            <button
              onClick={() => handleDeleteCar(searchResult._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      )}

      <h2 className="text-xl font-semibold mb-2">Maşınların siyahısı</h2>
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
    <p className='text-white'><strong>{car.marka} {car.model}</strong></p>
    <p className='text-white'>ID: {car.carId}</p>
    <p className='text-white'>Qiymət: ${car.qiymet}</p>
    <p className='text-white'>Tarix: {new Date(car.createdAt).toLocaleString()}</p>

    {/* Чекбокс “Продана” */}
    <div className="flex items-center gap-2 mt-2">
      <input
        type="checkbox"
        checked={car.sold}
        onChange={async e => {
          try {
            await axios.patch(`https://kcc-back.onrender.com/api/cars/${car._id}/sold`, { sold: e.target.checked });
            fetchCars();
          } catch (err) {
            console.error('Ошибка обновления статуса продано:', err);
          }
        }}
      />
      <label htmlFor={`sold-${car._id}`} className={`font-semibold ${car.sold ? 'text-red-500' : 'text-green-500'}`}>
        {car.sold ? 'Satilib' : 'Stokda'}
      </label>
    </div>
    <div className="flex gap-2 mt-2">
<button
  onClick={() => handleEditCar(car)} // передаем весь объект машины
  className="bg-blue-500 text-white px-2 py-1 rounded"
>
  Edit
</button>

      <button
        onClick={() => handleDeleteCar(car._id)}
        className="bg-red-500 text-white px-2 py-1 rounded"
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
