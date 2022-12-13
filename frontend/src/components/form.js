import './common.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { setAmount, setStrategies } from '../store/stock';
import { FormHelperText } from '@mui/material';

function Form({setShowForm}) {
  const [strategy1, setStrategy1] = useState('Ethical Investing');
  const [strategy2, setStrategy2] = useState('');
  const [amount, setInvestmentAmount] = useState(0);

  const dispatch = useDispatch();
  const submit = () => {
    dispatch(setAmount(amount))
    if (strategy2){
        dispatch(setStrategies([strategy1, strategy2]))
    }
    else{
        dispatch(setStrategies([strategy1]))
    }
    setShowForm(false)
  }
  return (
    <FormControl fullWidth className="form">
      <Grid className= "container" container alignItems="center" justify="center" direction="column" spacing={2}>
        <h2>Stock Suggestion Engine</h2>
        <Grid item>
          <TextField 
            className = "amount"
            label="Amount(USD) to be Invested" 
            variant="outlined"
            type="number"
            InputProps={{ inputProps: { min: 5000} }}
            error={ amount < 5000 }
            helperText="Enter a value greater than 5000 USD"
            onChange={(e) => {setInvestmentAmount(e.target.value)}}
          />
        </Grid>
        <Grid item></Grid>
        <Grid item>
        <FormControl>
          <InputLabel id="strategy1-label">Strategy 1</InputLabel>
            <Select
              className = "select"
              labelId="strategy1-label"
              id="strategy1-select"
              value={strategy1}
              label="Strategy 1"
              onChange={(e) => { setStrategy1(e.target.value) }}
            >
              <MenuItem value={'Ethical Investing'}>Ethical Investing</MenuItem>
              <MenuItem value={'Value Investing'}>Value Investing</MenuItem>
              <MenuItem value={'Growth Investing'}>Growth Investing</MenuItem>
              <MenuItem value={'Index Investing'}>Index Investing</MenuItem>
              <MenuItem value={'Quality Investing'}>Quality Investing</MenuItem>
            </Select>
        </FormControl>
          

        </Grid>
        <Grid item>
          <FormControl>
            <InputLabel id="strategy2-label">Strategy 2</InputLabel>
            <Select
              className = "select"
              labelId="strategy2-label"
              id="strategy2-select"
              value={strategy2}
              label="Strategy 2"
              error={strategy1 === strategy2}
              helperText="Please select another strategy"
              onChange={(e) => { setStrategy2(e.target.value) }}
            >
              <MenuItem value={''}>None</MenuItem>
              <MenuItem value={'Ethical Investing'}>Ethical Investing</MenuItem>
              <MenuItem value={'Value Investing'}>Value Investing</MenuItem>
              <MenuItem value={'Growth Investing'}>Growth Investing</MenuItem>
              <MenuItem value={'Index Investing'}>Index Investing</MenuItem>
              <MenuItem value={'Quality Investing'}>Quality Investing</MenuItem>
            </Select>
            <FormHelperText>Please select different strategies</FormHelperText>
          </FormControl>
          
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={submit} disabled={amount < 5000 || strategy1 === strategy2}>submit</Button>
        </Grid>
        

      </Grid>
      
    </FormControl>

    
    
  )
}

export default Form;
