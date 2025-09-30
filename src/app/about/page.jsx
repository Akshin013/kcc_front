import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col gap-24 p-8 md:p-16">

      {/* Верхняя секция */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-12">
        {/* Текст слева */}
        <div className="md:w-1/2 text-lg font-medium space-y-4 z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-yellow-400 drop-shadow-lg">
            Koreyadan avtomobil almaq artıq sadə və etibarlıdır!
          </h2>
          <p className="text-gray-300">KCC Auto ilə siz:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-200">
            <li>Şəffaf və təhlükəsiz sifariş prosesi əldə edirsiniz.</li>
            <li>Avtomobilin texniki vəziyyətini peşəkar yoxlayırıq.</li>
            <li>Sizin adınıza Koreyada auksion və Encar platformasında ən sərfəli təklifləri alırıq.</li>
            <li>Avtomobil kimyəvi təmizlənərək, parlaq şəkildə Azərbaycana gətirilir və qapınıza çatdırılır.</li>
          </ul>
          <p className="font-semibold text-gray-100 mt-4 bg-gradient-to-r from-yellow-400 to-red-400 bg-clip-text text-transparent">
            Nəticə: İlk və ya yeni avtomobilinizi almaq istəyirsinizsə, KCC Auto ilə proses asan, təhlükəsiz və sərfəlidir!
          </p>
        </div>

        {/* Картинка справа */}
        <div className="md:w-1/2 relative group overflow-hidden rounded-xl shadow-2xl">
          <img
            src="https://res.cloudinary.com/dvm6my9na/image/upload/v1759139388/about_img1_suq8or.jpg"
            alt="KCC Auto"
            className="w-full h-[380px] object-cover object-left transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
        </div>
      </div>

      {/* Нижняя секция */}
      <div className="relative flex flex-col md:flex-row-reverse items-center md:items-start gap-12">
        {/* Текст справа */}
        <div className="md:w-1/2 text-lg font-medium space-y-4 z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-400 drop-shadow-lg">
            Proses sadə, təhlükəsiz və şəffafdır
          </h2>
          <p className="text-gray-200 leading-relaxed">
            Biz Koreyada auksionlarda və Encar platformasında şəxsən iştirak edərək, sizin üçün ən sərfəli və keyfiyyətli avtomobili seçirik. 
            Sifarişinizin hər addımında sizi məlumatlandırır, avtomobili kimyəvi təmizləyərək, Azərbaycana çatdırırıq.
          </p>
        </div>

        {/* Картинка слева */}
        <div className="md:w-1/2 relative group overflow-hidden rounded-xl shadow-2xl">
          <img
            src="https://res.cloudinary.com/dvm6my9na/image/upload/v1759066463/about_img2_ln45qm.jpg"
            alt="KCC Auto"
            className="w-full h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
        </div>
      </div>

    </div>
  );
};

export default About;
