"use client";
import { useEffect, useState } from "react";

export default function Like  () {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favs = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(favs);
  }, []);

  const removeFromFavorites = (id) => {
    const updated = favorites.filter(car => car.id !== id);
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  return (
    <div>
      <h1>Избранные машины ⭐</h1>
      {favorites.length === 0 && <p>Пока пусто</p>}
      <ul>
        {favorites.map(car => (
<li key={car.id}>
  {car.marka} {car.model} ({car.il}) - {car.qiymet}$
  <p>KM: {car.km}, Yanacaq: {car.yanacaq}</p>
  <button onClick={() => removeFromFavorites(car.id)}>❌</button>
</li>

        ))}
      </ul>
    </div>
  );
}
