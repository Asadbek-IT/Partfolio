import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: "Home",
        services: "Services",
        technology: "Technology",
        team: "Team",
        contact: "Contact"
      },
      hero: {
        title: "Digital Craftsmen",
        subtitle: "We Build Experiences That Matter",
        cta: "Start Your Project",
        scroll: "Scroll to Explore"
      },
      services: {
        title: "Our Expertise",
        web: {
          title: "Web Development",
          desc: "Crafting high-performance web applications with cutting-edge technologies"
        },
        design: {
          title: "UI/UX Design",
          desc: "Creating intuitive and visually stunning interfaces that users love"
        },
        mobile: {
          title: "Mobile Apps",
          desc: "Building native and cross-platform mobile experiences"
        },
        consulting: {
          title: "Tech Consulting",
          desc: "Strategic guidance for your digital transformation journey"
        }
      },
      technology: {
        title: "Tech Stack"
      },
      team: {
        title: "Meet The Team",
        roles: {
          lead: "Lead Developer",
          frontend: "Frontend Developer",
          backend: "Backend Developer",
          designer: "UI/UX Designer"
        }
      },
      footer: {
        cta: "Let's Talk",
        description: "Ready to start your next project?",
        email: "hello@digital.dev",
        rights: "All rights reserved."
      }
    }
  },
  ru: {
    translation: {
      nav: {
        home: "Главная",
        services: "Услуги",
        technology: "Технологии",
        team: "Команда",
        contact: "Контакты"
      },
      hero: {
        title: "Цифровые Мастера",
        subtitle: "Мы Создаем Опыт, Который Имеет Значение",
        cta: "Начать Проект",
        scroll: "Прокрутите, чтобы исследовать"
      },
      services: {
        title: "Наша Экспертиза",
        web: {
          title: "Веб-Разработка",
          desc: "Создание высокопроизводительных веб-приложений с передовыми технологиями"
        },
        design: {
          title: "UI/UX Дизайн",
          desc: "Создание интуитивных и визуально потрясающих интерфейсов"
        },
        mobile: {
          title: "Мобильные Приложения",
          desc: "Разработка нативных и кроссплатформенных мобильных решений"
        },
        consulting: {
          title: "Технологический Консалтинг",
          desc: "Стратегическое руководство для вашей цифровой трансформации"
        }
      },
      technology: {
        title: "Технологический Стек"
      },
      team: {
        title: "Познакомьтесь с Командой",
        roles: {
          lead: "Ведущий Разработчик",
          frontend: "Frontend Разработчик",
          backend: "Backend Разработчик",
          designer: "UI/UX Дизайнер"
        }
      },
      footer: {
        cta: "Давайте Поговорим",
        description: "Готовы начать свой следующий проект?",
        email: "hello@digital.dev",
        rights: "Все права защищены."
      }
    }
  },
  uz: {
    translation: {
      nav: {
        home: "Bosh sahifa",
        services: "Xizmatlar",
        technology: "Texnologiya",
        team: "Jamoa",
        contact: "Aloqa"
      },
      hero: {
        title: "Raqamli Ustalar",
        subtitle: "Biz Muhim Tajribalarni Yaratamiz",
        cta: "Loyihani Boshlash",
        scroll: "Tekshirish uchun aylantiring"
      },
      services: {
        title: "Bizning Tajribamiz",
        web: {
          title: "Veb Dasturlash",
          desc: "Zamonaviy texnologiyalar bilan yuqori samarali veb-ilovalarni yaratish"
        },
        design: {
          title: "UI/UX Dizayn",
          desc: "Intuitiv va vizual ajoyib interfeyslarni yaratish"
        },
        mobile: {
          title: "Mobil Ilovalar",
          desc: "Nativ va krossplatform mobil tajribalarni yaratish"
        },
        consulting: {
          title: "Texnologik Maslahat",
          desc: "Raqamli transformatsiya sayohatingiz uchun strategik yo'l-yo'riq"
        }
      },
      technology: {
        title: "Texnologik Stek"
      },
      team: {
        title: "Jamoa Bilan Tanishing",
        roles: {
          lead: "Bosh Dasturchi",
          frontend: "Frontend Dasturchi",
          backend: "Backend Dasturchi",
          designer: "UI/UX Dizayner"
        }
      },
      footer: {
        cta: "Keling Gaplashaylik",
        description: "Keyingi loyihangizni boshlashga tayyormisiz?",
        email: "hello@digital.dev",
        rights: "Barcha huquqlar himoyalangan."
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
