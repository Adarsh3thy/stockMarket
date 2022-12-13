import './App.css';
import { useState } from 'react'
import StockReport from './components/stockReport';
import Form from './components/form';


function App() {  
  const [showForm, setShowForm] = useState(true);
  return (
    <div style={{ height: '100%'}}>
      {showForm ? <Form setShowForm= {setShowForm}></Form> : <StockReport  setShowForm= {setShowForm}></StockReport>}
      
    </div>
  )
}

export default App;
