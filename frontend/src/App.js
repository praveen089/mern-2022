import {useState} from 'react';

function App() {
  const [form, setform] = useState({amount:0, description:"", transaction_date:""})

 const handleSubmit= async(e)=>{
  e.preventDefault();
  console.log('--form submit--', form);
  const resp = await fetch("http://localhost:4000/transaction",{
    method:"POST",
    body:JSON.stringify(form),
    headers:{
      'content-type':"application/json"
    }
  });
  console.log('--resp--', resp);
 };

 const handleInput=(e)=>{
  setform({...form, [e.target.name]:e.target.value});  
 };

  return (
    <div>
      <form onSubmit= {handleSubmit}>
        <input type="number" name="amount" value={form.amount} onChange={handleInput} placeholder="Enter Amount" />
        <input type="text" name="description"  value={form.description} onChange={handleInput} placeholder="Enter Description" />
        <input type="date" name="transaction_date"  value={form.transaction_date} onChange={handleInput} />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
