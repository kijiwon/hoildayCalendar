import { useState } from 'react';
import './App.css';
import { BsFillArrowRightSquareFill } from 'react-icons/bs'
import HolidayList from './component/HolidayList';
import axios from 'axios';
function App() {
  // 현재 기온 api
  // const url = `https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=1329c99004752da584b7ba8078fe61cc`
  // 년도 선택
  const [year, setYear]= useState('');
  const [month, setMonth] = useState('');
  const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${month}&ServiceKey=871FzwAfTTqVJewFZSr8rPUe2p%2F%2BjEGAaGwjC%2FNDGeHLhfE0%2FuCBIw8vbsiYOBndXZzXg484yvlTiUgg3lprAA%3D%3D`
  const getHoliday = async()=>{
    try{
      const data = await axios({
      method:'get',
      url : url
    })
    console.log(data)
    } catch(err){
      console.log('error')
    }
  }
  return (
    <div className="App">
      <header>
        <h1>우리는 원한다.</h1>
        {/* <p>현재 기온 : <span>6.0</span>도</p> */}
        <div>
          <input 
            type='text'
            placeholder='연도'
            value={year}
            onChange={(e)=>setYear(e.target.value)}/>
          <span>년</span>
          <input
            type='text'
            placeholder='월'
            value={month}
            onChange={(e)=>setMonth(e.target.value)}
          />
          <span>월</span>
        </div>
        <h2>의 공휴일</h2>
        <BsFillArrowRightSquareFill onClick={getHoliday}/>
      </header>
      <HolidayList/>
    </div>
  );
}

export default App;
