import React from 'react'

const About = () => {
  return (
<div
  className="min-h-screen bg-cover bg-center"
  // style={{ backgroundImage: "url('https://res.cloudinary.com/dvm6my9na/image/upload/v1759066463/about_img_main_hclw3i.jpg')" }}
>
  {/* Верхняя половина */}
  <div className="relative flex h-1/2 items-center justify-start px-8 overflow-visible">
    {/* Текст слева */}
    <div className="w-1/2 text-white text-lg font-medium z-10">
      <p>
Koreyadan avtomobil almaq istəyirsiniz, amma risklər sizi narahat edir? Narahat olmağa
dəyməz! KCC Auto ilə bu proses etibarlı, şəffaf və rahat olacaq.
Əsas hissə
Biz Koreyada auksionlarda və Encar platformasında şəxsən iştirak edib, sizin üçün ən sərfəli və
keyfiyyətli avtomobili seçirik. Avtomobilin texniki vəziyyətini yerində, peşəkar şəkildə yoxlayır,
araşdırırıq. Sifarişinizin hər addımında sizi məlumatlandırır, prosesi şəffaf şəkildə aparırıq.
Avtomobiliniz kimyəvi təmizləmədən və sonra maşın Azərbaycana göndərilir və qapınıza
çatdırılır.
Sonluq
Siz də Koreyadan etibarlı və uyğun qiymətə avtomobil almaq istəyirsinizsə, KCC Auto ilə əlaqə
saxlayın. Biz bu yolda yanınızdayıq!
      </p>
    </div>

    {/* Картинка выступает вправо */}
    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1/2 overflow-visible">
      <img
        src="https://res.cloudinary.com/dvm6my9na/image/upload/v1759066463/about_img1_udsgmv.jpg"
        alt="KCC"
        className="w-full object-cover"
      />
    </div>
  </div>

  {/* Нижняя половина */}
  <div className="relative flex h-1/2 items-center justify-end px-8 overflow-visible">
    {/* Картинка слева выступает */}
    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1/2 overflow-visible">
      <img
        src="https://res.cloudinary.com/dvm6my9na/image/upload/v1759066463/about_img2_ln45qm.jpg"
        alt="KCC"
        className="w-full object-cover"/>
    </div>

    {/* Текст справа */}
    <div className="w-1/2 text-white text-lg font-medium z-10">
      <p>
Çoxları düşünür ki, Koreyadan avtomobil gətirmək çətindir, risklidir… Ancaq KCC Auto ilə bu
proses düşündüyünüzdən daha sadə və etibarlıdır.
Əsas hissə
Gəlin, proseslə birlikdə tanış olaq:
1⃣ İstədiyiniz avtomobili seçin.
2⃣ KCC Auto auksionda və ya Encar platformasında sizin adınıza qiymət təklifləri verir.
3⃣ Seçdiyiniz avtomobil Koreyada ödənişsiz yoxlanılır.
4⃣ Avtomobil kimyəvi təmizlənir və parladılır.
5⃣ 75–90 gün ərzində nəqliyyat ilə göndərilir və gömrükdən keçir.
6⃣ Avtomobiliniz Bakıda sizə təhvil verilir.
Sonluq
Avtomobilini yeniləmək istəyirsən? Və ya ilk maşınını almağı düşünürsən? KCC Auto ilə bu
proses asan, şəffaf və təhlükəsiz olacaq! Bizə yazın ən uyğun avtomobili birliktə tapaq!</p>
    </div>
  </div>
</div>

  )
}

export default About
