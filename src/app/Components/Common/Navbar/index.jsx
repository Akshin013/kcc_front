'use client'
import React, { useState, useEffect, useRef } from 'react';
import { IoMdHome } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { TbInfoOctagonFilled } from "react-icons/tb";
import { GiHamburgerMenu } from "react-icons/gi";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const links = [
    { href: '/', icon: <IoMdHome size={37} color='#ebc032'/>, label: 'ESAS', color: '#ebc032' },
    { href: '/Favorites', icon: <FaHeart size={46} color='#e62328'/>, label: 'SECILMISDER', color: '#e62328', elevated: true },
    { href: '/about', icon: <TbInfoOctagonFilled size={37} color='#ebc032'/>, label: 'HAKKIMIZDA', color: '#ebc032' },
  ];

  // Закрытие при клике вне меню
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {/* Мобильная навигация (нижняя панель) */}
<div
  className="bg-[#333333] z-50 rounded-lg border border-gray-700 fixed left-0 w-full grid grid-cols-3 gap-3 md:hidden"
  style={{
    bottom: 0,
    paddingBottom: "env(safe-area-inset-bottom)", // учитывает вырезы и панель
    // optional: немного выше, чтобы не прыгало при скролле
  }}
>
  {links.map((link, i) => (
    <Link
      key={i}
      href={link.href}
      className={`flex flex-col items-center gap-0.5 rounded-2xl p-2 ${link.elevated ? '-mt-7' : ''}`}
    >
      {link.icon}
      <p className={`text-xs ${link.elevated ? 'mt-4.5' : ''}`} style={{ color: link.color }}>
        {link.label}
      </p>
    </Link>
  ))}
</div>


      {/* ПК: бургер-меню */}
      <div className="hidden md:flex cursor-pointer flex-col fixed top-2 left-4 z-50 lg:ml-48" ref={menuRef}>
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="bg-[#333333] p-3 rounded-full border border-gray-700"
        >
          <GiHamburgerMenu size={28} color="#ebc032" />
        </button>

        {/* Меню, когда открыто */}
        {isOpen && (
          <div className="mt-2 bg-[#333333] border cursor-pointer border-gray-700 rounded-lg flex flex-col gap-3 p-4 shadow-lg">
            {links.map((link, i) => (
              <Link   
                key={i} 
                href={link.href} 
                onClick={() => setIsOpen(false)} // закрываем при выборе
                className="flex items-center gap-2 p-2 hover:bg-gray-800 rounded"
              >
                {link.icon}
                <span style={{color: link.color}}>{link.label}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
