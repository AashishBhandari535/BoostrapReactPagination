import { useState, useEffect } from "react";
import Records from "./components/Records";
import axios from "axios";
import Pagination from "./components/Pagination";
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  // User is currently on this page
  const [currentPage,setCurrentPage] = useState(1);
  // No of Records to be displayed on each page
  const recordsPerPage = 5;
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  //Records to be displayed on the current page
  const currentRecords = data.slice(indexOfFirstRecord,indexOfLastRecord)
  //pass currentRecords to Records component only if you fetch whole components as once

  //Calculate the number of pages
  const nPages = Math.ceil(20 / recordsPerPage)
  //20 is total number of items returned from api
  useEffect(() => {
    async function loadData() {
      try {
        const { data } = await axios({
          method: "GET",
          url: "https://api.storerestapi.com/products",
          params: { page: currentPage, limit: recordsPerPage },
        }); 
        setData(data.data)
        setLoading(false);
      } catch (err) {
        alert(err.message);
      } 
    }
    loadData();
    return () => {
      setData([]);
      setLoading(true);
    }
  }, [currentPage]);
  return (
    <div className="container">
      {/* <Records data={currentRecords} /> */}
      <Records data={data} />
      {loading && <h1>Loading....</h1>}
      <Pagination
        nPages={nPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default App;
//Optimizing useEffect: https://medium.com/@huzaimakhan/optimizing-useeffect-in-react-7e6dca0f4a0b
//pagination tutorial:https://github.com/KunalN25/simple-react-pagination
//Dynamic header with intersection observer:https://www.smashingmagazine.com/2021/07/dynamic-header-intersection-observer/
