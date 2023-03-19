import React /*, { useEffect, useState}*/ from 'react';
 
function Home() {

  //const[data, setData] = useState([]);
/*
  fetch example
  useEffect(()=>{
      fetch("http://localhost:8080/book", {method:"GET"})
      .then(res => res.json())
      .then(res=> {setData(res);})
  },[])*/

  return (
    <div>
        Hi, build me please{/*data.map(a_data=> <an_component key={a_data.id} a_data = {a_data}></an_component> )*/}        
    </div>
  );
}

export default Home;