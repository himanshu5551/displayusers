import React, { useEffect, useState } from 'react';
import './App.css';
import ReactPaginate from "react-paginate";

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

    let displyusers = userdata.slice(pagenumber*3, usersperpage + usersvisited).map((value) => {
      return (
     <a href={value.avatar}>
        <div className="main-box">
          <img src={value.avatar} alt="avatar" className="avatarimage" />
          <div className="data-box">
            <h1> {value.first_name} <span>{value.last_name}</span> </h1>
            <h3 className="email"> {value.email} </h3>
          </div>
        </div>
        </a>

      )
    })

    let pageCount = userdata.length/usersperpage;
    let changepage = ({selected}) => {
      setpagenumber(selected);
      console.log(pagenumber);
    };

  return (
    <>
      <h1 className="task2"> Excellence Interview Task -2 </h1>

      {displyusers}
      <ReactPaginate
      previousLabel={"Back"}
      nextLabel={"Next"}
      pageCount={pageCount}
      onPageChange={ changepage }
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
