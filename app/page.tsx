'use client';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ASSETS } from '@/lib/assets';
import { CountUp, Dashboard } from './motion';
import Sections from './Sections';
const A = ASSETS;
const partners = [
  ['29-image-83.png', 'ОЗК'],
  ['30-image-84.png', 'РСХБ'],
  ['27-image-81.png', 'RUSEED'],
  ['28-image-82.png', 'АгроТерра'],
  ['24-image-29.png', 'Ростелеком'],
  ['31-image-85.png', 'Черноголовка'],
  ['22-image-173.png', 'РИВЦ'],
];
const navigation = [
  { label: 'Продукты', links: [['Продукты и решения', '#products']] },
  {
    label: 'Услуги',
    links: [
      ['Заказная разработка', '#development'],
      ['Технологическая независимость', '#independence'],
    ],
  },
  {
    label: 'Решения',
    links: [
      ['Для кого мы работаем', '#audiences'],
      ['Инженерная база', '#engineering'],
    ],
  },
  { label: 'Медиа', links: [['Новости и события', '#news']] },
  {
    label: 'Компания',
    links: [
      ['Проекты', '#projects'],
      ['Партнеры', '#partners'],
    ],
  },
];
export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    document.body.classList.toggle('menu-open', menuOpen);
    if (!document.querySelector('meta[name="viewport"]')) {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1';
      document.head.appendChild(meta);
    }
    return () => document.body.classList.remove('menu-open');
  }, [menuOpen]);
  const closeMenu = () => setMenuOpen(false);
  return (
    <main>
      <header className="topbar wrap">
        <a href="#" className="brand" onClick={closeMenu}>
          <img src={A + 'logo.png'} alt="Агропромцифра" />
        </a>
        <nav aria-label="Основная навигация">
          {navigation.map((n) => (
            <details
              key={n.label}
              onToggle={(e) => {
                const current = e.currentTarget;
                if (current.open)
                  document
                    .querySelectorAll<HTMLDetailsElement>(
                      '.topbar details[open]',
                    )
                    .forEach((d) => {
                      if (d !== current) d.open = false;
                    });
              }}
              onKeyDown={(e) => {
                if (e.key === 'Escape') {
                  e.currentTarget.open = false;
                  e.currentTarget.querySelector('summary')?.focus();
                }
              }}
            >
              <summary>
                {n.label}
                <span className="chevron" />
              </summary>
              <div className="nav-dropdown">
                {n.links.map(([label, href]) => (
                  <a
                    key={href}
                    href={href}
                    onClick={(e) => {
                      const menu = e.currentTarget.closest('details');
                      if (menu) menu.open = false;
                    }}
                  >
                    {label}
                  </a>
                ))}
              </div>
            </details>
          ))}
          <a href="#contact">Контакты</a>
        </nav>
        <a className="header-cta" href="#contact">
          Обсудить сотрудничество <span className="arrow">→</span>
        </a>
        <button
          type="button"
          className={'menu-toggle' + (menuOpen ? ' open' : '')}
          aria-label={menuOpen ? 'Закрыть меню' : 'Открыть меню'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span />
          <span />
          <span />
        </button>
      </header>
      <div className={'mobile-menu' + (menuOpen ? ' open' : '')}>
        {navigation.flatMap((item) =>
          item.links.map(([label, href]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          )),
        )}
        <a href="#contact" onClick={closeMenu}>
          Контакты
        </a>
        <a className="primary" href="#contact" onClick={closeMenu}>
          Обсудить сотрудничество <span className="arrow">→</span>
        </a>
      </div>
      <section className="hero wrap">
        <div className="hero-copy">
          <p className="eyebrow">
            Единый центр компетенций в цифровизации агропромышленного комплекса
          </p>
          <h1>
            Цифровизация АПК <span>—</span>
            <br />
            <span className="hero-accent gradient">
              от задачи до работающей системы
            </span>
          </h1>
          <div className="hero-actions">
            <Button
              className="primary"
              onClick={() =>
                document
                  .querySelector('#contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              Обсудить сотрудничество <span className="arrow">→</span>
            </Button>
            <a className="secondary" href="#products">
              Продукты и решения <span>↗</span>
            </a>
          </div>
          <div className="hero-bottom">
            <div className="stats">
              <div>
                <strong>
                  <CountUp value={120000} suffix="+" grouped />
                </strong>
                <span>Пользователей</span>
              </div>
              <div>
                <strong>
                  <CountUp value={100} suffix="+" />
                </strong>
                <span>Продуктов и решений</span>
              </div>
              <div>
                <strong>
                  <CountUp value={200} suffix="+" />
                </strong>
                <span>Специалистов</span>
              </div>
            </div>
            <div className="hero-links">
              {['Архитектура', 'Сопровождение', 'Разработка', 'Внедрение'].map(
                (x) => (
                  <a key={x} href="#development">
                    {x} ↗
                  </a>
                ),
              )}
            </div>
          </div>
        </div>
        <div className="hero-art">
          <img
            className="hero-base"
            src={A + 'hero.webp'}
            alt="Цифровые технологии в сельском хозяйстве"
          />
          <Dashboard kind="process" label="Цифровые процессы" />
          <Dashboard kind="sectors" label="Мониторинг отраслей" />
          <Dashboard kind="weather" label="Агрометеомониторинг" />
          <Dashboard kind="chart" label="Перерабатывающие предприятия" />
          <img
            className="hero-decoration hero-crops"
            src={A + '41-objects.svg'}
            alt=""
          />
          <img
            className="hero-decoration hero-solar"
            src={A + '40-objects-2.svg'}
            alt=""
          />
          <div className="hero-rings">
            {[50, 25, 90].map((v, i) => (
              <div key={v}>
                <CountUp value={v} suffix="%" gauge />
                <small>
                  {['Урожайность', 'Эффективность', 'Цифровизация'][i]}
                </small>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div id="partners" className="partners" aria-label="Партнеры">
        <div className="partner-track">
          {[0, 1].map((copy) => (
            <div className="partner-set" key={copy} aria-hidden={copy === 1}>
              {partners.map(([src, alt]) => (
                <img key={alt} src={A + src} alt={copy === 0 ? alt : ''} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <Sections />
    </main>
  );
}
