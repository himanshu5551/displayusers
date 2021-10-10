import React, { useEffect, useState } from 'react';
import './App.css';
import ReactPaginate from "react-paginate";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  let [userdata, setuserdata] = useState([]);
  let [pagenumber, setpagenumber] = useState(0);

  let getdata = async () => {
    await fetch('https://reqres.in/api/users?page=2').then((res) => res.json()).then(data => setuserdata(data.data)).catch((err) => console.log(err))
  }
  useEffect(() => {
    getdata();

  }, []);

  let usersperpage = 3;
  let usersvisited = pagenumber * usersperpage;

  let displyusers = userdata.slice(pagenumber * 3, usersperpage + usersvisited).map((value) => {
    return (
      //  <a href={value.avatar}>
      //     <div className="container">
      //       <img src={value.avatar} alt="avatar" className="avatarimage" />
      //       <div className="data-box">
      //         <h1> {value.first_name} <span>{value.last_name}</span> </h1>
      //         <h3 className="email"> {value.email} </h3>
      //       </div>
      //     </div>
      //     </a>
      <div className="card" className="d-flex flex-row p-3 m-3 rounded mx-auto d-block text-white bg-dark"  style={{ width: ' 25rem' }}>
        <img src={value.avatar} className="align-self-center" className="rounded" alt="my image" />
        <div className="card-body">
          <h5 className="">{value.first_name} {value.last_name}</h5>
          <p className="text-left"><b>Email:</b> {value.email}</p>
          <a href={value.avatar} className="btn btn-outline-light"> My profile image </a>
        </div>
      </div>

    )
  })

  let pageCount = userdata.length / usersperpage;
  let changepage = ({ selected }) => {
    setpagenumber(selected);
    console.log(pagenumber);
  };

  return (
    <>
      <h5 className="rounded mx-auto d-block text-center m-4"> Excellence Interview Task -2 </h5>

      {displyusers}
      <ReactPaginate 
        previousLabel={"Back"}
        nextLabel={"Next"}
        pageCount={pageCount}
        onPageChange={changepage}
        containerClassName={"paginationbtns"}
        previousLinkClassName={'paginationprevlink'}
        nextLinkClassName={'paginationnextlink'}
        disabledClassName={'paginationdisablebtn'}
        activeClassName={'activebtn'}
      />

    </>
  );
}

export default App;
