import logo from './logo.svg';
import { useState, useEffect } from 'react';
import './App.css';
import FirstPage from './Components/firstPage/FirstPage';
import SecondPage from './Components/secondPage/SecondPage';
import axios from 'axios'

function App() {

  const [swap, setswap] = useState(false)
  const [data, setdata] = useState([])
  const [loading, setloading] = useState(false)

  const location = new URLSearchParams(window.location.search);
  const params = {
    lineID: location.get('lineID'),
    sectionID: location.get('sectionID'),
  }

  // console.log(params);


  // const [firstData, setfirstData] = useState({
  //   dhu:'',
  //   topFecultyOperations:'',
  //   topDefectedRation:'',
  //   faultWise:''
  // })



  const getData = async (lineID, sectionID) => {
      setloading(true)
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}?lineID=${params.lineID}&&sectionID=${params.sectionID}`)
      setdata(response.data)
      setloading(false)
    } catch (error) {
      console.log(error);
      setloading(false)
    }
  }

  // const getrefData = async (lineID, sectionID) => {
  //   try {
  //     const response = await axios.get(`http://localhost:5003/api/lineSectionWise?lineID=${params.lineID}&&sectionID=${params.sectionID}`)
  //     setdata(response.data)    
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  useEffect(() => {
      getData(params.lineID, params.sectionID)
      // const timer = window.setInterval(()=>{
      //   getrefData(params.lineID, params.sectionID)
      //   console.log("refreshrun");
      // },10000)
      // return clearInterval(timer)
  }, [])

  useEffect(() => {
    const interval = window.setInterval(() => {
      setswap(!swap)
      getData(params.lineID, params.sectionID)
    }, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [swap])


  // if(!params.lineID || !params.sectionID){
  //   return(
  //     <div className='loadingContainer' style={{ display: `${loading ? '' : "none"}` }} >
  //       <div className='loading-spinner'  ></div>
  //     </div>
  //   )
  // }

  if ( loading || data.length === 0) {
    return (
      <div className='loadingContainer' style={{ display: `${loading ? '' : "none"}` }} >
        <div className='loading-spinner'  ></div>
      </div>
    )
  }

  return (
    <>
      <div className='App' >
        {swap ? 
        <FirstPage 
        params={params} 
        dhu={data.TodayDHU} 
        topFaultyOperations={data.Top3FaultyOperations} 
        defectedRatio={data.TodayDefectRatio} 
        faultWise={data.FaultPercentageWise} 
        line={data.line[0].LineDescription}
        section={data.section[0].SectionDescription}
        /> 
        : 
        <SecondPage
        params={params}
        InlineFlagStatus = {data.InlineFlagStatus}
        InlineDhuCpTf = {data.InlineDhuCpTf}
        WorkerWiseFlagRatio = {data.WorkerWiseFlagRatio}
        MachineWiseFlagRatio = {data.MachineWiseFlagRatio}
        OprationWiseFaultRatio = {data.OprationWiseFaultRatio}
        TopBestAndWordWorkers = {data.TopBestAndWordWorkers}
        line={data.line[0].LineDescription}
        section={data.section[0].SectionDescription}
         />
        }</div>
      {/* <div className='App' >
      <SecondPage
        InlineFlagStatus = {data.InlineFlagStatus}
        InlineDhuCpTf = {data.InlineDhuCpTf}
        WorkerWiseFlagRatio = {data.WorkerWiseFlagRatio}
        MachineWiseFlagRatio = {data.MachineWiseFlagRatio}
        OprationWiseFaultRatio = {data.OprationWiseFaultRatio}
        TopBestAndWordWorkers = {data.TopBestAndWordWorkers}
         />
      </div> */}

    </>
  );
}

export default App;
