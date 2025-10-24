'use client'
import React from 'react';
import { motion } from 'framer-motion';

const About = () => {
  // Анимация для текста и картинок
  const textVariantLeft = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const textVariantRight = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const imageVariantLeft = {
    hidden: { opacity: 0, x: -50, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8 } },
  };

  const imageVariantRight = {
    hidden: { opacity: 0, x: 50, scale: 0.95 },
    visible: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.8 } },
  };

  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col gap-24 p-8 md:p-16">

      {/* Верхняя секция */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Текст слева */}
        <motion.div
          className="md:w-1/2 text-lg font-medium space-y-4 z-10"
          variants={textVariantLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Koreyadan avtomobil almaq artıq sadə və etibarlıdır!
          </h2>
          <p>KCC Auto ilə siz:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Şəffaf və təhlükəsiz sifariş prosesi əldə edirsiniz.</li>
            <li>Avtomobilin texniki vəziyyətini peşəkar yoxlayırıq.</li>
            <li>Sizin adınıza Koreyada auksion və Encar platformasında ən sərfəli təklifləri alırıq.</li>
            <li>Avtomobil kimyəvi təmizlənərək, parlaq şəkildə Azərbaycana gətirilir və qapınıza çatdırılır.</li>
          </ul>
          <p className="font-semibold mt-4">
            Nəticə: İlk və ya yeni avtomobilinizi almaq istəyirsinizsə, KCC Auto ilə proses asan, təhlükəsiz və sərfəlidir!
          </p>
        </motion.div>

        {/* Картинка справа */}
        <motion.div
          className="md:w-1/2 relative group overflow-hidden rounded-xl shadow-2xl"
          variants={imageVariantRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="https://res.cloudinary.com/dvm6my9na/image/upload/v1759139388/about_img1_suq8or.jpg"
            alt="KCC Auto"
            className="w-full h-[380px] object-cover object-[14%] transition-transform duration-700 group-hover:scale-105 lg:h-[450px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
        </motion.div>
      </div>

      {/* Нижняя секция */}
      <div className="relative flex mb-20 flex-col md:flex-row-reverse items-center md:items-start gap-12">
        {/* Текст справа */}
        <motion.div
          className="md:w-1/2 text-lg font-medium space-y-4 z-10"
          variants={textVariantRight}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold">
            Proses sadə, təhlükəsiz və şəffafdır
          </h2>
          <p className="leading-relaxed">
            Biz Koreyada auksionlarda və Encar platformasında şəxsən iştirak edərək, sizin üçün ən sərfəli və keyfiyyətli avtomobili seçirik. 
            Sifarişinizin hər addımında sizi məlumatlandırır, avtomobili kimyəvi təmizləyərək, Azərbaycana çatdırırıq.
          </p>
        </motion.div>

        {/* Картинка слева */}
        <motion.div
          className="md:w-1/2 relative group overflow-hidden rounded-xl shadow-2xl"
          variants={imageVariantLeft}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <img
            src="https://res.cloudinary.com/dvm6my9na/image/upload/v1759066463/about_img2_ln45qm.jpg"
            alt="KCC Auto"
            className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105 lg:h-[450px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
        </motion.div>
      </div>

    </div>
  );
};

export default About;
