from aiogram import F, Router, types, flags
from aiogram.filters import Command, CommandObject
from aiogram.types import Message, FSInputFile, BufferedInputFile, CallbackQuery
from aiogram.fsm.context import FSMContext

import datetime
import utils, kb, text, charts, db_runner, db
from states import Gen

# TODO maybe refactoring needed

router = Router()
jettons_limit = {} # TODO thread safe, maybe make DB
time_period = {} # TODO thread safe, maybe make DB1:51 / 2:291:51 / 2:29
time_frequency = {} # TODO thread safe, maybe make DB*

@router.message(Command("start"))
async def start_handler(msg: Message, state: FSMContext):
    await state.set_state(Gen.initial)
    await msg.answer(text.greet.format(name=msg.from_user.full_name), reply_markup=kb.menu)

@router.message(F.text == "Меню")
@router.message(F.text == "Выйти в меню")
@router.message(F.text == "◀️ Выйти в меню")
async def menu(msg: Message, state: FSMContext):
    await state.set_state(Gen.initial)
    await msg.answer(text.menu, reply_markup=kb.menu)

@router.callback_query(F.data == "jetons_list")
async def input_jetons_list(clbck: CallbackQuery, state: FSMContext):
    await state.set_state(Gen.jettons_list)
    if clbck.from_user.id not in jettons_limit:
        jettons_limit[clbck.from_user.id] = 100
    pages_count = utils.calc_pages_count(jettons_limit[clbck.from_user.id], utils.jettons_count)
    pages = kb.pages_builder(1, pages_count)
    await clbck.message.answer(text.jetons_list_text, reply_markup=pages.as_markup())
    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)

@router.callback_query(F.data == "projects_list")
async def input_project_list(clbck: CallbackQuery, state: FSMContext):
    await state.set_state(Gen.projects_list)
    builder = kb.project_menu_builder()
    await clbck.message.answer("Проекты", reply_markup=builder.as_markup())
    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)

@router.callback_query(F.data == "add_tokens")
async def input_add_tokens(clbck: CallbackQuery, state: FSMContext):
    await state.set_state(Gen.add_jetons)
    await clbck.message.answer(text.add_jetons_text)
    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)

async def chart_menu_func(clbck: CallbackQuery, state: FSMContext):
    await state.set_state(Gen.choose_markets)
    await clbck.message.answer(text.choose_market_text, reply_markup=kb.markets)

@router.callback_query(F.data == "charts_prices")
async def chart_menu(clbck: CallbackQuery, state: FSMContext):
    await chart_menu_func(clbck, state)

@router.callback_query(F.data == "DeDust_chart")
async def dedust_prices(clbck: CallbackQuery, state: FSMContext):
    await state.set_state(Gen.dedust_chart)
    infos = await db_runner.get_dedust_info()
    builder = kb.dedust_charts_buttons_builder(infos)
    await clbck.message.answer("Выберите жеттон", reply_markup=builder.as_markup())
    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)

@router.callback_query(F.data == "Ston_chart")
async def ston_prices(clbck: CallbackQuery, state: FSMContext):
    await state.set_state(Gen.ston_chart)
    infos = await db_runner.get_ston_info()
    builder = kb.ston_charts_buttons_builder(infos)
    await clbck.message.answer("Выберите жеттон", reply_markup=builder.as_markup())
    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)

@router.callback_query(F.data == "help")
async def input_help(clbck: CallbackQuery, state: FSMContext):
    await state.set_state(Gen.help)
    await clbck.message.edit_text(text.help_text)
    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)

@router.callback_query(F.data.startswith("projbutton_"))
@flags.chat_action("upload_photo")
async def projbutton_pressed(clbck: types.CallbackQuery):
    number = int(clbck.data.partition("_")[2])
    proj_data = utils.project_data[number]
    projtext = ""
    for i in (0,1,2,3):
        if proj_data[i]:
            projtext = projtext + proj_data[i] + '\n'
    photo = FSInputFile(proj_data[4])
    await clbck.message.answer_photo(photo, caption=projtext)
    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)

@router.callback_query(F.data == "time_period_settings")
async def time_period_settings(clbck: types.CallbackQuery, state: FSMContext):
    await state.set_state(Gen.time_period_settings)
    await clbck.message.answer("Выберите период", reply_markup=kb.time_period_settings)
    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)


@router.callback_query(F.data.startswith("period_"))
async def time_period_settings_pressed(clbck: types.CallbackQuery, state: FSMContext):
    period = clbck.data.partition("_")[2]
    time_period[clbck.from_user.id] = period
    await state.set_state(Gen.time_frequency_settings)
    txt = "Выберите частоту"
    if period == "1_day":
        await clbck.message.answer(txt, reply_markup=kb.time_frequency_settings_1_day)
    elif period == "5_days":
        await clbck.message.answer(txt, reply_markup=kb.time_frequency_settings_5_days)
    elif period == "3_months":
        await clbck.message.answer(txt, reply_markup=kb.time_frequency_settings_3_months)
    

    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)

@router.callback_query(F.data.startswith("frequency_"))
async def time_frequency_settings_pressed(clbck: types.CallbackQuery, state: FSMContext):
    frequency = clbck.data.partition("_")[2]
    time_frequency[clbck.from_user.id] = frequency
    await chart_menu_func(clbck, state)

def get_chart_start_time(user_id):
    period = "1_day"
    if user_id in time_period:
        period = time_period[user_id]
    dt = datetime.datetime.now()
    if period == "1_day":
        dt = dt - datetime.timedelta(days=1)
    elif period == "5_days":
        dt = dt - datetime.timedelta(days=5)
    elif period == "3_months":
        dt = dt - datetime.timedelta(days=90)
    return dt

def get_buf_chart(user_id, data: dict):
    # TODO averaged values must be already saved to DB

    cur_frequency = "1_minutes"
    if user_id in time_frequency:
        cur_frequency = time_frequency[user_id]

    if user_id in time_period:
        cur_period = time_period[user_id]
        timelist = kb.timedict[cur_period]
        if cur_frequency not in timelist:
            cur_frequency = timelist[0]
    else:
        cur_frequency = kb.timelist_1_day[0]

    if cur_frequency == "1_minutes":
        delta = datetime.timedelta(minutes=1)
    elif cur_frequency == "5_minutes":
        delta = datetime.timedelta(minutes=5)
    elif cur_frequency == "15_minutes":
        delta = datetime.timedelta(minutes=15)
    elif cur_frequency == "1_hours":
        delta = datetime.timedelta(hours=1)
    elif cur_frequency == "4_hours":
        delta = datetime.timedelta(hours=4)
    elif cur_frequency == "12_hours":
        delta = datetime.timedelta(hours=12)
    elif cur_frequency == "1_day":
        delta = datetime.timedelta(days=1)

    Y = data['price']
    X = data['time']
    assert(len(Y) == len(X))
    info = {"title": data['name']}

    if cur_frequency == "1_minutes":
        img = charts.chart_buffer(X, Y, info)
    else:
        new_Y = []
        new_X = []
        next_time = X[0] + delta
        counter = 0
        sum = 0
        for i in range(0, len(Y)):
            if X[i] >= next_time:
                next_time = X[i] + delta
                if i+1 != len(X) and X[i+1] > next_time:
                    next_time = X[i+1] + delta
                new_X.append(X[i].replace(minute=0, second=0))
                new_Y.append(sum/counter)
                counter = 0
                sum = 0
            sum = sum + Y[i]
            counter += 1
        
        img = charts.chart_buffer(new_X, new_Y, info)
    
    photo = BufferedInputFile(img.getvalue(), filename="chart.png")
    return photo

@router.callback_query(F.data.startswith("stonchart_"))
@flags.chat_action("upload_photo")
async def stonchart_visualize(clbck: types.CallbackQuery):
    address = clbck.data.partition("_")[2]
    dt = get_chart_start_time(clbck.from_user.id)
    data = await db_runner.get_ston_prices_by_address(dt, address)
    photo = get_buf_chart(clbck.from_user.id, data)
    await clbck.message.answer_photo(
                photo=photo,
                caption=text.img_info
            )
    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)

@router.callback_query(F.data.startswith("dedustchart_"))
@flags.chat_action("upload_photo")
async def dedustchart_visualize(clbck: types.CallbackQuery):
    address = clbck.data.partition("_")[2]
    dt = get_chart_start_time(clbck.from_user.id)
    data = await db_runner.get_dedust_prices_by_address(dt, address)
    photo = get_buf_chart(clbck.from_user.id, data)
    await clbck.message.answer_photo(
                photo=photo,
                caption=text.img_info
            )
    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)

@router.callback_query(F.data.startswith("page_"))
async def pagebutton_pressed(clbck: types.CallbackQuery):
    number = int(clbck.data.partition("_")[2])
    if clbck.from_user.id not in jettons_limit:
        jettons_limit[clbck.from_user.id] = 100
    cur_jetton_limit = jettons_limit[clbck.from_user.id]
    offset = utils.calc_offset(cur_jetton_limit, number)
    msg_text = utils.get_jettons(cur_jetton_limit, offset)
    await clbck.message.edit_text(msg_text)

    pages_count = utils.calc_pages_count(cur_jetton_limit, utils.jettons_count)
    pages = kb.pages_builder(number, pages_count)
    await clbck.message.answer(text.jetons_list_text, reply_markup=pages.as_markup())
    await clbck.message.answer(text.qwe_exit, reply_markup=kb.exit_kb)

@router.message(Command("limit"))
async def cmd_limit(msg: Message, command: CommandObject, state: FSMContext):
    if command.args and command.args.isdigit():
        cur_jettons_limit = int(command.args)
        jettons_limit[msg.from_user.id] = cur_jettons_limit
        if (await state.get_state() == Gen.jettons_list):
            pages_count = utils.calc_pages_count(cur_jettons_limit, utils.jettons_count)
            pages = kb.pages_builder(1, pages_count)
            await msg.answer(text.jetons_list_text, reply_markup=pages.as_markup())
            await msg.answer(text.qwe_exit, reply_markup=kb.exit_kb)

@router.message(Command("page"))
async def cmd_limit(msg: Message, command: CommandObject, state: FSMContext):
    if command.args and command.args.isdigit():
        offset = int(command.args)
        if msg.from_user.id not in jettons_limit:
            jettons_limit[msg.from_user.id] = 100
        cur_jettons_limit = jettons_limit[msg.from_user.id]
        if (await state.get_state() == Gen.jettons_list):
            pages_count = utils.calc_pages_count(cur_jettons_limit, utils.jettons_count)
            pages = kb.pages_builder(offset, pages_count)
            await msg.answer(text.jetons_list_text, reply_markup=pages.as_markup())
            await msg.answer(text.qwe_exit, reply_markup=kb.exit_kb)
