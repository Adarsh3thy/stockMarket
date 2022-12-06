from flask import Flask, request
import json
import logging
from datetime import datetime, timedelta
import yfinance as yf
from model import stockSchema, portfolioSchema, strategySchema
import random

logging.basicConfig(level=logging.INFO)

app = Flask(__name__)

@app.route('/')
@app.route('/hello')
def hello():
    return 'Welcome to stock portfolio engine!'


def get_dates():
    now = datetime.now()
    curr_day = now.strftime('%m-%d-%Y')

    d = str(curr_day)
    d1 = datetime.strptime(d, '%m-%d-%Y')
    dates = [(d1 - timedelta(days=i)).strftime('%m-%d-%Y') for i in range(5, 0, -1)]
    return dates


def one_investment_strategy(data, amount, strategy, div):
    investment_amount = int(amount)

    stocks = []
    for stock_element in data[strategy]:

        one_stock_history = []
        stock_percent = int(stock_element['percentage']) / div
        percentage_of_stock = (stock_percent / 100)
        amount_invested = percentage_of_stock * investment_amount
        # print("Money invested in", stock_element['name'], "is", amount_invested)
        ystock = yf.Ticker(stock_element['symbol'])
        curr_price = ystock.info['currentPrice']

        # print(ystock.info)
        no_of_shares = amount_invested / curr_price

        history = ystock.history(period="5d")

        # print("total:",sum(history['Close']*no_of_shares)*(int(stock_element['percentage']) / 100))
        print(history['Close'])
        for price in history['Close']:
            one_stock_history.append(price * no_of_shares)
        stock = dict(symbol=stock_element['symbol'], name=stock_element['name'],
                     current_price=str(curr_price), percentage=stock_percent,
                     amount_share=str(amount_invested), no_shares=no_of_shares,
                     previousClose=ystock.info['previousClose'], open=ystock.info['open'],
                     history=one_stock_history)
        stocks.append(stock)

    strategy = dict(strategy=strategy, stocks=stocks)

    return strategy


def get_weekly_trends(stocks):
    # print("Weekly trends")
    all_history = [stock['history'] for stock in stocks]
    transpose_history = [*zip(*all_history)]
    weekly_trend = [round(sum(stock_history), 1) for stock_history in transpose_history]
    return weekly_trend


@app.route('/investplan', methods=['POST', 'GET'])
def result():
    json_input = request.get_json()
    amount = json_input['amount']
    strategies = json_input["strategies"]
    strategies_out = []
    x = random.randrange(100)
    print(len(strategies))
    all_stocks = []
    with open('investing_strategies.json') as f:
        data = json.load(f)
    print(data)

    for index, strategy in enumerate(strategies):
        strategy_temp = one_investment_strategy(data, amount, strategy, len(strategies))
        strategies_out.append(strategy_temp)
        all_stocks = all_stocks + strategy_temp['stocks']

    weekly_trend = get_weekly_trends(all_stocks)

    dates = get_dates()
    portfolio = dict(id=x, strategies=strategies_out, weekly_trend=weekly_trend, dates=dates)
    return portfolioSchema().dump(portfolio), 200


if __name__ == '__main__':
    app.run(debug=True, port=8080)
