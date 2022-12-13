import { useMemo, useState } from "react";
import "./common.css"

const Report = ({ total, data }) => {
    const [stocks, setStocks] = useState([])

    useMemo(() => {
        if (data) {
            const details = [];
            data.forEach(strategy => {
                strategy.stocks.forEach(stock => {
                    details.push(<tr key={details.length}>
                        <td>{details.length + 1}</td>
                        <td>{stock.symbol}</td>
                        <td>{stock.name}</td>
                        <td>{stock.no_shares}</td>
                        <td>{stock.current_price}</td>
                        <td>{stock.amount_share}</td>
                        <td>{stock.percentage}</td>
                        <td>{strategy.strategy}</td>
                    </tr>);
                });
            });
            setStocks(details);
        }
    }, [data]);

    return (
        <div>
            <p><b>Total Portfolio Value:</b> {total} USD</p>
            <table>
                <tbody>
                    <tr>
                        <th>#</th>
                        <th>Stock Symbol</th>
                        <th>Stock Name</th>
                        <th># of shares</th>
                        <th>Current Price (USD)</th>
                        <th>Investment Amount (USD)</th>
                        <th>Percentage</th>
                        <th>Strategy Used</th>
                    </tr>
                    {stocks}
                </tbody>
            </table>
        </div>
    )
}

export default Report;