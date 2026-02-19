import React, { useState, useEffect, useRef } from 'react';
import ModalWindow from './ModalWindow';
import AllGallery from './AllGallery';
import Students from './Students';
import Hairstyles from './Hairstyles';
import MenHaircuts from './MenHaircuts';
import WomenHaircuts from './WomenHaircuts';
import Theme from './Theme';
import { useTranslation } from "react-i18next";
import "./i18n"; 

const Main = () => {
  // Бургер-меню - виносимо ВГОРУ, щоб використовувати в useEffects
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Рефи для секцій
  const servicesRef = useRef(null);
  const portfolioRef = useRef(null);
  const pricesRef = useRef(null);
  const mapRef = useRef(null);
  const teachRef = useRef(null);
  const onlineCourseRef = useRef(null);
  
  // Стан для модального вікна курсу
  const [isCourseLoginOpen, setIsCourseLoginOpen] = useState(false);
  const [showCoursePassword, setShowCoursePassword] = useState(false);
  const [courseEmail, setCourseEmail] = useState("");
  const [coursePassword, setCoursePassword] = useState("");
  const [courseError, setCourseError] = useState("");
  const [courseLoading, setCourseLoading] = useState(false);

  // Функції для відкриття/закриття модального вікна курсу
  const openCourseLogin = () => setIsCourseLoginOpen(true);

  const closeCourseLogin = () => {
    setIsCourseLoginOpen(false);
    setCourseError("");
    setCourseLoading(false);
  };

  // Закриття попапу по ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        closeCourseLogin();
        if (isMenuOpen) setIsMenuOpen(false); // Закриваємо і меню
      }
    };

    if (isCourseLoginOpen || isMenuOpen) {
      document.addEventListener("keydown", handleEsc);
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
    };
  }, [isCourseLoginOpen, isMenuOpen]);

  // Інтернаціоналізація
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  // Тема
  const { theme, setTheme } = Theme();
  
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  // Категорії портфоліо
  const [subCategory, setSubCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');

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

  // Модальне вікно контактів
  const [showModal, setShowModal] = useState(false);
  
  const handleOpenModal = () => {
    setShowModal(true);
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Прокрутка
  const [scroll, setScroll] = useState(0);
  
  const scrollUp = () => {
    setScroll(window.scrollY);
  };

  const upButton = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
    setIsMenuOpen(false); // Закриваємо меню при скролі наверх
  };

  useEffect(() => {
    window.addEventListener("scroll", scrollUp);
    
    return () => {
      window.removeEventListener("scroll", scrollUp);
    };
  }, []);

  // Функція для точного скролу до заголовків з врахуванням хедера
  const scrollToElement = (ref, offset = 80) => {
    if (ref.current) {
      const element = ref.current;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
  };

  // Функції для прокрутки до секцій з offset для хедера
  const scrollToServices = () => {
    scrollToElement(servicesRef, 100);
  };

  const scrollToPortfolio = () => {
    scrollToElement(portfolioRef, 100);
  };

  const scrollToPrices = () => {
    scrollToElement(pricesRef, 100);
  };

  const scrollToMap = () => {
    scrollToElement(mapRef, 100);
  };

  const scrollToTeach = () => {
    scrollToElement(teachRef, 100);
  };

  const scrollToOnlineCourse = () => {
    scrollToElement(onlineCourseRef, 100);
  };

  const toggleBurgerMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Закриття меню при кліку поза ним
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div>
      {/* Header */}
      <header>
        <div className="navigation">
          <div className="header-content" ref={menuRef}>
            <nav className={`menu ${isMenuOpen ? "open" : ""}`}>
              <a onClick={upButton}> {t("about-me")}</a>
              <a onClick={scrollToServices}> {t("services")}</a>
              <a onClick={scrollToPortfolio}> {t("portfolio")}</a>
              <a onClick={scrollToPrices}> {t("prices")}</a>
              <a onClick={scrollToMap}> {t("map")}</a>
              <a onClick={scrollToTeach}> {t("teach")}</a>
            </nav>
            
            <div className="header-button">
              <div className="switch" onClick={toggleTheme}>
                <div
                  className={`theme ${theme}`}
                  style={{
                    transform: theme === 'dark' ? "translateX(38px)" : "translate(0)",
                  }}
                ></div>
              </div>
              <button onClick={() => changeLanguage("uk")} className="ua"></button>
              <button onClick={() => changeLanguage("cs")} className="cz"></button>  
              <button onClick={handleOpenModal} className="btn">
                {t("contact")}
              </button>
              <div 
                className={`burger-menu ${isMenuOpen ? "open" : ""}`} 
                onClick={toggleBurgerMenu}
              ></div>
            </div>
          </div> 
        </div>
      </header>

      {/* Модальне вікно контактів */}
      <ModalWindow show={showModal} onClose={handleCloseModal}>
        <h2 style={{ color: "black" }}> {t("contact")} </h2>
        <p style={{ fontSize: "25px" }}>
          {t("modal")}
        </p>
      </ModalWindow>

      {/* Welcome Section */}
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
            <img
              className="first-image-layer"
              src={`${process.env.PUBLIC_URL}/images/prson.png`}
              alt="Person"
              draggable="false"
            />
            <img
              className="second-image-layer"
              src={
                theme === 'light'
                  ? `${process.env.PUBLIC_URL}/images/bacground.png`
                  : `${process.env.PUBLIC_URL}/images/bacground-b.png`
              }
              alt="Background"
              draggable="false"
            />
          </div>
        </div> 
      </section>  

      {/* Services Section - Додаємо ref */}
      <section className='service__container' ref={servicesRef}>
        <div className="service-block " draggable="false">
          <h2 className='service-title' style={{ fontSize: "clamp(1.25rem, 0.523rem + 3.64vw, 3.25rem)" }}> {t("services")}</h2>
          <p style={{ fontSize: "clamp(1.25rem, 1.091rem + 0.8vw, 1.688rem)" }}> 
            <span style={{ color: "#4824ff" }}>{t("vyberuvam")} </span> 
            {t("forma")}
          </p>
          <div className="service-block-grid">
            <p className="tag-i">
              <span className={theme === 'light' ? "tag-icon icon-dark" : "tag-icon icon-light" } />
              Жіночі стрижки: класика та тренди
            </p>
            <p className="tag-i">
              <span className={theme === 'light' ? "tag-icon icon-dark" : "tag-icon icon-light" } />
              Класичні та сучасні чоловічі стрижки
            </p>
            <p className="tag-i">
              <span className={theme === 'light' ? "tag-icon icon-dark" : "tag-icon icon-light" } />
              Моделювання та оформлення бороди
            </p>
            <p className="tag-i">
              <span className={theme === 'light' ? "tag-icon icon-dark" : "tag-icon icon-light" } />
              Підберу для вас найкращий догляд за волоссям
            </p>
          </div>
          <p style={{ fontSize: "27px" }}>Для запису пишіть у повідомлення або телефонуйте</p>
          <p className='tag-1' onClick={handleOpenModal}>
            {t("contact")}
          </p>
        </div>
      </section>

      {/* Portfolio Section - Додаємо ref */}
      <div className="portfolio-block __slider" ref={portfolioRef}>
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

      {/* Price Section - Додаємо ref */}
      <section className='price__container' ref={pricesRef}>
        <div className="price-block __container" draggable="false">
          <h3 className="title-price" style={{ fontSize: "clamp(2.5rem, 1.136rem + 6.82vw, 6.25rem)" }}> {t("prices")} </h3>
          <div className="price-block-content">
            <div className="logo__price">
              <img
                src={
                  theme === "light"
                    ? `${process.env.PUBLIC_URL}/images/black_logo.svg`
                    : `${process.env.PUBLIC_URL}/images/white_logo.svg`
                }
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

      {/* Map Section - Додаємо ref */}
      <section className="map__container" ref={mapRef}>
        <div>
          <h3 className="title-map">
            Як мене <span className="map-span">Знайти</span>
          </h3>
          <div className="content-block">
            <div className="vertical-video-container">
              <video className="vertical-video" controls>
                <source src={`${process.env.PUBLIC_URL}/video/maps.mp4`} type="video/mp4" />
                Ваш браузер не підтримує відео тег.
              </video>
            </div>
            <div className="content-half map-block">
              <div className="styled-map-container">
                <iframe
                  className="google-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2731.376921872959!2d14.478628276413977!3d48.97541089246433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47734f7d3ab30327%3A0x5dd8bbcab3f22188!2sVN%20Hair%20Studio!5e1!3m2!1sru!2scz!4v1771524131056!5m2!1sru!2scz" 
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Teach Section - Додаємо ref */}
      <section className='teach__container' ref={teachRef}>
        <h4 style={{ fontSize: "80px", paddingBottom: "10px" }}>
          Я <span className='teach'>навчаю</span>
        </h4>

        <div className="card-container">
          {/* Картка: Барбер */}
          <div className="card card--barber">
            <h3 className='point__title'>💈 {t("barber")}</h3>
            <ul className="guarantees-points">
              <li className="point"><span className="icon">✂️</span> {t("fade")}</li>
              <li className="point"><span className="icon">📖</span> {t("teorie")}</li>
              <li className="point"><span className="icon">👱‍♂️</span> {t("analyza")}</li>
              <li className="point"><span className="icon">💡</span> {t("tipy")}</li>
              <li className="point"><span className="icon">✅</span> {t("zkouska")}</li>
              <li className="point"><span className="icon">🚀</span> {t("start")}</li>
            </ul>
            <div className="price__teach">
              {t("cena")}: 12000 Kč <span className="price__icon"></span>
            </div>
          </div>

          {/* Картка: Жіночий курс */}
          <div className="card card--female">
            <h3 className='point__title'>✂️ {t("damskych")} </h3>
            <ul className="guarantees-points">
              <li className="point"><span className="icon">✂️</span> {t("znalosti")}</li>
              <li className="point"><span className="icon">🕢</span> {t("praxe")}</li>
              <li className="point"><span className="icon">🤵‍♀️</span> {t("vyber")}</li>
              <li className="point"><span className="icon">🧑‍🧑‍🧒‍🧒</span> {t("komunikace")}</li>
              <li className="point"><span className="icon">✅</span> {t("zkouska")}</li>
              <li className="point"><span className="icon">🚀</span> {t("kadernici")}</li>
            </ul>
            <div className="price__teach">
              {t("cena")}: 12000 Kč <span className="price__icon"></span>
            </div>
          </div>

          {/* Картка: Комбінований */}
          <div className="card card--combo">
            <h3 className='point__title'>💈✂️ {t("kombi")} </h3>
            <ul className="guarantees-points">
              <li className="point"><span className="icon">📘</span> {t("techniky")}</li>
              <li className="point"><span className="icon">✂️</span> {t("mikado")}</li>
              <li className="point"><span className="icon">👥</span> {t("modelech")}</li>
              <li className="point"><span className="icon">📝</span> {t("samostatna")}</li>
              <li className="point"><span className="icon">✅</span> {t("certifikat")}</li>
              <li className="point"><span className="icon">🚀</span> {t("jistita")}</li>
            </ul>
            <div className="price__teach">
              {t("cena")}: 20000 Kč <span className="price__icon"></span>
            </div>
          </div>
        </div>
      </section>

      {/* Online Course Section - Додаємо ref */}
      <section className="online-course-section" id="online-course" ref={onlineCourseRef}>
        <div className="online-course-section__inner">
          <h4 className="online-course-section__title">
            Онлайн <span className="teach">курс</span>
          </h4>

          <div className="online-course__card-wrapper">
            <div className="card card--online">
              <h3 className="point__title">💻 Онлайн курс стрижок</h3>

              <p className="online-course__subtitle">
                Доступ до всіх уроків VN Hair Studio в онлайн-форматі: відео, теорія,
                домашні завдання та підтримка в особистому кабінеті.
              </p>

              <ul className="guarantees-points">
                <li className="point"><span className="icon">🎥</span> Записані уроки у високій якості</li>
                <li className="point"><span className="icon">📚</span> Теорія, схеми та PDF-матеріали</li>
                <li className="point"><span className="icon">📝</span> Домашні завдання з розбором</li>
                <li className="point"><span className="icon">💬</span> Підтримка та відповіді на запитання</li>
                <li className="point"><span className="icon">🔐</span> Особистий кабінет з логіном і паролем</li>
              </ul>

              <div className="price__teach">Ціна: 1000 грн</div>

              <div className="online-course__buttons">
                <button className="btn course-btn-buy">Купити курс</button>

                <button className="btn course-btn-login" onClick={openCourseLogin}>
                  Вхід для учнів
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Login Modal */}
      {isCourseLoginOpen && (
        <div className="course-login__backdrop" onClick={closeCourseLogin}>
          <div
            className="course-login-card"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="course-login-card__close"
              onClick={closeCourseLogin}
              type="button"
            >
              ✕
            </button>

            <div className="course-login-card__avatar">
              <span className="course-login-card__avatar-icon">👤</span>
            </div>

            <h2 className="course-login-card__title">{t("welcomeback")}</h2>
            <p className="course-login-card__subtitle">
              {t("signin")}
            </p>

            {courseError && (
              <p className="course-login-card__error">{courseError}</p>
            )}

            <form
              className="course-login-card__form"
              onSubmit={(e) => {
                e.preventDefault();
                setCourseError("");

                if (!courseEmail || !coursePassword) {
                  setCourseError("Заповни email і пароль.");
                  return;
                }

                if (!courseEmail.includes("@")) {
                  setCourseError("Введи коректний email.");
                  return;
                }

                setCourseLoading(true);

                // Тут буде реальна авторизація
                setTimeout(() => {
                  setCourseLoading(false);
                  closeCourseLogin();
                }, 800);
              }}
            >
              {/* Email */}
              <label className="course-login-card__field">
                <span className="course-login-card__field-icon">✉️</span>
                <input
                  type="email"
                  className="course-login-card__input"
                  placeholder="Email address"
                  value={courseEmail}
                  onChange={(e) => setCourseEmail(e.target.value)}
                  required
                />
              </label>

              {/* Password */}
              <label className="course-login-card__field">
                <span className="course-login-card__field-icon">🔒</span>
                <input
                  type={showCoursePassword ? "text" : "password"}
                  className="course-login-card__input"
                  placeholder="Password"
                  value={coursePassword}
                  onChange={(e) => setCoursePassword(e.target.value)}
                  required
                />
                <span
                  className="course-login-card__field-icon course-login-card__field-icon--right"
                  onClick={() => setShowCoursePassword((prev) => !prev)}
                  style={{ cursor: "pointer" }}
                  role="button"
                  tabIndex={0}
                >
                  {showCoursePassword ? "🙈" : "👁"}
                </span>
              </label>

              <button
                type="submit"
                className="course-login-card__submit"
                disabled={courseLoading}
              >
                {courseLoading ? "Loading..." : "Sign In"}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className='footer'>VN Hair Studio</div>
      <button
        className={scroll < 1960 ? "" : "btn-up"}
        onClick={upButton}
      ></button>
    </div>
  );
};

export default Main;