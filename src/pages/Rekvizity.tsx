import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

export default function Rekvizity() {
  return (
    <div className="min-h-screen bg-cosmos text-foreground">
      <header className="fixed top-0 inset-x-0 z-50">
        <nav className="max-w-4xl mx-auto px-6 py-4 flex items-center gap-4 glass rounded-b-2xl">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Icon name="ArrowLeft" size={18} className="text-gold" />
            <Icon name="Sparkles" className="text-gold" size={20} />
            <span className="font-display text-lg font-semibold">Нумера</span>
          </Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-20">
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">Реквизиты</h1>
        <p className="text-muted-foreground mb-10 text-sm">Сведения о продавце цифровых продуктов</p>

        <div className="glass rounded-3xl p-8 space-y-5 text-sm">
          {[
            { icon: 'User', label: 'ФИО', value: 'Журавлева Наталья Владимировна' },
            { icon: 'Hash', label: 'ИНН', value: '651301545061' },
            { icon: 'Briefcase', label: 'Статус', value: 'Самозанятый' },
            { icon: 'Send', label: 'Telegram', value: '@Natali2317', href: 'https://t.me/Natali2317' },
          ].map((r) => (
            <div key={r.label} className="flex items-center gap-4 py-4 border-b border-border/40 last:border-0">
              <div className="w-10 h-10 rounded-full gold-border bg-card/60 flex items-center justify-center shrink-0">
                <Icon name={r.icon} size={18} className="text-gold" />
              </div>
              <div className="flex-1">
                <div className="text-xs text-muted-foreground mb-0.5">{r.label}</div>
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noopener noreferrer" className="font-medium text-gold hover:underline">
                    {r.value}
                  </a>
                ) : (
                  <div className="font-medium">{r.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-xs text-muted-foreground mt-8 text-center">
          По вопросам оплаты и возврата обращайтесь в Telegram:{' '}
          <a href="https://t.me/Natali2317" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">
            @Natali2317
          </a>
        </p>
      </main>

      <footer className="border-t border-border/50">
        <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          © 2026 · Нумера · Все права защищены
        </div>
      </footer>
    </div>
  );
}
