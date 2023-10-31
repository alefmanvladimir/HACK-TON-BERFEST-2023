import requests, json
import config
import time

jettons_count = 4965
url = "https://tonapi.io/{}"
jettons_url = url.format("v2/jettons")
headers = {'Authorization': "Bearer {}".format(config.TONAPI_KEY)}

project_data = [('Ton Foundation','foundation.ton','EQCb8dxevgHhBnsTodJKXaCrafplHzAHf1V2Adj0GVlhA5xI','ton.org', 'icons/1.png'),
                ('Megaton Finance','','EQATOALRdF-1caUrqNRW3NKfoXHFqO_a_tcIIMBNYCqTI1fG','megaton.fi', 'icons/2.png'),
                ('Praxis','','EQCBefq4_WZfIBnyVrBeAp2BNJMBqQSLpWN3q53GLgX5zU-C','tonpunks.org', 'icons/3.png'),
                ('Evaa','','EQDspA6XZrai7c5cuCUvGw1wfMuOdXvBSYuc8q8us94fs3Zw','evaa.finance', 'icons/4.png'),
                ('STON.fi','','EQAPWMrbP0K4yVvqqYdynUoelX-I6rDvWRmWJNFDchB4cUPW','ston.fi', 'icons/5.png'),
                ('Fanzee','','EQC5uEjI6iCQcjmoFh2KcUIUsQ7hb17hnK29NoEwtqTjEdlO','fanz.ee', 'icons/6.png'),
                ('The Whales Club','','EQAY-sgFKzGrXO6_0785Et6nMVPK78aJUqaMhR7jwzsEDssX','tonwhales.com/club', 'icons/7.png'),
                ('Whales Stalking','','EQAYBkVlx1li1qg8d4S_6T0fvxFDFiiKzgxQouIGxQJck2C0','tonwhales.com/stalking', 'icons/8.png'),
                ('KINGYTON','investkingyru.ton','EQC75Z49OlHwFvSfa21FMfSe6jMdY4SccRHsGljJR6229u2T','ton.org.in', 'icons/9.png'),
                ('USDLIKE','','EQBjVl0e0tcbdwc-HhzYcU2CXnfbmeAiXEpMwFwRjk9taUfJ','', 'icons/10.png'),
                ('TON Click','','EQCjkyH0rAibDNadPUoD5nyEdUc_QACmaLyOuuyro3vo8sRV','tonclick.online', 'icons/11.png'),
                ('BOLT','boltfoundation.ton','EQD8PqGfXiJBWL7IugIEvX1KjCiCVz2FI2Zp-09WY1IgCFaD','', 'icons/12.png'),
                ('Geckos','','EQCgZ8_3nOTeZhoYzMl-6zClzJQhJtqVAFoQOkfen-rk-WGe','', 'icons/13.png'),
                ('TON Fingerptints','fingerprints.ton','EQD1PIvZLeDmgICYjkzEbvyIZRWNQNS6izrxQJuoXZk_uF2y','', 'icons/14.jpg'),
                ('MINTODINOS','mintodinos.ton','EQC79CMqa1DsK43p9vv-6cuxX-hRCTKtdog-YlVjN-t03TNY','t.me/mintodinos', 'icons/15.png'),
                ('TON Breakfast','','EQA5zis2DeThRS-l9GieuLwYpjRRdsrfRch-9MIahbU46rJK','', 'icons/16.png'),
                ('FollowDragons','followdragons.ton','EQAvYNurOKXnv2ASweTgbdYavcaxnsbZeXXhdJkkvMicOLoZ','followdragons.monster', 'icons/17.png'),
                ('The Dusk','','EQBr7OVNDLtV1kMzUewccHmQqe1rDxRDRE3Fr-WX4tTIGYDp','', 'icons/18.png'),
                ('Ghost in the TON','fresh-supreme.ton','EQBqVxXkNZqzMaZ20ZafMSv5usoEAsoHGVsSrXYu1C_GirpG','', 'icons/19.png'),
                ('System Design DAO','designervoid.ton','EQCrdt_vPS_0pJRXl-Y4aNHsq7TYLmXEOSe3PUD2u3g1klC9','about.systemdesigndao.xyz', 'icons/20.png'),
                ('DHD','soonrugpull.ton','EQB3u9vIjt2Cd4hmb1LruFeU44SwaaMM0ox8uKv8iEs7trWH','dhdco.in', 'icons/21.png'),
                ('TON Planets','planets.ton','EQD2lFs-kxU0VLyDDhNO0XyH7OrBpJHIbMayBqoUtJ4Xb4eq','mars.tonplanets.com', 'icons/22.png'),
                ('Web3 of Utility','ratelance.ton','EQC0PkJStZMRZ5J7jSKd22X1pO9g1saLYNA3D6L1TZRs8AHz','', 'icons/23.png'),
                ('TON Ducks','','EQDh8EdtTVVUuL50A2p-bzJk1Q9qAVK5fSIyCZ7RwktPwxAN','tonducks.ru', 'icons/24.png'),
                ('Rich Cats','','EQDI_7Nk7Fe43pilkdt8rh1Ryl8P8d6-8eieCGVs1p6MYkCF','my.ton.cat/cats', 'icons/25.png'),
                ('Tonnel Network','','EQCbE-S_Bl4l8CgvosBDEnLDwTgz0qmScodUFt3YeE5JziM5','tonnel.network', 'icons/26.png'),
                ('AnimerCN Library','','EQDo-bgnxoAnUNANgeev_hLPfninV1yXW6MvUE5JKMarf_-m','', 'icons/27.png'),
                ('Toncoin Co','toncoindotco.ton','EQBmv0LIG56PLOETKV_-Bz5apBMND3gA9BEaysGIluaoHv5i','toncoin.co', 'icons/28.png'),
                ('Mirosphere','','EQAjz0zyH8esx1joXuDzJ8NTrA7Xmjn6DQVcqZmM1zHwpsLD','mirosphere.org', 'icons/29.png'),
                ('TON Sharks','ton-sharks.ton','EQCsKT7341lTP1BEV9dFzcgjJv8wCdCqpvtoK2c18zO2e5GE','pixelgod.club', 'icons/30.png'),
                ('ЖЮ (LIFEYT)','','EQC7fs4ccs6VbjwAoblwknXye3JLJrrUxytfyulKEj0e1oV9','', 'icons/31.png'),
                ('Toned Ape Club!','tonedapeclub.ton','EQAsHxdJ6Q8TKPyvZxZLV4aJ9jM48LiBIivqxB22Mks0ADIa','', 'icons/32.jpg'),
                ('WEB3WED DAO','','EQB6z9luKkVl41YqoV6kMXTcU11xnuF_wYQgdpfuD76ZwFfe','', 'icons/33.png'),
                ('DAOLama','daolama.ton','EQDExMzpkuqtj07MomeY2rBjefQNJLTGA78prt-47CeefWRI','', 'icons/34.png')]

def get_jettons_json(limit = 1000, offset = 0):
    cur_headers = headers
    if limit > 1000:
        limit = 1000
    elif limit <= 0:
        limit = 1
    if offset < 0:
        offset = 0
    cur_url = jettons_url + "?limit={}&offset={}".format(str(limit), str(offset))
    response = requests.get(cur_url, headers=cur_headers)
    jresponse = json.loads(response.text)
    return jresponse["jettons"]

def get_jettons(limit = 1000, offset = 0):
    arr_jettons = []
    jresponse = get_jettons_json(limit, offset)
    for jetton in jresponse:
        metadata = jetton["metadata"]
        arr_jettons.append("{} ({})".format(metadata["name"], metadata["symbol"]))
    arr_jettons.sort()
    return "\n".join(arr_jettons)

def get_projects():
    result = "Проекты:\n"
    for proj in project_data:
        for msg in proj:
            if msg:
                result = result + '\n' + msg   
        result = result + '\n'
    return result

def check_jettons_count():
    limit = 1000
    offset = 4000
    jettons_count = 4000 
    while True:
        jresponse = get_jettons_json(1000, offset)
        if offset == 0:
            jettons_count = 0
            break
        if len(jresponse) == 0:
            offset = offset - limit
        if len(jresponse) != limit:
            jettons_count = offset + len(jresponse)
            break
        else:
            offset = offset + limit
    return jettons_count

def calc_pages_count(limit, jet_count):
    pages_count = int(jet_count / limit)
    if jet_count % limit != 0:
        pages_count = pages_count + 1
    return pages_count

def calc_offset(limit, page):
    return (page - 1) * limit

def jettons_count_update():
    while True:
        jettons_count = check_jettons_count()
        time.sleep(60 * 60 * 24)

def get_ston_prices():
    ston_url = "https://api.ston.fi/v1/assets"
    response = requests.get(ston_url)
    jresponse = json.loads(response.text)
    return jresponse["asset_list"]

def get_dedust_prices():
    dedust_url = "https://api.dedust.io/v2/pools"
    response = requests.get(dedust_url)
    jresponse = json.loads(response.text)
    return jresponse
