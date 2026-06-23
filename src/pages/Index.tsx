import { useState } from 'react';
import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

const BOT_URL = 'https://t.me/Numerolog_helper_bot';

const guides = [
  {
    num: '1',
    title: 'Число судьбы: код вашей личности',
    desc: 'Глубокий разбор главного числа и его влияния на жизненный путь.',
    price: '990 ₽',
    tag: 'Бестселлер',
  },
  {
    num: '5',
    title: 'Совместимость в любви и партнёрстве',
    desc: 'Как числа двух людей формируют гармонию или конфликт.',
    price: '1 490 ₽',
    tag: 'AI-подбор',
  },
  {
    num: '7',
    title: 'Цифровая психология денег',
    desc: 'Денежные блоки через призму чисел и работа с изобилием.',
    price: '1 990 ₽',
    tag: 'Новое',
  },
  {
    num: '9',
    title: 'Прогноз года по дате рождения',
    desc: 'Персональные циклы, благоприятные периоды и точки роста.',
    price: '1 290 ₽',
    tag: 'Прогноз',
  },
  {
    num: '♡',
    title: 'Нумерология для родителей: ключ к характеру вашего ребёнка',
    desc: 'Узнайте число судьбы ребёнка и получите персональные рекомендации: как говорить, мотивировать и выстраивать доверие с учётом его числового архетипа.',
    price: '1 190 ₽',
    tag: 'Для родителей',
  },
];

const reduce = (n: number): number => {
  while (n > 9) n = String(n).split('').reduce((a, b) => a + +b, 0);
  return n;
};

const meanings: Record<number, { word: string; archetype: string; idea: string; text: string; strengths: string[]; growth: string }> = {
  1: {
    word: 'Мастер / Творец',
    archetype: 'Архетип Мага',
    idea: '«Я создаю свою реальность»',
    text: 'Это архетип чистого потенциала и силы воли. Вы понимаете, что мысль материальна. У вас есть все инструменты — талант, ум, энергия и воля — чтобы превратить любую идею в реальность. Вы не ждёте удачного момента, вы его создаёте.',
    strengths: ['Сила намерения: умение концентрироваться на цели и достигать её', 'Находчивость: способность использовать любые ресурсы', 'Харизма и убедительность: легко вдохновляете других', 'Лидерский потенциал: катализатор для любых начинаний'],
    growth: 'Избегайте манипуляций и излишнего контроля. Научитесь доверять не только своему уму, но и потоку жизни.',
  },
  2: {
    word: 'Хранительница Тайн',
    archetype: 'Архетип Верховной Жрицы',
    idea: '«Я знаю больше, чем говорю»',
    text: 'Это архетип интуиции, подсознания и скрытых знаний. Вы живёте на границе двух миров — видимого и невидимого. Ваш главный инструмент — внутренний голос. Вы учите, что самые важные ответы находятся внутри.',
    strengths: ['Глубокая интуиция: верные решения на основе предчувствий', 'Эмпатия: понимаете скрытые мотивы других людей', 'Спокойствие и мудрость: к вам тянутся за советом', 'Способность видеть суть: замечаете то, что скрыто от других'],
    growth: 'Выйдите из пассивного наблюдения и начните действовать. Делитесь своей мудростью, не боясь быть непонятой.',
  },
  3: {
    word: 'Покровительница / Богиня Изобилия',
    archetype: 'Архетип Императрицы',
    idea: '«Мир заботится обо мне, а я — о мире»',
    text: 'Это архетип плодородия, творчества, изобилия и безусловной любви. Вы умеете создавать красоту, комфорт и приумножать любые ресурсы. Ваша энергия — это энергия роста и процветания.',
    strengths: ['Креативность: талант создавать что-либо с нуля', 'Щедрость и забота: создаёте атмосферу тепла', 'Притяжение изобилия: естественно привлекаете блага', 'Чувственность: умеете наслаждаться жизнью'],
    growth: 'Избегайте гиперопеки и жертвенности. Научитесь заботиться не только о других, но и о себе.',
  },
  4: {
    word: 'Правитель / Стратег',
    archetype: 'Архетип Императора',
    idea: '«Порядок и структура создают свободу»',
    text: 'Это архетип власти, структуры, дисциплины и ответственности. Вы превращаете хаос в систему. Ваша сила — в логике, планировании и способности брать на себя ответственность за других.',
    strengths: ['Стратегическое мышление: видите на несколько шагов вперёд', 'Надёжность и ответственность: человек слова и дела', 'Лидерские качества: умеете управлять и организовывать', 'Дисциплина: сила воли для долгосрочных целей'],
    growth: 'Избегайте деспотизма и излишнего контроля. Учитесь гибкости — иногда интуиция важнее строгой логики.',
  },
  5: {
    word: 'Наставник / Хранитель Знаний',
    archetype: 'Архетип Иерофанта',
    idea: '«Знание обретает смысл, когда им делятся»',
    text: 'Это архетип мудрости, традиций и духовного поиска. Вы — мост между поколениями, между знанием и учеником. Ваша миссия — учить, направлять и помогать другим находить свой путь к истине.',
    strengths: ['Талант к обучению: объясняете сложные вещи простым языком', 'Мудрость и эрудиция: глубокие познания в своей сфере', 'Моральный компас: вызываете доверие, к вам обращаются за советом', 'Умение слушать: прекрасный консультант и духовный гид'],
    growth: 'Избегайте догматизма. Понимайте, что правила иногда нужно пересматривать — у каждого своя уникальная правда.',
  },
  6: {
    word: 'Партнёр / Мастер Отношений',
    archetype: 'Архетип Влюблённых',
    idea: '«Правильный выбор — это выбор сердцем»',
    text: 'Это архетип выбора, гармонии, союза и глубокой связи. Вы познаёте себя через отношения с другими. Ваш главный урок — слушать своё сердце и делать выборы, приводящие к гармонии.',
    strengths: ['Глубокие связи: создаёте крепкие, доверительные отношения', 'Дипломатичность: находите компромиссы и объединяете людей', 'Открытость и честность: действуете из любви и искренности', 'Верность ценностям: делаете выборы, соответствующие душе'],
    growth: 'Преодолейте нерешительность и страх ошибки. Учитесь брать на себя ответственность за свои решения.',
  },
  7: {
    word: 'Победитель / Двигатель Прогресса',
    archetype: 'Архетип Колесницы',
    idea: '«Воля и контроль ведут к триумфу»',
    text: 'Это архетип прорыва, победы, амбиций и движения вперёд. Вы ставите смелые цели и, благодаря силе воли, преодолеваете все препятствия. Решимость способна творить чудеса.',
    strengths: ['Целеустремлённость: невероятная концентрация на цели', 'Самодисциплина: контролируете эмоции ради победы', 'Смелость и решительность: не боитесь трудностей', 'Динамичность: постоянно в движении и развитии'],
    growth: 'Избегайте агрессии. Истинная победа — это не только достижение цели, но и сохранение гармонии на пути к ней.',
  },
  8: {
    word: 'Судья / Хранитель Баланса',
    archetype: 'Архетип Справедливости',
    idea: '«Что посеешь, то и пожнёшь»',
    text: 'Это архетип истины, честности, кармы и равновесия. Вы видите мир без иллюзий. Понимаете закон причины и следствия и знаете, что за каждое действие нужно нести ответственность.',
    strengths: ['Объективность: решения основаны на логике, а не эмоциях', 'Честность: высокие моральные принципы', 'Аналитический ум: видите ситуацию со всех сторон', 'Ответственность: готовы отвечать за свои поступки'],
    growth: 'Избегайте излишней критики. Учитесь прощению и принятию — не всё в мире можно измерить логикой.',
  },
  9: {
    word: 'Мудрец / Искатель Истины',
    archetype: 'Архетип Отшельника',
    idea: '«Все ответы находятся внутри меня»',
    text: 'Это архетип глубокого самопознания, мудрости и духовного поиска. Вы находите истину в тишине и уединении. Ваша миссия — пройти путь познания и стать маяком для других.',
    strengths: ['Самодостаточность: комфортно наедине с собой', 'Глубина мышления: способность к самоанализу и рефлексии', 'Мудрость: знания, которые приходят с опытом', 'Спокойствие: излучаете внутреннюю силу и уверенность'],
    growth: 'Избегайте полной изоляции. Возвращайтесь в мир и делитесь своей мудростью, не боясь быть непонятым.',
  },
};

export default function Index() {
  const [date, setDate] = useState('');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const digits = date.replace(/\D/g, '');
    if (digits.length < 8) return;
    const sum = digits.split('').reduce((a, b) => a + +b, 0);
    setResult(reduce(sum));
  };

  return (
    <div className="min-h-screen bg-cosmos text-foreground overflow-x-hidden">
      {/* NAV */}
      <header className="fixed top-0 inset-x-0 z-50">
        <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between glass rounded-b-2xl">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-gold" size={22} />
            <span className="font-display text-xl font-semibold tracking-wide">Нумера</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#calc" className="hover:text-gold transition-colors">Калькулятор</a>
            <a href="#how" className="hover:text-gold transition-colors">Как это работает</a>
            <a href="#guides" className="hover:text-gold transition-colors">Гайды</a>
            <a href="#cabinet" className="hover:text-gold transition-colors">Кабинет</a>
          </div>
          <Button className="bg-primary text-primary-foreground hover:opacity-90 rounded-full font-medium" asChild>
            <a href={BOT_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="Send" size={16} className="mr-1.5" />
              В Telegram
            </a>
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative max-w-6xl mx-auto px-6 pt-40 pb-24 star-field">
        <div className="absolute top-32 right-0 w-72 h-72 rounded-full border border-gold/20 animate-spin-slow hidden lg:block" />
        <div className="absolute top-48 right-16 w-44 h-44 rounded-full border border-violet/30 animate-float-slow hidden lg:block" />
        <div className="relative max-w-2xl animate-fade-up">
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-gold/80 mb-6">
            <span className="w-8 h-px bg-gold/50" /> Нумерология · Цифровая психология
          </span>
          <h1 className="font-display text-6xl md:text-7xl leading-[0.95] font-semibold mb-6">
            Раскройте код,<br />
            <span className="text-gradient-gold italic">записанный в числах</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-lg mb-10">
            Узнайте своё число судьбы, проверьте совместимость и получите авторские гайды,
            собранные специально под ваш числовой портрет.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 rounded-full text-base px-8 h-12" asChild>
              <a href={BOT_URL} target="_blank" rel="noopener noreferrer"><Icon name="Calculator" size={18} className="mr-2" />Рассчитать бесплатно</a>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full text-base px-8 h-12 gold-border bg-transparent hover:bg-secondary" asChild>
              <a href="#guides">Смотреть гайды</a>
            </Button>
          </div>
          <div className="flex gap-10 mt-14">
            {[['12K+', 'расчётов'], ['4.9', 'рейтинг'], ['48', 'гайдов']].map(([n, l]) => (
              <div key={l}>
                <div className="font-display text-3xl text-gold">{n}</div>
                <div className="text-sm text-muted-foreground">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="relative max-w-5xl mx-auto px-6 py-20">
        <div className="glass rounded-3xl p-8 md:p-14 relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-violet/20 blur-3xl animate-glow" />
          <div className="grid md:grid-cols-2 gap-10 items-center relative">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold/80">Калькулятор</span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-4">
                Ваше число судьбы
              </h2>
              <p className="text-muted-foreground mb-7">
                Введите дату рождения — и мгновенно узнайте своё главное число и его значение.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  placeholder="ДД.ММ.ГГГГ"
                  className="flex-1 bg-input/60 gold-border rounded-full px-6 h-12 text-lg outline-none focus:ring-2 focus:ring-gold/40 placeholder:text-muted-foreground/60"
                />
                <Button onClick={calculate} className="bg-primary text-primary-foreground hover:opacity-90 rounded-full h-12 px-7">
                  Узнать
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              {result ? (
                <div className="animate-fade-up w-full">
                  <div className="flex items-center gap-5 mb-5">
                    <div className="relative shrink-0 inline-flex items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl animate-glow" />
                      <div className="relative w-24 h-24 rounded-full flex items-center justify-center gold-border bg-card/60">
                        <span className="font-display text-5xl text-gradient-gold">{result}</span>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-gold/70 uppercase tracking-widest mb-1">{meanings[result]?.archetype}</div>
                      <div className="font-display text-2xl text-gold leading-tight">{meanings[result]?.word}</div>
                      <div className="text-xs text-muted-foreground italic mt-1">{meanings[result]?.idea}</div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{meanings[result]?.text}</p>
                  <div className="space-y-1.5 mb-4">
                    {meanings[result]?.strengths.map((s) => (
                      <div key={s} className="flex gap-2 text-xs text-foreground/80">
                        <span className="text-gold mt-0.5">✦</span>{s}
                      </div>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground border-t border-border/40 pt-3">
                    <span className="text-gold font-medium">Зона роста: </span>{meanings[result]?.growth}
                  </div>
                  <a href={BOT_URL} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm text-gold hover:underline">
                    <Icon name="Send" size={14} />Получить полный разбор в боте
                  </a>
                </div>
              ) : (
                <div className="text-center text-muted-foreground/60">
                  <Icon name="Moon" size={80} className="mx-auto mb-4 animate-float-slow text-gold/40" />
                  <p className="font-display text-2xl italic">Числа ждут вас</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-[0.25em] text-gold/80">Воронка продаж</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-4">Как это работает</h2>
          <p className="text-muted-foreground">
            Автоматическая система: Instagram приводит людей, бот прогревает и продаёт — без вашего участия.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            { icon: 'Instagram', step: '01', title: 'Reels в Instagram', desc: 'Вирусные ролики о нумерологии привлекают вашу аудиторию.' },
            { icon: 'Link', step: '02', title: 'Ссылка в профиле', desc: 'Призыв получить бесплатный расчёт ведёт в Telegram-бота.' },
            { icon: 'Bot', step: '03', title: 'Бесплатная польза', desc: 'Бот выдаёт расчёт числа судьбы — знакомит и вовлекает.' },
            { icon: 'CreditCard', step: '04', title: 'Автопродажа', desc: 'Бот предлагает полный разбор и сам выдаёт его после оплаты.' },
          ].map((s, i) => (
            <div
              key={s.step}
              className="glass rounded-2xl p-7 relative animate-fade-up hover:-translate-y-1 transition-transform"
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <span className="font-display text-5xl text-gold/20 absolute top-4 right-5">{s.step}</span>
              <div className="w-12 h-12 rounded-full gold-border bg-card/60 flex items-center justify-center mb-5">
                <Icon name={s.icon} size={22} className="text-gold" />
              </div>
              <h3 className="font-display text-xl font-semibold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BOT DEMO */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-xs uppercase tracking-[0.25em] text-gold/80">Telegram-бот</span>
            <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-5">
              Продаёт за вас, <span className="text-gradient-gold italic">пока вы спите</span>
            </h2>
            <p className="text-muted-foreground mb-8">
              Бот сам ведёт диалог: даёт бесплатный расчёт, прогревает интерес и предлагает платный гайд.
              Оплата проходит прямо в Telegram, материал выдаётся автоматически.
            </p>
            <div className="space-y-4">
              {[
                { icon: 'Gift', t: 'Лид-магнит', d: 'Бесплатное число судьбы для каждого новичка.' },
                { icon: 'Wallet', t: 'Оплата внутри Telegram', d: 'ЮKassa, Robokassa — без перехода на сторонние сайты.' },
                { icon: 'Zap', t: 'Мгновенная выдача', d: 'PDF-гайд приходит сразу после оплаты.' },
                { icon: 'Megaphone', t: 'Рассылки', d: 'Анонсируйте новые продукты всей базе в один клик.' },
              ].map((f) => (
                <div key={f.t} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full gold-border bg-card/60 flex items-center justify-center shrink-0">
                    <Icon name={f.icon} size={18} className="text-gold" />
                  </div>
                  <div>
                    <div className="font-medium">{f.t}</div>
                    <div className="text-sm text-muted-foreground">{f.d}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat mockup */}
          <div className="glass rounded-3xl p-6 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-violet/20 blur-3xl animate-glow" />
            <div className="relative flex items-center gap-3 pb-4 border-b border-border/50 mb-5">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold to-violet flex items-center justify-center">
                <Icon name="Sparkles" size={18} className="text-background" />
              </div>
              <div>
                <div className="font-medium text-sm">Нумеролог-помощник</div>
                <div className="text-xs text-gold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold animate-glow" />в сети
                </div>
              </div>
            </div>
            <div className="space-y-3 relative">
              <div className="bg-secondary/70 rounded-2xl rounded-tl-sm p-3 max-w-[85%] text-sm animate-fade-up">
                Здравствуйте! ✨ Готовы узнать, что говорят о вас цифры? Я бесплатно рассчитаю ваше Число Судьбы.
              </div>
              <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm p-3 max-w-[70%] ml-auto text-sm animate-fade-up" style={{ animationDelay: '0.15s' }}>
                Да, рассчитать! 14.08.1991
              </div>
              <div className="bg-secondary/70 rounded-2xl rounded-tl-sm p-3 max-w-[85%] text-sm animate-fade-up" style={{ animationDelay: '0.3s' }}>
                Ваше Число Судьбы — <span className="text-gold font-semibold">8</span>! Число лидеров и финансового успеха. Но есть и обратная сторона…
              </div>
              <div className="bg-secondary/70 rounded-2xl rounded-tl-sm p-3 max-w-[90%] text-sm animate-fade-up" style={{ animationDelay: '0.45s' }}>
                Хотите полный «Персональный разбор» на 15 страниц: совместимость, кармические задачи, финансовые коды?
                <div className="mt-3 flex flex-col gap-2">
                    <a href={BOT_URL} target="_blank" rel="noopener noreferrer" className="block text-center bg-primary text-primary-foreground rounded-full py-2 text-xs font-medium hover:opacity-90 transition-opacity">
                    Да, хочу разбор · 499 ₽
                  </a>
                  <button className="gold-border rounded-full py-2 text-xs hover:bg-secondary transition-colors w-full">
                    Пока не интересно
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* REELS CONTENT MACHINE */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="glass rounded-3xl p-8 md:p-14 relative overflow-hidden">
          <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-gold/10 blur-3xl animate-glow" />
          <div className="relative grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="text-xs uppercase tracking-[0.25em] text-gold/80">Контент-машина</span>
              <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-5">
                Reels, которые <span className="text-gradient-gold italic">сами продвигаются</span>
              </h2>
              <p className="text-muted-foreground mb-7">
                Генерируйте идеи вирусных роликов, снимайте контент-спринтом и планируйте публикации
                на недели вперёд. Алгоритмы приведут новых подписчиков в воронку.
              </p>
              <div className="flex flex-wrap gap-3">
                {['AI-идеи Reels', 'Контент-план', 'Отложенный постинг', 'Готовые сценарии'].map((t) => (
                  <span key={t} className="text-sm gold-border rounded-full px-4 py-2 text-foreground/90">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {[
                { hook: '«Эта цифра в дате говорит о богатстве»', cta: 'Рассчитай бесплатно в боте' },
                { hook: '«3 числа, которые притягивают любовь»', cta: 'Проверь совместимость' },
                { hook: '«Ваш год по дате рождения»', cta: 'Получи прогноз в Telegram' },
              ].map((r, i) => (
                <div
                  key={r.hook}
                  className="flex items-center gap-4 bg-card/50 rounded-2xl p-4 gold-border animate-fade-up hover:-translate-x-1 transition-transform"
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  <div className="w-12 h-16 rounded-lg bg-gradient-to-br from-violet/40 to-gold/30 flex items-center justify-center shrink-0">
                    <Icon name="Play" size={18} className="text-foreground" />
                  </div>
                  <div>
                    <div className="font-display text-lg leading-tight mb-1">{r.hook}</div>
                    <div className="text-xs text-gold flex items-center gap-1">
                      <Icon name="ArrowRight" size={12} />{r.cta}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* GUIDES */}
      <section id="guides" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-[0.25em] text-gold/80">Библиотека</span>
          <h2 className="font-display text-4xl md:text-5xl font-semibold mt-3 mb-4">Гайды и практики</h2>
          <p className="text-muted-foreground">
            Доступ открывается сразу после оплаты прямо в Telegram-боте.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((g, i) => (
            <div
              key={g.title}
              className="glass rounded-2xl p-6 flex flex-col hover:-translate-y-2 transition-transform duration-300 group animate-fade-up"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="w-12 h-12 rounded-full gold-border bg-card/60 flex items-center justify-center font-display text-2xl text-gold group-hover:bg-gold/10 transition-colors">
                  {g.num}
                </div>
                <span className="text-[10px] uppercase tracking-wider text-accent-foreground bg-accent/40 px-2.5 py-1 rounded-full">
                  {g.tag}
                </span>
              </div>
              <h3 className="font-display text-xl font-semibold mb-2 leading-tight">{g.title}</h3>
              <p className="text-sm text-muted-foreground mb-6 flex-1">{g.desc}</p>
              <div className="flex items-center justify-between">
                <span className="font-display text-2xl text-gold">{g.price}</span>
                <Button size="sm" className="bg-primary text-primary-foreground hover:opacity-90 rounded-full">
                  <Icon name="Lock" size={14} className="mr-1.5" />Купить
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CABINET */}
      <section id="cabinet" className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass rounded-3xl p-8 md:col-span-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-violet flex items-center justify-center font-display text-2xl text-background">
                А
              </div>
              <div>
                <div className="font-display text-xl">Анна</div>
                <div className="text-sm text-muted-foreground">Число судьбы · 7</div>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {[['Book', 'Гайдов куплено', '3'], ['Sparkles', 'Расчётов', '11'], ['TrendingUp', 'Прогнозов', '2']].map(([icon, label, val]) => (
                <div key={label} className="flex items-center justify-between py-2 border-b border-border/50">
                  <span className="flex items-center gap-2 text-muted-foreground">
                    <Icon name={icon} size={16} className="text-gold" />{label}
                  </span>
                  <span className="font-display text-lg text-gold">{val}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="md:col-span-2 grid sm:grid-cols-2 gap-6">
            {[
              { icon: 'Instagram', title: 'Синхронизация с Instagram', desc: 'Автопубликация рилсов и уведомления о новых прогнозах.' },
              { icon: 'Brain', title: 'AI-рекомендации', desc: 'Бот подбирает гайды на основе вашего числового портрета.' },
              { icon: 'CalendarHeart', title: 'Прогнозы по датам', desc: 'Личные циклы и благоприятные периоды на каждый месяц.' },
              { icon: 'History', title: 'История покупок', desc: 'Все гайды и расчёты всегда под рукой в личном кабинете.' },
            ].map((f) => (
              <div key={f.title} className="glass rounded-2xl p-6 hover:-translate-y-1 transition-transform">
                <Icon name={f.icon} size={28} className="text-gold mb-4" />
                <h3 className="font-display text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-6 py-24 text-center star-field relative">
        <Icon name="Sparkles" size={40} className="text-gold mx-auto mb-6 animate-glow" />
        <h2 className="font-display text-5xl md:text-6xl font-semibold mb-5">
          Начните путь к себе <span className="text-gradient-gold italic">через числа</span>
        </h2>
        <p className="text-muted-foreground max-w-lg mx-auto mb-9">
          Подключите Telegram-бота, получите первый расчёт бесплатно и откройте мир цифровой психологии.
        </p>
        <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 rounded-full text-base px-10 h-14" asChild>
          <a href={BOT_URL} target="_blank" rel="noopener noreferrer">
            <Icon name="Send" size={18} className="mr-2" />Открыть бота в Telegram
          </a>
        </Button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-gold" size={18} />
            <span className="font-display text-lg">Нумера</span>
          </div>
          <div className="flex gap-4">
            <p>© 2026 · Нумерология и цифровая психология</p>
            <Link to="/oferta" className="hover:text-gold transition-colors underline underline-offset-2">Публичная оферта</Link>
            <Link to="/rekvizity" className="hover:text-gold transition-colors underline underline-offset-2">Реквизиты</Link>
          </div>
          <div className="flex gap-4">
            <Icon name="Send" size={18} className="hover:text-gold transition-colors cursor-pointer" />
            <Icon name="Instagram" size={18} className="hover:text-gold transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}