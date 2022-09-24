import React, { useEffect, useState } from 'react';
import TransactionForm from '../component/TransactionForm';
import TransactionsList from '../component/TransactionsList';
import Container from '@mui/material/Container';
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();
    const [transactions, setTransactions] = useState([]);
    useEffect(() => {
        fetchTransctions();
    }, []);

 const fetchTransctions = async() =>{ 
    const token = Cookies.get("token");
    let fetchRes = fetch(`${process.env.REACT_APP_API_URL}/transaction`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
    });            
    fetchRes.then(res =>
            res.json()).then(data => {
                console.log('---data---', data)
                if(data.error==='Unauthenticated Access!'){
                    console.log('---data---', data.error)
                    navigate("/login");
                }
                setTransactions(data);  
            }).catch((error) => {
                console.error('---Error---', error);                
              });
    };
  return (
    <Container>
        <TransactionForm fetchTransctions ={fetchTransctions} />
        <TransactionsList transactions ={transactions} fetchTransctions ={fetchTransctions} />
      </Container>
  )
}

export default Home