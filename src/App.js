import './App.css';
import { useEffect, useState } from 'react';

function App() { 

  const [name , setName] = useState('');
  const [datetime , setDatetime] = useState('');
  const [description , setDescription] = useState('');
  const [transactions , setTransactions] = useState([]);

  useEffect(() => {
    getTransactions().then(transactions => {
      setTransactions([...transactions]);
    });
  },[]);

  async function getTransactions(){
    const url = process.env.REACT_APP_API_URL + '/transactions';
    const response = await fetch(url);
    return await response.json();
  }

  function addNewTransaction(e){
    // e.preventDefault();
    const url = process.env.REACT_APP_API_URL + '/transaction';
    const price = name.split(' ')[0];
    fetch(url ,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        price,
        name: name.slice(price.length+1),
        datetime,
        description
      })
    }).then(response => {
      response.json().then(json => {
        setName('');
        setDatetime('');
        setDescription('');
      });
    });
  }
  let balance = 0;
  transactions.forEach(transaction => {
    balance += transaction.price;
  });
    
  return (
    <main>
      <h1>
        {" "}
        ₹{balance}
        <span></span>
      </h1>
      <form onSubmit={addNewTransaction}>
        <div className="basic">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={"eg: -300 coffee"}
          />
          <input
            type="datetime-local"
            value={datetime}
            onChange={(e) => setDatetime(e.target.value)}
          />
        </div>
        <div className="description">
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"discription"}
          />
        </div>
        <button type="submit">Add new transaction</button>
      </form>
      {transactions.length > 0 &&
        transactions
          .slice()
          .reverse()
          .map((transaction) => (
            <div className="transaction">
              <div className="left">
                <div className="name">{transaction.name}</div>
                <div className="discription">{transaction.description}</div>
              </div>
              <div className="right">
                <div
                  className={
                    "amount " + (transaction.price < 0 ? "red" : "green")
                  }
                >
                  {transaction.price}
                </div>
                <div className="datetime">{transaction.datetime}</div>
              </div>
            </div>
          ))}
    </main>
  );
}

export default App;
