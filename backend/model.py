from marshmallow import Schema, fields, validate

class stockSchema(Schema):
    symbol = fields.Str()
    name = fields.Str()
    current_price = fields.Str()
    percentage = fields.Str()
    amount_share = fields.Str()
    no_shares=fields.Integer()
    previousClose=fields.Str()
    open=fields.Str()
    history = fields.List(fields.Float())

class strategySchema(Schema):
    strategy=fields.Str()
    stocks = fields.List(fields.Nested(stockSchema))

class portfolioSchema(Schema):
    id = fields.Str()
    strategies=fields.List(fields.Nested(strategySchema))
   # stocks = fields.List(fields.Nested(stockSchema))
    weekly_trend=fields.List(fields.Str())
    dates=fields.List(fields.Str())


