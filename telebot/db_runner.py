
import threading, time, datetime
import db, utils

async def update_stock_prices():
    while True:
        cur_datetime = datetime.datetime.today()
        next_datetime = cur_datetime + datetime.timedelta(minutes=1)
        ston_failed =  False
        dedust_failed = False
        try:
            ston_prices = utils.get_ston_prices()
        except:
            print('loading from ston error ', cur_datetime)
            ston_failed = True
        
        try:
            dedust_prices = utils.get_dedust_prices()
        except:
            print('loading from dedust error ', cur_datetime)
            dedust_failed = True

        if not ston_failed:
            for item in ston_prices:
                if 'dex_usd_price' not in item:
                    continue
                contact_address = item['contract_address']
                dex_price = float(item['dex_usd_price'])
                ston_jetton, _ = await db.StonJetton.get_or_create(address=contact_address, name = item["display_name"])

                price_item = await db.StonStockPrice.create(jetton_id = ston_jetton.id,
                                    time = cur_datetime,
                                    price = dex_price) # TODO save average for 5m, 15m, 1h, 4h, 12h, 1d            
                await ston_jetton.save()
                await price_item.save()

        if not dedust_failed:
            for item in dedust_prices:
                price = item['lastPrice']
                if not price:
                    continue
                address = item['address']

                for asset in item['assets']:
                    if 'address' in asset:
                        cur_address = asset['address']
                    else:
                        cur_address = address

                    metadata = asset['metadata']
                    if not metadata:
                        continue

                    dedust_jetton, _ = await db.DedustJetton.get_or_create(address=cur_address, name = metadata["name"])
                    price_item = await db.DedustStockPrice.create(jetton_id = dedust_jetton.id,
                                            time = cur_datetime,
                                            price = price) # TODO save average for 5m, 15m, 1h, 4h, 12h, 1d
                    await dedust_jetton.save()
                    await price_item.save()

        print(cur_datetime, " saved to DB")
        secs = (next_datetime - datetime.datetime.today()).total_seconds()
        if secs > 0:
            time.sleep(secs)

def run_updating_stock_prices():
    thread = threading.Thread(target=update_stock_prices, daemon=True)
    thread.start()

async def get_dedust_info():
    results = []
    records = db.DedustJetton.all()
    async for record in records:
        result = {}
        result['name'] = record.name
        result['address'] = record.address
        results.append(result.copy())
    return results

async def get_ston_info():
    results = []
    records = db.StonJetton.all()
    async for record in records:
        result = {}
        result['name'] = record.name
        result['address'] = record.address
        results.append(result.copy())
    return results

async def get_dedust_prices(dt: datetime):
    result = {}
    activity_records = db.DedustStockPrice.filter(time__gte=dt).all()
    async for record in activity_records:
        jetton_info = result[record.address]
        jetton = await record.jetton.first()
        jetton_info['name'] = jetton.name
        jetton_info['time'].append(record.time)
        jetton_info['price'].append(record.price)
    return result

async def get_dedust_prices_by_address(dt: datetime, jetton_address):
    result = {'name': '', 'time': [], 'price': []}
    activity_records = db.DedustStockPrice.filter(time__gte=dt, jetton__address=jetton_address).all()
    async for record in activity_records:
        jetton = await record.jetton.first()
        result['name'] = jetton.name
        result['time'].append(record.time)
        result['price'].append(record.price)
    return result

async def get_ston_prices_by_address(dt: datetime, jetton_address):
    result = {'name': '', 'time': [], 'price': []}
    activity_records = db.StonStockPrice.filter(time__gte=dt, jetton__address=jetton_address).all()
    async for record in activity_records:
        jetton = await record.jetton.first()
        result['name'] = jetton.name
        result['time'].append(record.time)
        result['price'].append(record.price)
    return result

async def get_ston_prices(dt: datetime):
    result = {}
    activity_records = db.StonStockPrice.filter(time__gte=dt).all()
    async for record in activity_records:
        jetton_info = result[record.address]
        jetton = await record.jetton.first()
        jetton_info['name'] = jetton.name
        jetton_info['time'].append(record.time)
        jetton_info['price'].append(record.price)
    return result
