import db_runner, db, asyncio

if __name__ == "__main__":
    loop = asyncio.get_event_loop()
    loop.run_until_complete(db.init())
    loop.run_until_complete(db_runner.update_stock_prices())
    loop.close()
