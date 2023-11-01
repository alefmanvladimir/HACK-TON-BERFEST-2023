from tortoise.models import Model
from tortoise import fields, Tortoise, expand_db_url

class StonJetton(Model):
    id = fields.IntField(pk=True)
    address = fields.CharField(max_length=255, null=True)
    name = fields.CharField(max_length=255, null=True)
    prices: fields.ReverseRelation["StonStockPrice"]

    class Meta:
        table = "ston_jetton"

class StonStockPrice(Model):
    id = fields.IntField(pk=True)
    time = fields.DatetimeField()
    price = fields.DecimalField(max_digits=32, decimal_places=2, default=0)
    jetton: fields.ForeignKeyRelation[StonJetton] = fields.ForeignKeyField(
        "models.StonJetton", related_name="prices", to_field="id"
    )

    class Meta:
        table = "ston_stock_price"

    # def __str__(self):
    #     return f"[{self.jetton.id}] {self.jetton.name}"
    
class DedustJetton(Model):
    id = fields.IntField(pk=True)
    address = fields.CharField(max_length=255, null=True)
    name = fields.CharField(max_length=255, null=True)
    prices: fields.ReverseRelation["DedustStockPrice"]

    class Meta:
        table = "dedust_jetton"


class DedustStockPrice(Model):
    id = fields.IntField(pk=True)
    time = fields.DatetimeField()
    price = fields.DecimalField(max_digits=32, decimal_places=2, default=0)
    jetton: fields.ForeignKeyRelation[DedustJetton] = fields.ForeignKeyField(
        "models.DedustJetton", related_name="prices", to_field="id"
    )

    class Meta:
        table = "dedust_stock_price"

    # def __str__(self):
    #     return f"[{self.jetton_id}] {self.jetton_name}"


async def init():
    await Tortoise.init(
        db_url='sqlite://db.sqlite3',
        modules={'models': ['db']}
    )
    await Tortoise.generate_schemas()
