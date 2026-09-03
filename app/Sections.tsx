'use client';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { ASSETS } from '@/lib/assets';
import { CountUp, usePinnedSteps } from './motion';
const A = ASSETS;
export function Arrow() {
  return (
    <span className="arrow" aria-hidden="true">
      →
    </span>
  );
}
function CTA({
  children = 'Обсудить ваш проект',
  className = 'primary',
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <a className={className} href="#contact">
      {children}
      <Arrow />
    </a>
  );
}
function Heading({
  tag,
  line1,
  line2,
  first = false,
  description,
}: {
  tag: string;
  line1: string;
  line2: string;
  first?: boolean;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <span className="tag">{tag}</span>
      <div>
        <h2>
          <span className={first ? 'gradient' : ''}>{line1}</span>
          <br />
          <span className={'heading-indent ' + (!first ? 'gradient' : '')}>
            {line2}
          </span>
        </h2>
        {description && <p>{description}</p>}
      </div>
    </div>
  );
}
const news = [
  {
    tag: 'Отрасль',
    date: '21 августа 2026',
    title:
      'Разработка «Агропромцифры» на крупнейших аграрных площадках Казани: «Билингво» на «Ростках» и «Русском поле»',
  },
  {
    tag: 'Мероприятия',
    date: '18 августа 2026',
    title:
      'Три дня на чемпионате по пахоте: «Уроки АгроЦифры», обучение маркетологов и награждение «Агродилера года»',
  },
  {
    tag: 'Партнерства',
    date: '17 августа 2026',
    title: 'Приглашаем на Демо-день ИЦК «Сельское хозяйство»!',
  },
];
function News() {
  const [selected, setSelected] = useState<number | null>(null);
  return (
    <section id="news" className="news-section rounded-section">
      <div className="wrap">
        <Heading tag="Актуальное" line1="Новости" line2="и события" first />
        <div className="news-links">
          <a href="#news-list">
            Все новости <Arrow />
          </a>
        </div>
        <div id="news-list" className="news-grid">
          {news.map((n, i) => (
            <article className="news-card" key={n.title}>
              <button
                className="news-image-button"
                onClick={() => setSelected(i)}
                aria-label={n.title}
              >
                <img src={A + `news-${i + 1}.webp`} alt="" />
              </button>
              <div className="news-body">
                <div className="news-meta">
                  <span>#{n.tag}</span>
                  <time>{n.date}</time>
                </div>
                <h3>{n.title}</h3>
                <button className="text-link" onClick={() => setSelected(i)}>
                  Подробнее <Arrow />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => !open && setSelected(null)}
      >
        <DialogContent className="news-dialog">
          {selected !== null && (
            <>
              <img src={A + `news-${selected + 1}.webp`} alt="" />
              <DialogTitle>{news[selected].title}</DialogTitle>
              <DialogDescription>
                {news[selected].date} · {news[selected].tag}
              </DialogDescription>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
const audiences = [
  {
    title: 'Отраслевые организации и институты',
    description:
      'Платформы, реестры, ГИС, аналитика и цифровые сервисы для отдельных направлений агропромышленного комплекса',
  },
  {
    title: 'Агрохолдинги и сельхозпредприятия',
    description:
      'Цифровые процессы производства, управление ресурсами, техникой, качеством и отчетностью в едином рабочем контуре',
  },
  {
    title: 'Перерабатывающие предприятия',
    description:
      'Системы для производственного учета, прослеживаемости, контроля качества, планирования и управления данными',
  },
  {
    title: 'Научные и образовательные организации',
    description:
      'Цифровые тренажеры, отраслевые знания, обучение AI и ИБ, технологии для многоязычной коммуникации',
  },
];
function Audiences() {
  const { root, stage, active, choose, direction } = usePinnedSteps(4);
  return (
    <section
      id="audiences"
      className="audience-scroll"
      ref={root}
      data-active-step={active}
      data-direction={direction}
    >
      <div ref={stage} className="audience-stage">
        <div className="wrap">
          <Heading
            tag="Для кого мы работаем"
            line1="Технологии для каждого уровня"
            line2="агропромышленного комплекса"
            first
            description="Разрабатываем, внедряем и сопровождаем цифровые решения для государственного сектора и коммерческого агробизнеса — от поля до прилавка"
          />
          <div className="audience-layout">
            <div
              className="audience-tabs"
              role="tablist"
              aria-label="Аудитории"
              aria-orientation="vertical"
            >
              {audiences.map((a, i) => (
                <button
                  role="tab"
                  aria-selected={active === i}
                  aria-controls={'audience-panel-' + i}
                  id={'audience-tab-' + i}
                  className={active === i ? 'active' : ''}
                  onClick={() => choose(i)}
                  key={a.title}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                      e.preventDefault();
                      const n = (i + (e.key === 'ArrowDown' ? 1 : 3)) % 4;
                      choose(n);
                      document.getElementById('audience-tab-' + n)?.focus();
                    }
                  }}
                >
                  <img
                    src={
                      A +
                      (i === 0
                        ? 'audience-icon-0.webp'
                        : `audience-icon-${i}.png`)
                    }
                    alt=""
                  />
                  <span>{a.title}</span>
                </button>
              ))}
            </div>
            <div className="audience-panels">
              {audiences.map((a, i) => (
                <article
                  className={'audience-panel ' + (active === i ? 'active' : '')}
                  role="tabpanel"
                  id={'audience-panel-' + i}
                  aria-labelledby={'audience-tab-' + i}
                  aria-hidden={active !== i}
                  inert={active !== i}
                  key={a.title}
                >
                  <div className="audience-copy">
                    <h3>{a.title}</h3>
                    <p>{a.description}</p>
                    {i === 0 ? (
                      <div className="audience-metrics">
                        <span>
                          <strong>
                            <CountUp value={38} />
                          </strong>
                          Lorem ipsum dolor sit amet,
                          <br /> consectetur adipiscing elit
                        </span>
                        <span>
                          <strong>
                            <CountUp value={69.4} decimals={1} />
                          </strong>
                          Lorem ipsum
                          <br /> dolor sit amet
                        </span>
                        <span>
                          <strong>
                            <CountUp value={782} />
                          </strong>
                          Lorem ipsum
                          <br /> dolor sit amet
                        </span>
                      </div>
                    ) : (
                      <p className="audience-placeholder">
                        Текст/инфографика/логотипы
                      </p>
                    )}
                    <CTA>Подробнее</CTA>
                  </div>
                  <img
                    className="audience-visual"
                    src={A + `audience-${i}.webp`}
                    alt={a.title}
                  />
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
const engineering = [
  {
    title: 'Высоконагруженные системы',
    description:
      'Проектируем архитектуру цифровых сервисов с учетом масштабирования, отказоустойчивости, мониторинга и требований к эксплуатации',
    tags: ['Архитектура', 'Производительность', 'Надежность'],
  },
  {
    title: 'Отраслевые платформы',
    description:
      'Создаем единые цифровые контуры: реестры, личные кабинеты, процессы, аналитика и инструменты управления',
    tags: ['Реестры', 'Личные кабинеты', 'Аналитика'],
  },
  {
    title: 'ГИС и пространственные данные',
    description:
      'Работаем с картографией, геоданными, мониторингом объектов и интеграцией пространственной информации с отраслевыми системами',
    tags: ['Карты', 'Геосервисы', 'Мониторинг'],
  },
];
function Engineering() {
  return (
    <section id="engineering" className="engineering wrap">
      <Heading
        tag="Инженерная база"
        line1="Создаем сложные"
        line2="цифровые системы"
        description="Компетенции, на которых строятся отраслевые платформы и проекты цифровой трансформации"
      />
      <div className="engineering-grid">
        {engineering.map((e, i) => (
          <article key={e.title} className="engineering-card">
            <div className="engineering-title">
              <img src={A + `engineering-icon-${i}.png`} alt="" />
              <h3>{e.title}</h3>
            </div>
            <p>{e.description}</p>
            <div className="engineering-image">
              <img src={A + `engineering-${i}.webp`} alt="" />
              <div className="pills">
                {e.tags.map((t) => (
                  <span key={t}>
                    <i />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
const productNames = [
  'Платформы и ГИС',
  'AI-агенты',
  'АгроПорт',
  'Билингво',
  'FMC',
  'Кибербезопасность',
  'Обучение',
];
const productDescriptions = [
  'Реестры, личные кабинеты, геосервисы, процессы и аналитика в едином цифровом контуре',
  'Внедряем ИИ-агентов на конкретные задачи бизнеса — прием и обзвон клиентов, контроль качества, прослеживаемость сырья и мониторинг стада. Каждый агент встроен в CRM, 1С и производственные системы заказчика и считает измеримый результат',
  'Описание',
  'Описание',
  'Описание',
  'Описание',
  'Описание',
];
const productPoints = [
  [929, 145],
  [835, 196],
  [1023, 199],
  [1118, 143],
  [644, 90],
  [1215, 195],
  [834, 88],
];
const productDetails = [
  [
    'Цифровая основа',
    'Платформы и сервисы образуют общий контур',
    'Отраслевая архитектура связывает данные, процессы, ГИС и пользовательские сервисы',
  ],
  [
    'Производственный контур',
    'Цифровые решения встраиваются в работу предприятия',
    'FMS и прикладные системы помогают управлять полями, техникой, ресурсами и операциями',
  ],
  [
    'Прикладные продукты',
    'AI и речевые технологии берут на себя конкретные операции',
    'Обрабатывают документы, помогают исполнителям и обеспечивают многоязычную коммуникацию',
  ],
  [
    'Безопасность и развитие',
    'Контур остается управляемым после запуска',
    'Безопасность, обучение и сопровождение закладываются в проект вместе с функциональностью',
  ],
];
function Products() {
  const {
    root,
    stage,
    active: selected,
    choose: setSelected,
    direction,
  } = usePinnedSteps(7);
  return (
    <section
      id="products"
      className="product-scroll"
      ref={root}
      data-active-step={selected}
      data-direction={direction}
    >
      <div className="product-stage" ref={stage}>
        <div className="products wrap">
          <Heading
            tag="Продуктовый контур"
            line1="Решения на карте"
            line2="цифровизации АПК"
          />
          <div className="product-map">
            <div className="product-art" aria-hidden="true">
              {productNames.map((_, i) => (
                <img
                  key={i}
                  src={A + `map-${i}.webp`}
                  className={selected === i ? 'active' : ''}
                  alt=""
                />
              ))}
            </div>
            <div className="map-wash" />
            <div
              className="product-tabs"
              role="tablist"
              aria-label="Направления"
            >
              {productNames.map((n, i) => (
                <button
                  key={n}
                  role="tab"
                  aria-selected={selected === i}
                  aria-controls="product-panel"
                  id={'product-tab-' + i}
                  onClick={() => setSelected(i)}
                  className={selected === i ? 'active' : ''}
                  onKeyDown={(e) => {
                    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
                      e.preventDefault();
                      const next = (i + (e.key === 'ArrowRight' ? 1 : 6)) % 7;
                      setSelected(next);
                      document.getElementById('product-tab-' + next)?.focus();
                    }
                  }}
                >
                  <img src={A + `product-icon-${i}.png`} alt="" />
                  {n}
                </button>
              ))}
            </div>
            <div
              className={'product-copy ' + (selected === 1 ? 'long-copy' : '')}
              id="product-panel"
              role="tabpanel"
              aria-labelledby={'product-tab-' + selected}
              key={selected}
            >
              <h3>
                {selected === 0
                  ? 'Отраслевые платформы и ГИС'
                  : productNames[selected]}
              </h3>
              <p>{productDescriptions[selected]}</p>
              <CTA>Обсудить направление</CTA>
            </div>
            <div className="map-hotspots">
              {productPoints.map(([x, y], i) => (
                <button
                  key={i}
                  className={selected === i ? 'selected' : ''}
                  aria-label={'Показать: ' + productNames[i]}
                  aria-pressed={selected === i}
                  onClick={() => setSelected(i)}
                  style={{
                    left: (x / 1310) * 100 + '%',
                    top: (y / 401) * 100 + '%',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="product-stepper" aria-label="Переход между решениями">
            <span className="step-number">
              0{selected + 1}
              <span> / 07</span>
            </span>
            <div className="step-track" aria-hidden="true">
              {productNames.map((_, i) => (
                <i key={i} className={i === selected ? 'active' : ''} />
              ))}
            </div>
            <button
              onClick={() => setSelected(selected - 1)}
              disabled={selected === 0}
              aria-label="Предыдущее решение"
            >
              ←
            </button>
            <button
              onClick={() => setSelected(selected + 1)}
              disabled={selected === 6}
              aria-label="Следующее решение"
            >
              →
            </button>
          </div>
          <div className="product-details" key={'details-' + selected}>
            {productDetails.map((d, i) => (
              <div key={i}>
                <small>{selected === 0 ? d[0] : 'Текст'}</small>
                <h4>{selected === 0 ? d[1] : 'Текст'}</h4>
                <p>{selected === 0 ? d[2] : 'Текст'}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
const devSteps = [
  [
    'Архитектура цифрового продукта',
    'Фиксируем требования, ограничения, нагрузку, интеграции и целевую схему будущей системы',
  ],
  [
    'Платформенная разработка',
    'Создаем реестры, кабинеты, сервисы, аналитические и мобильные модули под задачи проекта',
  ],
  [
    'Данные и интеграции',
    'Соединяем решение с 1С, ERP, отраслевыми сервисами, реестрами и действующей инфраструктурой',
  ],
  [
    'Запуск и развитие',
    'Проводим приемку, обучаем пользователей, сопровождаем эксплуатацию и развиваем систему',
  ],
];
const technologies = [
  ['Spring', '46-spring-1.svg'],
  ['MySQL', '37-mysql-1.svg'],
  ['Node.js', '38-nodejs-2.svg'],
  ['PostgreSQL', '42-postgresql-1.svg'],
  ['Python', '43-python-2.svg'],
  ['Java', '32-java-2.svg'],
  ['React', '44-react-2.svg'],
  ['Redis', '45-redis-1.svg'],
  ['Git', '13-git-2.svg'],
  ['MongoDB', '36-mongodb-1.svg'],
  ['TypeScript', '47-typescript-1.svg'],
  ['Vue.js', '48-vuejs-1.svg'],
  ['HTML5', '21-html5-2.svg'],
  ['AWS', '06-aws-1.svg'],
  ['CSS3', '07-css3-2.svg'],
  ['Docker', '08-docker-2.svg'],
  ['Google Cloud', '14-google-cloud-2.svg'],
  ['JavaScript', '33-javascript-2.svg'],
  ['Kubernetes', '34-kubernetes-1.svg'],
  ['Linux', '35-linux-1.svg'],
];
function Development() {
  return (
    <>
      <aside className="checklist wrap">
        <div>
          <span className="tag dark-tag">Практический материал</span>
          <h2>
            <span className="gradient">Проверьте цифровой</span>
            <br />
            <span className="heading-indent">проект до старта</span>
          </h2>
        </div>
        <p>
          Чек-лист помогает проверить исходные данные, интеграции, архитектуру,
          безопасность и готовность команды до начала разработки или миграции
        </p>
        <Button
          className="primary checklist-button"
          disabled
          title="Чек-лист будет добавлен позже"
        >
          Скачать чек-лист <span aria-hidden="true">↓</span>
        </Button>
      </aside>
      <section id="development" className="development wrap">
        <Heading
          tag="Заказная разработка"
          line1="Разрабатываем системы"
          line2="под задачи отрасли"
          first
          description="Берем на себя весь путь — от обследования и архитектуры до разработки, внедрения и сопровождения, самостоятельно или с технологическими партнерами"
        />
        <CTA className="primary development-cta">
          Обсудить заказную разработку
        </CTA>
        <img
          className="development-image"
          src={A + 'development.webp'}
          alt="Архитектура, платформа, интеграции и запуск"
        />
        <div className="development-steps">
          {devSteps.map(([t, d], i) => (
            <div key={t}>
              <img src={A + `dev-icon-${i}.png`} alt="" />
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
        <div
          className="technologies"
          role="img"
          aria-label="Технологический стек: Spring, MySQL, Node.js, PostgreSQL, Python, Java, React, Redis, Git, MongoDB, TypeScript, Vue.js, HTML5, AWS, CSS3, Docker, Google Cloud, JavaScript, Kubernetes, Linux"
        >
          {technologies.map(([name, file]) => (
            <img key={name} src={A + file} alt={name} />
          ))}
        </div>
      </section>
    </>
  );
}
function Radar() {
  const ref = useRef<HTMLDivElement>(null);
  const [markup, setMarkup] = useState('');
  useEffect(() => {
    const controller = new AbortController();
    fetch(A + 'radar-animated.svg?v=2', { signal: controller.signal })
      .then((r) => r.text())
      .then(setMarkup)
      .catch((e) => {
        if (e.name !== 'AbortError')
          console.error('Radar artwork could not load', e);
      });
    return () => controller.abort();
  }, []);
  useEffect(() => {
    const el = ref.current;
    if (!el || !markup) return;
    const doc = el;
    doc.querySelectorAll('foreignObject').forEach((node) => node.remove());
    doc.querySelectorAll('[data-figma-bg-blur-radius]').forEach((node) =>
      node.removeAttribute('filter'),
    );
    doc.querySelectorAll('image[data-radar-asset]').forEach((node) => {
      const file = node.getAttribute('data-radar-asset');
      if (file) node.setAttribute('href', A + file);
    });
    const sweep = doc.querySelector('#radar-sweep'),
      glow = doc.querySelector('#radar-glow');
    let frame = 0,
      last = 0,
      elapsed = 0,
      visible = false;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const zoom = Array.from(doc.querySelectorAll('[data-radar-target="zoom"]')),
      cad = Array.from(doc.querySelectorAll('[data-radar-target="cad"]'));
    const logos = {
      zoomForeign: doc.querySelector('[data-radar-logo="zoom-foreign"]'),
      zoomDomestic: doc.querySelector('[data-radar-logo="zoom-domestic"]'),
      cadForeign: doc.querySelector('[data-radar-logo="cad-foreign"]'),
      cadDomestic: doc.querySelector('[data-radar-logo="cad-domestic"]'),
    };
    let previousZoom: boolean | undefined, previousCad: boolean | undefined;
    function draw() {
      const phase = ((elapsed % 14000) / 14000) * 360;
      const angle = phase - 70;
      sweep?.setAttribute('transform', `rotate(${angle} 722.5 446.751)`);
      glow?.setAttribute('transform', `rotate(${angle - 15.28} 722.5 446.751)`);
      const z = (phase >= 85.28 && phase < 285) || reduced,
        c = (phase >= 114.9 && phase < 285) || reduced;
      zoom.forEach((n) => n.setAttribute('fill', z ? '#0FF0AC' : '#FF446F'));
      cad.forEach((n) => n.setAttribute('fill', c ? '#0FF0AC' : '#FF446F'));
      if (z !== previousZoom) {
        logos.zoomForeign?.setAttribute('opacity', z ? '0' : '1');
        logos.zoomDomestic?.setAttribute('opacity', z ? '1' : '0');
        previousZoom = z;
      }
      if (c !== previousCad) {
        logos.cadForeign?.setAttribute('opacity', c ? '0' : '1');
        logos.cadDomestic?.setAttribute('opacity', c ? '1' : '0');
        previousCad = c;
      }
      el?.setAttribute('data-scan-phase', phase.toFixed(1));
      el?.setAttribute('data-zoom-state', z ? 'green' : 'red');
      el?.setAttribute('data-cad-state', c ? 'green' : 'red');
    }
    function tick(now: number) {
      if (!visible) return;
      if (last) elapsed += Math.min(now - last, 80);
      last = now;
      draw();
      frame = requestAnimationFrame(tick);
    }
    draw();
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        last = 0;
        cancelAnimationFrame(frame);
        if (visible && !reduced) frame = requestAnimationFrame(tick);
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [markup]);
  return (
    <section id="independence" className="independence">
      <div
        ref={ref}
        className="radar-art"
        role="img"
        aria-label="Пример технологического перехода: Zoom заменяется на Битрикс24, AutoCAD на nanoCAD при прохождении луча радара"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      <div className="radar-copy wrap">
        <Heading
          tag="Технологическая независимость"
          line1="Переход на российский стек"
          line2="без слепой замены систем"
          description="Сначала фиксируем критичные зависимости и точки обмена данными. Затем проектируем целевую архитектуру, проверяем интеграции на пилоте и переносим контур по согласованным этапам"
        />
        <div className="radar-steps">
          {[
            [
              'Аудит зависимостей',
              'Фиксируем критичные связи и точки обмена данными',
            ],
            [
              'Целевая архитектура',
              'Проектируем схему контура и состав решения',
            ],
            [
              'Пилот и критерии',
              'Проверяем интеграции и договариваемся о приемке',
            ],
            [
              'Перенос и сопровождение',
              'Переносим контур по этапам и поддерживаем работу',
            ],
          ].map(([t, d]) => (
            <div key={t}>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
const cases = [
  {
    logo: '26-image-4.png',
    name: 'АгроТерра',
    category: 'Интеграция и данные',
    title: 'Передача данных во ФГИС «Зерно»',
    description:
      'Интеграционный контур передает сведения в момент хозяйственной операции и сокращает ручную подготовку отчетности',
    point: 'Данные уходят в момент операции',
    before: '20',
    beforeUnit: 'часов',
    after: '15',
    afterUnit: 'минут',
    beforeText: 'Данные по партиям вносили вручную — 20 часов в неделю',
    afterText: 'Полная автоматизация. Отчетность 15 минут',
  },
  {
    logo: '23-image-2.png',
    name: 'ФНЦ «ВНИТИП»',
    category: 'Платформенное решение',
    title: 'Управление селекцией птицы',
    description:
      'Платформа автоматизирует расчеты показателей продуктивности и работу с селекционными данными',
    point: 'Расчеты продуктивности автоматически',
    before: 'х0',
    after: 'x10',
    beforeText: 'Селекционные расчеты — недели ручной работы',
    afterText: 'Скорость расчетов выросла в 10 раз',
  },
  {
    logo: '25-image-3.png',
    name: 'Росагролизинг',
    category: 'Прикладной AI',
    title: 'Управление документооборотом',
    description:
      'AI-система обрабатывает входящие запросы, контролирует сроки и помогает управлять исполнением документов',
    point: 'Контроль сроков исполнения',
    before: '0%',
    after: '+40%',
    beforeText: 'Ручная обработка, потеря сроков, ошибки',
    afterText: 'Скорость обработки +40%, ошибки исключены',
  },
];
function Cases() {
  return (
    <section id="projects" className="projects rounded-section">
      <div className="wrap">
        <Heading
          tag="Проекты"
          line1="Опыт, подтвержденный"
          line2="работающими системами"
          description="Показываем контекст проекта, реализованный цифровой контур и изменение рабочего процесса"
        />
        <div className="cases-grid">
          {cases.map((c) => (
            <article key={c.name} className="case-card">
              <div className="case-brand">
                <img src={A + c.logo} alt="" />
                <div>
                  <h3>{c.name}</h3>
                  <small>{c.category}</small>
                </div>
              </div>
              <h4>{c.title}</h4>
              <p>{c.description}</p>
              <div className="case-point">
                <i />
                {c.point}
              </div>
              <div className="case-comparison">
                <div>
                  <span className="metric-label">До</span>
                  <strong>
                    {c.before}
                    <small>{c.beforeUnit}</small>
                  </strong>
                </div>
                <span className="metric-arrows" aria-hidden="true">
                  ››››››
                </span>
                <div className="metric-after">
                  <span className="metric-label">После</span>
                  <strong>
                    {c.after}
                    <small>{c.afterUnit}</small>
                  </strong>
                </div>
              </div>
              <div className="comparison-captions">
                <p>{c.beforeText}</p>
                <p>{c.afterText}</p>
              </div>
              <CTA className="text-link">Обсудить ваш проект</CTA>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
function Contact() {
  const [status, setStatus] = useState('');
  return (
    <section className="contact-section wrap" id="contact">
      <Heading
        tag="Сотрудничество"
        line1="Обсудим цифровой"
        line2="проект для АПК"
        first
        description="Опишите направление и текущий контур. Подключим нужных специалистов и предложим подходящий формат первого разговора"
      />
      <div className="contact-links">
        <a href="tel:+74951203955">
          <span>☎</span> +7 (495) 120-39-55
        </a>
        <a href="mailto:sales@agropromcifra.ru">
          <span>✉</span> sales@agropromcifra.ru
        </a>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setStatus('Данные проверены. Это прототип, заявка не отправлена.');
        }}
      >
        <Input aria-label="Имя" name="name" placeholder="Имя" required />
        <Input
          aria-label="Организация"
          name="company"
          placeholder="Организация"
        />
        <Input
          aria-label="Рабочая почта или телефон"
          name="contact"
          placeholder="Рабочая почта или телефон"
          required
          minLength={5}
        />
        <Input
          aria-label="Что хотите обсудить"
          name="message"
          placeholder="Что хотите обсудить"
        />
        <Button type="submit" className="primary">
          Обсудить сотрудничество <Arrow />
        </Button>
        <p className="consent">
          Нажимая кнопку, вы соглашаетесь с{' '}
          <span title="Документ будет добавлен в полной версии">
            Политикой обработки персональных данных
          </span>
        </p>
        <p className="form-status" role="status">
          {status}
        </p>
      </form>
    </section>
  );
}
function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <img
              className="footer-logo"
              src={A + 'logo.png'}
              alt="Агропромцифра"
            />
            <p>
              Единый центр компетенций
              <br />в цифровизации агропромышленного
              <br />
              комплекса
            </p>
          </div>
          <div>
            <h4>Продукты и услуги</h4>
            {[
              'Платформы и ГИС',
              'АгроПорт',
              'Билингво',
              'AI-агенты',
              'Заказная разработка',
            ].map((t, i) => (
              <a key={t} href={i === 4 ? '#development' : '#products'}>
                {t}
              </a>
            ))}
          </div>
          <div>
            <h4>Компания</h4>
            <a href="#audiences">О компании</a>
            <a href="#projects">Проекты</a>
            <a href="#news">Новости и события</a>
            <a href="#partners">Партнеры</a>
          </div>
          <div>
            <h4>Контакты</h4>
            <a href="tel:+74951203955">+7 (495) 120-39-55</a>
            <a href="mailto:sales@agropromcifra.ru">sales@agropromcifra.ru</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 АО «Агропромцифра»</span>
          <span>Политика обработки персональных данных</span>
        </div>
      </div>
    </footer>
  );
}
export default function Sections() {
  return (
    <>
      <News />
      <Audiences />
      <Engineering />
      <Products />
      <Development />
      <Radar />
      <Cases />
      <Contact />
      <Footer />
    </>
  );
}
