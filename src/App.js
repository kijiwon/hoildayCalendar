import { useEffect, useState } from 'react';
import './App.css';
import { BsFillArrowRightSquareFill } from 'react-icons/bs'
import HolidayList from './component/HolidayList';
import axios from 'axios';
function App() {
  // 년도 선택
  // https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?serviceKey=871FzwAfTTqVJewFZSr8rPUe2p%2F%2BjEGAaGwjC%2FNDGeHLhfE0%2FuCBIw8vbsiYOBndXZzXg484yvlTiUgg3lprAA%3D%3D&solYear=2020&solMonth=08
  const [year, setYear]= useState('');
  const [month, setMonth] = useState('');
  const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${month}&ServiceKey=871FzwAfTTqVJewFZSr8rPUe2p%2F%2BjEGAaGwjC%2FNDGeHLhfE0%2FuCBIw8vbsiYOBndXZzXg484yvlTiUgg3lprAA%3D%3D`
  const [holidayData, setHolidayData] = useState([]); // 데이터가 없는 상태

  // 버튼 클릭시 api호출
  const getHoliday = async()=>{
    try{
      const data = await axios({
      method:'get',
      url : url

    })
    // console.log(data.data.response.body)
    setHolidayData(data.data.response.body.items)

    if(holidayData===undefined){
      setHolidayData([])
    } 
  } catch(err){
    console.log('error')
  }

  }

  // 슬라이더 클래스 변경
  const [className,setClassName]=useState('show-main');
  // const [showMain, setShowMain] = useState(false);
  const [showResult, setShowResult] = useState(false);
  // 상태에 따라 슬라이드 움직이기
  useEffect(() => {
    setClassName(`${showResult ? "show-result" : "show-main"}`);
  }, [showResult]);
  return (
    <div className="App">
      <header>
        <h1>언제 쉴 수 있을까?</h1>
        <div className='input-box'>
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
        <div className='bottom'>
          <h2>의 공휴일</h2>
          <BsFillArrowRightSquareFill className='btnShow' onClick={()=>{getHoliday(); setShowResult(showResult => !showResult)}}/>
        </div>
      </header>
      <div className={className}>

      </div>
      <HolidayList holidayData={holidayData} year={year} month={month} setShowResult={setShowResult}/>
    </div>
  );
}

export default App;
