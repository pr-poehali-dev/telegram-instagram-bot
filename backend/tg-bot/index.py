"""
Telegram-бот @Numerolog_helper_bot — обработка сообщений.
Считает число судьбы, показывает архетип, предлагает купить гайд.
"""
import os
import json
import requests

BOT_TOKEN = os.environ['TELEGRAM_BOT_TOKEN']
BOT_URL = f'https://api.telegram.org/bot{BOT_TOKEN}'
SITE_URL = 'https://telegram-instagram-bot--preview.poehali.dev'

MEANINGS = {
    1: {'word': 'Мастер / Творец', 'archetype': 'Архетип Мага', 'idea': '«Я создаю свою реальность»', 'text': 'Это архетип чистого потенциала и силы воли. У вас есть все инструменты — талант, ум, энергия и воля — чтобы превратить любую идею в реальность. Вы не ждёте удачного момента, вы его создаёте.'},
    2: {'word': 'Хранительница Тайн', 'archetype': 'Архетип Верховной Жрицы', 'idea': '«Я знаю больше, чем говорю»', 'text': 'Это архетип интуиции, подсознания и скрытых знаний. Вы живёте на границе двух миров — видимого и невидимого. Ваш главный инструмент — внутренний голос.'},
    3: {'word': 'Покровительница / Богиня Изобилия', 'archetype': 'Архетип Императрицы', 'idea': '«Мир заботится обо мне, а я — о мире»', 'text': 'Это архетип плодородия, творчества, изобилия и безусловной любви. Вы умеете создавать красоту, комфорт и приумножать любые ресурсы. Ваша энергия — это энергия роста и процветания.'},
    4: {'word': 'Правитель / Стратег', 'archetype': 'Архетип Императора', 'idea': '«Порядок и структура создают свободу»', 'text': 'Это архетип власти, структуры, дисциплины и ответственности. Вы превращаете хаос в систему. Ваша сила — в логике, планировании и способности брать на себя ответственность за других.'},
    5: {'word': 'Наставник / Хранитель Знаний', 'archetype': 'Архетип Иерофанта', 'idea': '«Знание обретает смысл, когда им делятся»', 'text': 'Это архетип мудрости, традиций и духовного поиска. Вы — мост между поколениями, между знанием и учеником. Ваша миссия — учить, направлять и помогать другим.'},
    6: {'word': 'Партнёр / Мастер Отношений', 'archetype': 'Архетип Влюблённых', 'idea': '«Правильный выбор — это выбор сердцем»', 'text': 'Это архетип выбора, гармонии, союза и глубокой связи. Вы познаёте себя через отношения с другими. Ваш главный урок — слушать своё сердце.'},
    7: {'word': 'Победитель / Двигатель Прогресса', 'archetype': 'Архетип Колесницы', 'idea': '«Воля и контроль ведут к триумфу»', 'text': 'Это архетип прорыва, победы, амбиций и движения вперёд. Вы ставите смелые цели и, благодаря силе воли, преодолеваете все препятствия. Решимость способна творить чудеса.'},
    8: {'word': 'Судья / Хранитель Баланса', 'archetype': 'Архетип Справедливости', 'idea': '«Что посеешь, то и пожнёшь»', 'text': 'Это архетип истины, честности, кармы и равновесия. Вы видите мир без иллюзий. Понимаете закон причины и следствия и знаете, что за каждое действие нужно нести ответственность.'},
    9: {'word': 'Мудрец / Искатель Истины', 'archetype': 'Архетип Отшельника', 'idea': '«Все ответы находятся внутри меня»', 'text': 'Это архетип глубокого самопознания, мудрости и духовного поиска. Вы находите истину в тишине и уединении. Ваша миссия — пройти путь познания и стать маяком для других.'},
}


def reduce_number(n: int) -> int:
    while n > 9:
        n = sum(int(d) for d in str(n))
    return n


def calc_destiny(date_str: str):
    digits = ''.join(c for c in date_str if c.isdigit())
    if len(digits) < 8:
        return None
    return reduce_number(sum(int(d) for d in digits))


def send_message(chat_id: int, text: str, reply_markup=None, parse_mode='HTML'):
    data = {'chat_id': chat_id, 'text': text, 'parse_mode': parse_mode}
    if reply_markup:
        data['reply_markup'] = json.dumps(reply_markup)
    requests.post(f'{BOT_URL}/sendMessage', json=data)


def set_commands():
    commands = [
        {'command': 'start', 'description': 'Начать — получить бесплатный расчёт'},
        {'command': 'calc', 'description': 'Рассчитать число судьбы'},
        {'command': 'guides', 'description': 'Посмотреть все гайды'},
        {'command': 'help', 'description': 'Помощь'},
    ]
    requests.post(f'{BOT_URL}/setMyCommands', json={'commands': commands})


def handle_start(chat_id: int, first_name: str):
    text = (
        f'✨ Привет, <b>{first_name}</b>!\n\n'
        'Я — нумерологический помощник Натальи Журавлевой.\n\n'
        '🔮 Я бесплатно рассчитаю твоё <b>Число Судьбы</b> и расскажу о твоём архетипе.\n\n'
        'Просто отправь мне свою дату рождения в формате:\n'
        '<b>ДД.ММ.ГГГГ</b>\n\n'
        'Например: <code>14.08.1991</code>'
    )
    send_message(chat_id, text)


def handle_guides(chat_id: int):
    text = (
        '📚 <b>Авторские гайды по нумерологии</b>\n\n'
        '1️⃣ Число судьбы: код вашей личности — <b>990 ₽</b>\n'
        '2️⃣ Совместимость в любви и партнёрстве — <b>1 490 ₽</b>\n'
        '3️⃣ Цифровая психология денег — <b>1 990 ₽</b>\n'
        '4️⃣ Прогноз года по дате рождения — <b>1 290 ₽</b>\n'
        '5️⃣ Нумерология для родителей — <b>1 190 ₽</b>\n\n'
        f'👉 Подробнее на сайте: {SITE_URL}'
    )
    markup = {
        'inline_keyboard': [[
            {'text': '🛒 Перейти на сайт', 'url': SITE_URL}
        ]]
    }
    send_message(chat_id, text, reply_markup=markup)


def handle_date(chat_id: int, text: str):
    number = calc_destiny(text)
    if not number:
        send_message(chat_id, '❗ Не могу распознать дату. Попробуй в формате <b>ДД.ММ.ГГГГ</b>, например: <code>14.08.1991</code>')
        return

    m = MEANINGS[number]
    result_text = (
        f'🔮 Твоё <b>Число Судьбы — {number}</b>\n\n'
        f'<b>{m["word"]}</b>\n'
        f'<i>{m["archetype"]}</i>\n\n'
        f'{m["idea"]}\n\n'
        f'{m["text"]}\n\n'
        f'✨ Хочешь узнать больше? Получи полный персональный разбор на 15 страниц: '
        f'сильные стороны, зона роста, совместимость, финансовые коды и прогноз на год.'
    )
    markup = {
        'inline_keyboard': [
            [{'text': '📖 Получить полный разбор — 990 ₽', 'url': SITE_URL + '#guides'}],
            [{'text': '📚 Все гайды', 'url': SITE_URL + '#guides'}],
        ]
    }
    send_message(chat_id, result_text, reply_markup=markup)


def handler(event: dict, context) -> dict:
    """Обработка входящих сообщений от Telegram-бота."""
    if event.get('httpMethod') == 'OPTIONS':
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', 'Access-Control-Max-Age': '86400'}, 'body': ''}

    if event.get('httpMethod') == 'GET':
        set_commands()
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'ok': True, 'message': 'Bot is running'})}

    body = json.loads(event.get('body') or '{}')
    message = body.get('message', {})

    if not message:
        return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'ok': True})}

    chat_id = message['chat']['id']
    first_name = message['chat'].get('first_name', 'друг')
    text = message.get('text', '').strip()

    if text.startswith('/start'):
        handle_start(chat_id, first_name)
    elif text.startswith('/guides'):
        handle_guides(chat_id)
    elif text.startswith('/calc'):
        send_message(chat_id, '📅 Отправь дату рождения в формате <b>ДД.ММ.ГГГГ</b>, например: <code>14.08.1991</code>')
    elif text.startswith('/help'):
        handle_start(chat_id, first_name)
    elif any(c.isdigit() for c in text):
        handle_date(chat_id, text)
    else:
        send_message(chat_id, '🔮 Отправь свою дату рождения в формате <b>ДД.ММ.ГГГГ</b>, например: <code>14.08.1991</code>')

    return {'statusCode': 200, 'headers': {'Access-Control-Allow-Origin': '*'}, 'body': json.dumps({'ok': True})}
