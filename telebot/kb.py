from aiogram.types import InlineKeyboardButton, InlineKeyboardMarkup, KeyboardButton, ReplyKeyboardMarkup, ReplyKeyboardRemove
from aiogram.utils.keyboard import InlineKeyboardBuilder
import utils

menu = [
    [InlineKeyboardButton(text="📝 Список жетонов", callback_data="jetons_list"),
    InlineKeyboardButton(text="📜 Список проектов", callback_data="projects_list")],
    [InlineKeyboardButton(text="💳 Добавление жетонов", callback_data="add_tokens"),
    InlineKeyboardButton(text="📊 Графики цен", callback_data="charts_prices")],
    [InlineKeyboardButton(text="🔎 Помощь", callback_data="help")]
]
menu = InlineKeyboardMarkup(inline_keyboard=menu)
exit_kb = ReplyKeyboardMarkup(keyboard=[[KeyboardButton(text="◀️ Выйти в меню")]], resize_keyboard=True)
iexit_kb = InlineKeyboardMarkup(inline_keyboard=[[InlineKeyboardButton(text="◀️ Выйти в меню", callback_data="menu")]])

markets = [
    [InlineKeyboardButton(text="DeDust", callback_data="DeDust_chart")],
    [InlineKeyboardButton(text="Ston", callback_data="Ston_chart")],
    [InlineKeyboardButton(text="Настройки графика", callback_data="time_period_settings")]
]
markets = InlineKeyboardMarkup(inline_keyboard=markets)

def pages_builder(page, pages_count):
    prev_page = str(page - 1)
    cur_page = str(page)
    next_page = str(page+1)
    if page <= 3:
        prev_page = "2"
        cur_page = "3"
        next_page = "4"
    elif page >= (pages_count - 2):
        prev_page = str(pages_count-3)
        cur_page = str(pages_count-2)
        next_page = str(pages_count-1)
    builder = InlineKeyboardBuilder()
    builder.button(text="<< 1", callback_data="page_1")
    builder.button(text="<" + prev_page, callback_data="page_{}".format(prev_page))
    builder.button(text=cur_page, callback_data="page_{}".format(cur_page))
    builder.button(text=next_page + ">", callback_data="page_{}".format(next_page))
    builder.button(text=str(pages_count) + ">>", callback_data="page_{}".format(str(pages_count)))
    builder.adjust(5)
    return builder

def project_menu_builder():
    menu_builder = InlineKeyboardBuilder()
    for i in range(len(utils.project_data)):
        menu_builder.button(text=utils.project_data[i][0], callback_data=f"projbutton_{i}")
    menu_builder.adjust(3)
    return menu_builder

def dedust_charts_buttons_builder(info: list):
    builder = InlineKeyboardBuilder()
    for item in info:
        text = item['name']
        callback_data = "dedustchart_{}".format(item['address'])
        builder.button(text=text, callback_data=callback_data)
    builder.adjust(2)
    return builder

def ston_charts_buttons_builder(info: list):
    builder = InlineKeyboardBuilder()
    for item in info:
        text = item['name']
        callback_data = "stonchart_{}".format(item['address'])
        builder.button(text=text, callback_data=callback_data)
    builder.adjust(2)
    return builder

time_period_settings = [
    [InlineKeyboardButton(text="1 день", callback_data="period_1_day"),
    InlineKeyboardButton(text="5 дней", callback_data="period_5_days"),
    InlineKeyboardButton(text="3 месяца", callback_data="period_3_months")]
]
time_period_settings = InlineKeyboardMarkup(inline_keyboard=time_period_settings)

time_frequency_settings_1_day = [
    [InlineKeyboardButton(text="1 минута", callback_data="frequency_1_minutes"),
    InlineKeyboardButton(text="5 минут", callback_data="frequency_5_minutes"),
    InlineKeyboardButton(text="15 минут", callback_data="frequency_15_minutes"),
    InlineKeyboardButton(text="1 час", callback_data="frequency_1_hours")]
]
time_frequency_settings_1_day = InlineKeyboardMarkup(inline_keyboard=time_frequency_settings_1_day)
timelist_1_day = ("1_minutes", "5_minutes", "15_minutes", "1_hours")

time_frequency_settings_5_days = [
    [
    InlineKeyboardButton(text="5 минут", callback_data="frequency_5_minutes"),
    InlineKeyboardButton(text="15 минут", callback_data="frequency_15_minutes"),
    InlineKeyboardButton(text="1 час", callback_data="frequency_1_hours"),
    InlineKeyboardButton(text="4 часа", callback_data="frequency_4_hours")]
]
time_frequency_settings_5_days = InlineKeyboardMarkup(inline_keyboard=time_frequency_settings_5_days)
timelist_5_days = ("5_minutes", "15_minutes", "1_hours", "4_hours")

time_frequency_settings_3_months = [
    [InlineKeyboardButton(text="1 час", callback_data="frequency_1_hours"),
    InlineKeyboardButton(text="4 часа", callback_data="frequency_4_hours"),
    InlineKeyboardButton(text="12 часов", callback_data="frequency_12_hours"),
    InlineKeyboardButton(text="1 день", callback_data="frequency_1_day")]
]
time_frequency_settings_3_months = InlineKeyboardMarkup(inline_keyboard=time_frequency_settings_3_months)
timelist_3_months = ("1_hours", "4_hours", "12_hours", "1_day")
timedict = {"1_day" : timelist_1_day, "5_days": timelist_5_days, "3_months": timelist_3_months}
