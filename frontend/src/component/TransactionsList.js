import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import EditSharpIcon from '@mui/icons-material/EditSharp';
import DeleteSharpIcon from '@mui/icons-material/DeleteSharp';
import IconButton from '@mui/material/IconButton';
import dayjs from 'dayjs';

export default function TransactionsList({transactions, fetchTransctions}) {
    let i=0;
    const deleteTransaction = async(id)=>{
        console.log('--Delete Id--', id);
        if(!window.confirm('Are you sure want to delete transaction?')) return false;
        let resp = await fetch(`${process.env.REACT_APP_API_URL}/transaction/${id}`,{
            method:"DELETE",
        }); 
        if(resp.ok){
            fetchTransctions();
            window.alert('Deleted Successfully!');
        }
        
    }
  return (
    <>
    <Typography variant="h6" sx={{marginTop:10}}>Manage Transactions</Typography>
    <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Sr No.</TableCell>
            <TableCell align="center">Amount(Rs)</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Transaction Date</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions && transactions.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{i=i+1}</TableCell>
              <TableCell align="center">{row.amount}</TableCell>
              <TableCell align="center">{row.description}</TableCell>
              <TableCell align="center">{dayjs(row.transaction_date).format('DD MMM YYYY')}</TableCell>
              <TableCell align="center">
                <IconButton color="secondary" aria-label="Edit Transaction"><EditSharpIcon /> </IconButton>
                <IconButton color="warning" aria-label="Delete Transaction" onClick={()=>deleteTransaction(row._id)}> 
                    <DeleteSharpIcon  />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
