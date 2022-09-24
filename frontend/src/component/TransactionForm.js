import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';


const initialForm ={amount:0, description:"", transaction_date: new Date()};
export default function TransactionForm({fetchTransctions}) {
    const [form, setform] = useState(initialForm)
    
    const handleInput=(e)=>{
        setform({...form, [e.target.name]:e.target.value});  
    };
    const handleDate=(newDate)=>{
        setform({...form, transaction_date:newDate});  
    };

    const handleSubmit= async(e)=>{
        e.preventDefault();
        console.log('--form submit--', form);
        const resp = await fetch(`${process.env.REACT_APP_API_URL}/transaction`,{
          method:"POST",
          body:JSON.stringify(form),
          headers:{
            'content-type':"application/json"
          }
        });
        console.log('--resp--', resp);
        if(resp.ok){
            setform(initialForm);
           fetchTransctions();    
        }
       };
      
  return (
  <>
    <Card sx={{ minWidth: 275, marginTop:10 }}>
      <CardContent>  
        <form onSubmit={handleSubmit}>     
        <Typography variant="h6" gutterBottom>Add New Transaction</Typography>
          <TextField sx={{marginRight:5}} name="amount" id="outlined-basic" onChange= {handleInput} value={form.amount} label="Amount" size="small" variant="outlined" />
          <TextField sx={{marginRight:5}} name="description" id="outlined-basic" onChange= {handleInput} value={form.description} label="Description" size="small" variant="outlined" />
          <LocalizationProvider dateAdapter={AdapterDayjs}>           
                <DesktopDatePicker
                label="Transaction Date"
                inputFormat="MM/DD/YYYY"
                value={form.transaction_date}
                onChange={handleDate}
                renderInput={(params) => <TextField sx={{marginRight:5}} size="small" {...params} />}
                />
               
            </LocalizationProvider>
            <Button type="submit" variant="contained">Submit</Button>
        </form>
      </CardContent>
      
    </Card>
    </>
  );
}
