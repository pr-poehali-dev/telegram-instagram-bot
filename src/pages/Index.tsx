import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';

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
];

const reduce = (n: number): number => {
  while (n > 9) n = String(n).split('').reduce((a, b) => a + +b, 0);
  return n;
};

const meanings: Record<number, { word: string; text: string }> = {
  1: { word: 'Лидер', text: 'Сила воли, независимость и новые начинания. Ваш путь — вести за собой.' },
  2: { word: 'Дипломат', text: 'Гармония, чувствительность и партнёрство. Вы создаёте связи и баланс.' },
  3: { word: 'Творец', text: 'Самовыражение, радость и общение. Творчество — ваш источник энергии.' },
  4: { word: 'Строитель', text: 'Порядок, надёжность и труд. Вы возводите прочный фундамент жизни.' },
  5: { word: 'Искатель', text: 'Свобода, перемены и приключения. Ваша стихия — движение и опыт.' },
  6: { word: 'Хранитель', text: 'Любовь, забота и ответственность. Дом и близкие — ваша опора.' },
  7: { word: 'Мудрец', text: 'Анализ, духовность и поиск истины. Вы видите глубже поверхности.' },
  8: { word: 'Магнат', text: 'Власть, амбиции и материальный успех. Вы рождены управлять ресурсами.' },
  9: { word: 'Гуманист', text: 'Сострадание, мудрость и завершение циклов. Ваша миссия — служение миру.' },
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
            <a href="#guides" className="hover:text-gold transition-colors">Гайды</a>
            <a href="#cabinet" className="hover:text-gold transition-colors">Кабинет</a>
          </div>
          <Button className="bg-primary text-primary-foreground hover:opacity-90 rounded-full font-medium">
            <Icon name="Send" size={16} className="mr-1.5" />
            В Telegram
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
              <a href="#calc"><Icon name="Calculator" size={18} className="mr-2" />Рассчитать бесплатно</a>
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
                <div className="text-center animate-fade-up">
                  <div className="relative inline-flex items-center justify-center mb-5">
                    <div className="absolute inset-0 rounded-full bg-gold/20 blur-2xl animate-glow" />
                    <div className="relative w-40 h-40 rounded-full flex items-center justify-center gold-border bg-card/60">
                      <span className="font-display text-7xl text-gradient-gold">{result}</span>
                    </div>
                  </div>
                  <div className="font-display text-2xl text-gold mb-2">{meanings[result]?.word}</div>
                  <p className="text-sm text-muted-foreground max-w-xs">{meanings[result]?.text}</p>
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
        <Button size="lg" className="bg-primary text-primary-foreground hover:opacity-90 rounded-full text-base px-10 h-14">
          <Icon name="Send" size={18} className="mr-2" />Открыть бота в Telegram
        </Button>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border/50 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Icon name="Sparkles" className="text-gold" size={18} />
            <span className="font-display text-lg">Нумера</span>
          </div>
          <p>© 2026 · Нумерология и цифровая психология</p>
          <div className="flex gap-4">
            <Icon name="Send" size={18} className="hover:text-gold transition-colors cursor-pointer" />
            <Icon name="Instagram" size={18} className="hover:text-gold transition-colors cursor-pointer" />
          </div>
        </div>
      </footer>
    </div>
  );
}
