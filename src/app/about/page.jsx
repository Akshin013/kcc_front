import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-[#111111] text-white flex flex-col gap-16 p-8">

      {/* Верхняя секция */}
      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
        {/* Текст слева */}
        <div className="md:w-1/2 text-lg font-medium space-y-4 z-10">
          <h2 className="text-3xl font-bold">Koreyadan avtomobil almaq artıq sadə və etibarlıdır!</h2>
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
        </div>

        {/* Картинка справа */}
<div className="md:w-1/2 relative">
  <img
    src="https://res.cloudinary.com/dvm6my9na/image/upload/v1759139388/about_img1_suq8or.jpg"
    alt="KCC Auto"
    className="w-full h-[350px] object-cover object-left rounded-lg shadow-lg"
  />
</div>

      </div>

      {/* Нижняя секция */}
      <div className="relative flex flex-col md:flex-row-reverse items-center md:items-start gap-8">
        {/* Текст справа */}
        <div className="md:w-1/2 text-lg font-medium space-y-4 z-10">
          <h2 className="text-3xl font-bold">Proses sadə, təhlükəsiz və şəffafdır</h2>
          <p>
            Biz Koreyada auksionlarda və Encar platformasında şəxsən iştirak edərək, sizin üçün ən sərfəli və keyfiyyətli avtomobili seçirik. 
            Sifarişinizin hər addımında sizi məlumatlandırır, avtomobili kimyəvi təmizləyərək, Azərbaycana çatdırırıq.
          </p>
        </div>

        {/* Картинка слева */}
        <div className="md:w-1/2 relative">
          <img
            src="https://res.cloudinary.com/dvm6my9na/image/upload/v1759066463/about_img2_ln45qm.jpg"
            alt="KCC Auto"
            className="w-full h-[350px] object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

    </div>
  );
};

export default About;
  
