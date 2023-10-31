import asyncio, logging
from threading import Thread 

from aiogram import Bot, Dispatcher
from aiogram.enums.parse_mode import ParseMode
from aiogram.fsm.storage.memory import MemoryStorage
from aiogram.utils.chat_action import ChatActionMiddleware

import config, db, db_runner
from handlers import router
import utils

import datetime

async def main():
    bot = Bot(token=config.BOT_TOKEN, parse_mode=ParseMode.HTML)
    dp = Dispatcher(storage=MemoryStorage())
    dp.include_router(router)
    dp.message.middleware(ChatActionMiddleware())
    await bot.delete_webhook(drop_pending_updates=True)
    await dp.start_polling(bot, allowed_updates=dp.resolve_used_update_types())

def initialize():
    loop = asyncio.get_event_loop()
    loop.run_until_complete(db.init())
    loop.close()
    thread = Thread(target=utils.jettons_count_update)
    thread.start()

if __name__ == "__main__":
    logging.basicConfig(level=logging.INFO)
    initialize()
    asyncio.run(main())
