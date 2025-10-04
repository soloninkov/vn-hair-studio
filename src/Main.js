import React, { useState,useEffect  } from 'react';
import ModalWindow from './ModalWindow';
import AllGallery from './AllGallery';
import Students from './Students';
import Banners from './Banners';
import Hairstyles from './Hairstyles';
import MenHaircuts from './MenHaircuts';
import WomenHaircuts from './WomenHaircuts';
import Theme from './Theme';
import { useTranslation } from "react-i18next";
import "./i18n"; 
const Main = () => {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };
  const { theme, setTheme } = Theme();
  const [isDarkTheme, setIsDarkTheme] = useState(() => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme === 'dark';
  });
  const toggleTheme = () => {
    if (isDarkTheme) {
      lightTheme();
    } else {
      darkTheme();
    }
    setIsDarkTheme(!isDarkTheme);
  };
  
  const lightTheme = () => {
    setTheme('light');
  };
  
  const darkTheme = () => {
    setTheme('dark');
  };
  const [subCategory, setSubCategory] = useState(null);
  const handleSelectCategory = (category) => {
    setSelectedCategory(category);
    setSubCategory(null); 
  };
  const renderComponent = () => {
    if (selectedCategory === 'Banners') {
      return (
        <div style={{ textAlign: 'center' }}>
          <p
            className={`tag ${subCategory === 'Men' ? 'active' : ''}`}
            onClick={() => setSubCategory('Men')}
            style={{ margin: '10px', cursor: 'pointer' }}
          >
            Чоловічі
          </p>
          <p
            className={`tag ${subCategory === 'Women' ? 'active' : ''}`}
            onClick={() => setSubCategory('Women')}
            style={{ margin: '10px', cursor: 'pointer' }}
          >
            Жіночі
          </p>
          <div style={{ marginTop: '20px' }}>
            {subCategory === 'Men' && <MenHaircuts />}
            {subCategory === 'Women' && <WomenHaircuts />}
          </div>
        </div>
      );
    }
    switch (selectedCategory) {
      case 'All':
        return <AllGallery />;
      case 'Students':
        return <Students />;
      case 'Hairstyles':
        return <Hairstyles />;
      default:
        return <AllGallery />;
    }
  };
  
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
const [scroll, setScroll] = useState(0);
const scrollUp = () => {
    setScroll(window.scrollY)
}

const upButton = () => {
    window.scrollTo({top: 0, left: 0, behavior: 'smooth'})
}

useEffect(() => {
    window.addEventListener("scroll", scrollUp)
}, [])

const toBlock = (height) => {
    window.scrollTo({top: height, left: 0, behavior: 'smooth'})
};
const [isMenuOpen, setIsMenuOpen] = React.useState(false);

function toggleBurgerMenu() {
  setIsMenuOpen((prev) => !prev);
}
const resizeObserver = new ResizeObserver((entries) => {
  for (let entry of entries) {
      setTimeout(() => {
      
      }, 0);
  }
});

  return (
    <div>
 <header>
  <div className="navigation">
    <div className="header-content">
    <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
      <a onClick={upButton}> {t("about-me")}</a>
      <a onClick={(e) => toBlock(e.target.getAttribute("height"))} height="700">
      {t("services")}
      </a>
      <a onClick={(e) => toBlock(e.target.getAttribute("height"))} height="1370">
      {t("portfolio")}
      </a>
      <a onClick={(e) => toBlock(e.target.getAttribute("height"))} height="2120">
        {t("prices")}     
      </a>
      <a onClick={(e) => toBlock(e.target.getAttribute("height"))} height="2880">
      {t("map")} 
      </a>
      <a onClick={(e) => toBlock(e.target.getAttribute("height"))} height="3800">
     
        {t("teach")} 
      
      </a>
    </nav>
      
      <div className="header-button">
      <div className="switch" onClick={toggleTheme}>
        <div
          className={theme === "light" ? "theme light" : "theme dark"}
          style={{
            transform: isDarkTheme ? "translateX(38px)" : "translate(0)",
          }}
        ></div>
      </div>
            <button onClick={() => changeLanguage("uk")} className="ua" ></button>
            <button onClick={() => changeLanguage("cs")} className="cz"  ></button>  
  <button onClick={handleOpenModal} className="btn">
   {t("contact")}
  </button>
  <div className="burger-menu" onClick={toggleBurgerMenu}></div>
</div>
    
    </div> 
  </div>
</header>
        <ModalWindow show={showModal} onClose={handleCloseModal}>
        <h2   style={{  color: "#4824ff" }}> {t("contact")} </h2>
        <p style={{ fontSize: "25px" }}>
        {t("modal")}</p>
        </ModalWindow>
<section className='welcome__container'>
       <div className='welcome-block '>
        <div className='first-block'>
           <h1> {t("hairdresser")} <span className='title'>{t("stylist")}</span></h1> 
          <h2 style={{ marginBottom: "7%", marginTop: "7%" }}>
          {t("create")} <span style={{ color: "#4824ff" }}>{t("best")}</span> <br /> {t("unique")}
            <span style={{ color: "#4824ff" }}> {t("image")} </span> <br /> {t("style")} <span style={{ color: "#4824ff" }}>{t("you")} </span>
          </h2>
          <h3>  {t("work")} <span style={{ color: "#4824ff" }}> {t("year")}</span></h3>
        </div>
        <div className="main-image-box"> 
     
        <img className="first-image-layer" src="/images/prson.png" alt="Person" draggable="false" /> 
        <img className="second-image-layer" src={theme === 'light' 
         ? '/images/bacground.png ' 
         : '/images/bacground-b.png'} alt="Background" draggable="false" />
          </div>
          </div> 
          
</section>  
<section className='service__container'>
   <div className="service-block " draggable="false">
    <h2 className='service-title' style={{ fontSize: "clamp(1.25rem, 0.523rem + 3.64vw, 3.25rem)" }}> {t("services")}</h2>
    <p style={{ fontSize: "clamp(1.25rem, 1.091rem + 0.8vw, 1.688rem)" }}> <span style={{ color: "#4824ff" }}>{t("vyberuvam")} </span> 
    {t("forma")}
    </p>
    <div className="service-block-grid">
        <p className="tag-i"><span className={theme === 'light'  ? "tag-icon icon-dark" : "tag-icon icon-light" } />Жіночі стрижки: класика та тренди</p>
        <p className="tag-i"><span className={theme === 'light'  ? "tag-icon icon-dark" : "tag-icon icon-light" } />Класичні та сучасні чоловічі стрижки</p>
        <p className="tag-i"><span className={theme === 'light'  ? "tag-icon icon-dark" : "tag-icon icon-light" } />Моделювання та оформлення бороди</p>
        <p className="tag-i"><span className={theme === 'light'  ? "tag-icon icon-dark" : "tag-icon icon-light" } />Підберу для вас найкращий догляд за волоссям</p>
     
    </div>
    <p style={{ fontSize: "27px" }}>Для запису пишіть у повідомлення або телефонуйте</p>
    <p className='tag-1' onClick={handleOpenModal}>
    {t("contact")}
    </p>
   </div>
</section>
<div className="portfolio-block __slider">
  <div className="first-block">
    <h2 className="title-portfolio-h2">
      <span className="title-portfolio">{t("portfolio")}</span>
    </h2>
  </div>
  <div className="tag-container">
    <p
      className={`tag ${selectedCategory === 'All' ? 'selected' : ''}`}
      onClick={() => handleSelectCategory('All')}
    >
      Всі роботи
    </p>
    <p
      className={`tag ${selectedCategory === 'Banners' ? 'selected' : ''}`}
      onClick={() => handleSelectCategory('Banners')}
    >
      Стрижки
    </p>
    <p
      className={`tag ${selectedCategory === 'Hairstyles' ? 'selected' : ''}`}
      onClick={() => handleSelectCategory('Hairstyles')}
    >
      Зачіски
    </p>
    <p
      className={`tag ${selectedCategory === 'Students' ? 'selected' : ''}`}
      onClick={() => handleSelectCategory('Students')}
    >
     Роботи учнів
    </p>
  </div>
  <div className="content" style={{ marginLeft: "-5vw", marginRight: "-5vw" }}>
    {renderComponent()}
  </div>
</div>
<section className='price__container'>
   <div className="price-block __container" draggable="false">
  <h3 className="title-price" style={{ fontSize: "clamp(2.5rem, 1.136rem + 6.82vw, 6.25rem)" }}> {t("prices")} </h3>
  <div className="price-block-content">
    
 <div className='logo__price'>
<img
  src={theme === "light" ? "/images/black_logo.svg" : "/images/white_logo.svg"}
  alt="Theme icon"
  className="price-image"
/>
</div>
    <div className="price-block-half prices-block">
      <div className="price-block-grid">
        <p className="tag-price">
          <span className="service-name"> Жіночі</span>
          <span className="price-wrapper">
            <span className="price-value">450</span>
            <span className="icon-price"></span>
          </span>
        </p>
        <p className="tag-price">
          <span className="service-name">Чоловічі</span>
          <span className="price-wrapper">
            <span className="price-value">400</span>
            <span className="icon-price"></span>
          </span>
        </p>
        <p className="tag-price">
          <span className="service-name">Чубчик</span>
          <span className="price-wrapper">
            <span className="price-value">150</span>
            <span className="icon-price"></span>
          </span>
        </p>
        <p className="tag-price">
          <span className="service-name">Борода</span>
          <span className="price-wrapper">
            <span className="price-value">200</span>
            <span className="icon-price"></span>
          </span>
        </p>
        <p className="tag-price">
          <span className="service-name">Зачіска</span>
          <span className="price-wrapper">
            <span className="price-value">1000</span>
            <span className="icon-price"></span>
          </span>
        </p>
        <p className="tag-price">
          <span className="service-name">Мейкап </span>
          <span className="price-wrapper">
            <span className="price-value">650</span>
            <span className="icon-price"></span>
          </span>
        </p>
       
      </div>
    </div>
  </div>
</div>
</section>
<section className="map__container">
  <div>
    <h3 className="title-map">
      Як мене <span className="map-span">Знайти</span>
    </h3>
    <div className="content-block">
     
      <div className="vertical-video-container">
        <video className="vertical-video" controls>
          <source src="/video/maps.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="content-half map-block">
        <div className="styled-map-container">
          <iframe
            className="google-map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2721.2208860600667!2d14.474365058685253!3d48.9740595753833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47734fcf0b636475%3A0x68b45bdab16ced4d!2zT2tyZXNuw60gc2RydcW-ZW7DrSDEjGVza8OpIHVuaWUgc3BvcnR1!5e1!3m2!1suk!2scz!4v1733785900393!5m2!1suk!2scz"
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</section>

 
<section className='teach__container'>
  <h4 style={{ fontSize: "80px", paddingBottom: "10px" }}>
    Я <span className='teach'>навчаю</span>
  </h4>
  <div className="card-container">

    {/* Картка: Барбер */}
    <div className="card" style={{ '--bi': 'repeating-linear-gradient(30deg, #01014d 0 0.25em, #1806b3 0 1em)' }}>
      <h3 className='point__title'>💈 {t("barber")}</h3>
      <ul className="guarantees-points">
        <li className="point"><span className="icon">✂️</span> {t("fade")}</li>
        <li className="point"><span className="icon">📖</span> {t("teorie")}</li>
        <li className="point"><span className="icon">👱‍♂️</span> {t("analyza")}</li>
        <li className="point"><span className="icon">💡</span> {t("tipy")}</li>
        <li className="point"><span className="icon">✅</span> {t("zkouska")}</li>
        <li className="point"><span className="icon">🚀</span> {t("start")}</li>
      </ul>
      <div className="price__teach">{t("cena")}: 12000 Kč <span className="price__icon"></span></div>
      <div className="layers">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="layer" key={index} style={{ '--tz': `${index * -4}px` }}></div>
        ))}
      </div>
    </div>

    {/* Картка: Жіночий курс */}
    <div className="card" style={{ '--bi': 'repeating-linear-gradient(30deg, #01014d 0 0.25em, #1806b3 0 1em)' }}>
      <h3 className='point__title'>✂️ {t("damskych")} </h3>
      <ul className="guarantees-points">
        <li className="point"><span className="icon">✂️</span> {t("znalosti")}</li>
        <li className="point"><span className="icon">🕢</span> {t("praxe")}</li>
        <li className="point"><span className="icon">🤵‍♀️</span> {t("vyber")}</li>
        <li className="point"><span className="icon">🧑‍🧑‍🧒‍🧒</span>{t("komunikace")} </li>
        <li className="point"><span className="icon">✅</span>{t("zkouska")} </li>
        <li className="point"><span className="icon">🚀</span>{t("kadernici")} </li>
      </ul>
      <div className="price__teach">{t("cena")}: 12000 Kč <span className="price__icon"></span></div>
      <div className="layers">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="layer" key={index} style={{ '--tz': `${index * -4}px` }}></div>
        ))}
      </div>
    </div>

    {/* Картка: Комбінований */}
    <div className="card" style={{ '--bi': 'repeating-linear-gradient(30deg, #01014d 0 0.25em, #1806b3 0 1em)' }}>
      <h3 className='point__title'>💈✂️ {t("kombi")} </h3>
      <ul className="guarantees-points">
        <li className="point"><span className="icon">📘</span> {t("techniky")}</li>
        <li className="point"><span className="icon">✂️</span> {t("mikado")}</li>
        <li className="point"><span className="icon">👥</span> {t("modelech")}</li>
        <li className="point"><span className="icon">📝</span> {t("samostatna")}</li>
        <li className="point"><span className="icon">✅</span> {t("certifikat")}</li>
        <li className="point"><span className="icon">🚀</span> {t("jistita")}</li>
      </ul>
      <div className="price__teach">{t("cena")}: 20000 Kč <span className="price__icon"></span></div>
      <div className="layers">
        {Array.from({ length: 10 }).map((_, index) => (
          <div className="layer" key={index} style={{ '--tz': `${index * -4}px` }}></div>
        ))}
      </div>
    </div>
  </div>
</section>


  
 <div className='footer'>VN Hair Studio</div>
<button className={scroll <1960 ? "": "btn-up" } onClick={upButton}></button>



   </div>
   
  );
};
export default Main;
