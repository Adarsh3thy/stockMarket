// import './App.css';
import getInvestPlan from '../api/stock'
import { useSelector } from 'react-redux';
import { useEffect, useMemo, useState } from 'react'
import StockPieChart from './piechart'
import TrendChart from './linechart';
import Report from './report';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';

function StockReport({setShowForm}) {
  const requestBody = useSelector((state) => state.stock)
  const [showSpinner, setShowSpinner] = useState(true);
  const [response, setResponse] = useState(null)
  const [pieData, setPieData] = useState([])
  const [trendData, setTrendData] = useState([])

  useMemo( () => {
    if (requestBody){
      const fetchData = async () =>  {
        setResponse(await getInvestPlan(requestBody))
        setShowSpinner(false);
      }
      fetchData();
  }
    
  }, [requestBody])

  useEffect ( () => {
    if(response){
      const allStocks = [];
      response.strategies.forEach((strategy) => {
        strategy.stocks.forEach((stock) => {
          allStocks.push({
            name: stock.symbol,
            value: parseFloat(stock.amount_share)
          })
        })
      });
      setPieData(allStocks);
      setTrendData(response.weekly_trend.map((_, i) => ({
        date: response.dates[i],
        amount: parseFloat(response.weekly_trend[i])
      })));
    }
  }, [response]);

  
  return (
    <div className="App">
      <div style={ { height: "1000px", maxWidth: "1000px", marginTop: "20px" } }>
      { showSpinner ? 
      <div>
        <CircularProgress className="loader"/>
      </div>
      : <div>
        <Button variant="contained" onClick={() => {setShowForm(true)}}>go back</Button>
        <br />
        <br />
        <br />
        <h2>Recommended Stock Portfolio:</h2>
        { response ? <Report total={requestBody.amount} data={response.strategies} /> : <></>}
        <br />
        <br />
        <h2>Distribution of stocks:</h2>
        <div style={ { height: "600px", maxWidth: "1000px" } }>
            <StockPieChart data={pieData} />
        </div>
        <div style={ { height: "400px", maxWidth: "1000px" } }>
            <br />
            <br />
            <h2>Weekly Trend for the Portfolio:</h2>
            <TrendChart data={trendData}/>
        </div>
        </div> }
      </div>
    </div>
  );
}

export default StockReport;
