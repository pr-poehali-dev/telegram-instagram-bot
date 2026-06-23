import Icon from '@/components/ui/icon';
import { Link } from 'react-router-dom';

export default function Oferta() {
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
        <h1 className="font-display text-4xl md:text-5xl font-semibold mb-3">Публичная оферта</h1>
        <p className="text-muted-foreground mb-10 text-sm">Последнее обновление: 23 июня 2026 г.</p>

        <div className="space-y-8 text-foreground/90 leading-relaxed">

          <section>
            <h2 className="font-display text-2xl text-gold mb-3">1. Общие положения</h2>
            <p>Настоящий документ является публичной офертой (далее — «Оферта») и определяет условия приобретения цифровых продуктов (гайдов, нумерологических разборов) на сайте <strong>https://telegram-instagram-bot--preview.poehali.dev</strong> и в Telegram-боте <strong>@Numerolog_helper_bot</strong>.</p>
            <p className="mt-3">Оферта адресована любому физическому лицу, использующему сайт или Telegram-бот (далее — «Покупатель»). Совершение оплаты означает полное и безоговорочное принятие условий настоящей Оферты.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-gold mb-3">2. Продавец</h2>
            <div className="glass rounded-2xl p-5 text-sm space-y-1">
              <p><span className="text-muted-foreground">ФИО:</span> Журавлева Наталья Владимировна</p>
              <p><span className="text-muted-foreground">Статус:</span> Самозанятый</p>
              <p><span className="text-muted-foreground">ИНН:</span> 651301545061</p>
              <p><span className="text-muted-foreground">Telegram:</span> <a href="https://t.me/Natali2317" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">@Natali2317</a></p>
              <p><span className="text-muted-foreground">Telegram-бот:</span> <a href="https://t.me/Numerolog_helper_bot" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">@Numerolog_helper_bot</a></p>
              <p><span className="text-muted-foreground">Сайт:</span> https://telegram-instagram-bot--preview.poehali.dev</p>
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl text-gold mb-3">3. Предмет договора</h2>
            <p>Продавец обязуется передать Покупателю цифровые информационные продукты (нумерологические гайды, персональные разборы, прогнозы) в электронном виде (PDF или сообщение в Telegram), а Покупатель обязуется оплатить их в соответствии с актуальными ценами.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-gold mb-3">4. Порядок оформления и оплаты</h2>
            <ol className="list-decimal list-inside space-y-2 text-sm">
              <li>Покупатель выбирает продукт в Telegram-боте или на сайте.</li>
              <li>Покупатель производит оплату через платёжный сервис ЮКасса.</li>
              <li>После успешной оплаты продукт автоматически направляется Покупателю в Telegram.</li>
              <li>Чек об оплате направляется на e-mail, указанный при оплате.</li>
            </ol>
          </section>

          <section>
            <h2 className="font-display text-2xl text-gold mb-3">5. Стоимость и валюта</h2>
            <p>Все цены указаны в российских рублях (₽) и включают НДС (если применимо). Продавец вправе изменять цены без предварительного уведомления. Оплата производится по цене, действовавшей на момент совершения заказа.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-gold mb-3">6. Возврат средств</h2>
            <p>В соответствии с п. 1 ст. 25 Закона РФ «О защите прав потребителей» и п. 4 ст. 26.1 того же закона, надлежащего качества цифровые товары (информационные продукты), переданные дистанционным способом, возврату и обмену не подлежат.</p>
            <p className="mt-3">В случае технической ошибки или ненадлежащего качества продукта Покупатель вправе обратиться в поддержку через Telegram-бот для решения вопроса в индивидуальном порядке.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-gold mb-3">7. Интеллектуальная собственность</h2>
            <p>Все цифровые продукты являются авторскими материалами и охраняются законодательством РФ об интеллектуальной собственности. Перепродажа, копирование и распространение без письменного согласия Продавца запрещены.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-gold mb-3">8. Персональные данные</h2>
            <p>Оплачивая продукт, Покупатель соглашается на обработку персональных данных (имя, e-mail, данные платежа) в целях исполнения договора и направления информационных сообщений. Данные не передаются третьим лицам, за исключением платёжного сервиса ЮКасса.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-gold mb-3">9. Ответственность</h2>
            <p>Продавец не несёт ответственности за убытки, возникшие вследствие неправильного использования информационных материалов. Все материалы носят информационный и образовательный характер.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-gold mb-3">10. Применимое право</h2>
            <p>Настоящая Оферта регулируется законодательством Российской Федерации. Все споры разрешаются путём переговоров, а при недостижении согласия — в судебном порядке по месту нахождения Продавца.</p>
          </section>

          <section>
            <h2 className="font-display text-2xl text-gold mb-3">11. Контакты</h2>
            <p>По всем вопросам обращайтесь через Telegram-бот: <strong>@Numerolog_helper_bot</strong></p>
          </section>

        </div>
      </main>

      <footer className="border-t border-border/50">
        <div className="max-w-3xl mx-auto px-6 py-8 text-center text-sm text-muted-foreground">
          © 2026 · Нумера · Все права защищены
        </div>
      </footer>
    </div>
  );
}