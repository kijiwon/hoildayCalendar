/* eslint-disable import/no-unresolved */
import styled from 'styled-components';
import useMoveScroll from './hooks/useMoveScroll';
import { COLOR } from './style/Theme';

const Main = styled.main`
  width: 100%;
  min-width: 360px;
  height: 100%;
  background-color: ${COLOR.main_green};
`;

const FirstContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.header`
  h1 {
    font-size: 48px;
    text-align: center;
    margin-bottom: 30px;
    font-weight: 700;
  }
  h2 {
    font-size: 25px;
    text-align: center;
  }
`;

const MovePageButton = styled.button`
  width: 200px;
  height: 50px;
  position: absolute;
  bottom: 60px;
  text-align: center;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 3px 3px 2px ${COLOR.button_shadow};
  background-color: ${COLOR.main_yellow};
  font-size: 18px;
  font-weight: 600;
  :hover {
    background-color: ${COLOR.main_yellow_hover};
    box-shadow: -3px 0px -3px 3px ${COLOR.button_shadow};
  }
`;

const SecondContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

function App() {
  const { element, onMoveToElement } = useMoveScroll();
  // const [year, setYear]= useState('');
  // const [month, setMonth] = useState('');
  // const url = `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${month}&ServiceKey=${process.env.REACT_APP_SERVICE_KEY}`
  // const [holidayData, setHolidayData] = useState([]);

  // // 버튼 클릭시 api호출
  // const getHoliday = ()=>{
  //   axios
  //   .get(url)
  //   .then((res)=>{
  //     // console.log(res.data.response.body.items.item)
  //     const data =res.data.response.body.items
  //     if(data===undefined){
  //       setHolidayData([])
  //     }
  //     setHolidayData(data)
  //   })
  //   .catch((err)=>{
  //     console.log(err)
  //   })
  // }
  // console.log(holidayData)

  return (
    <Main>
      <FirstContainer>
        <Title>
          <h1>우리는 쉬고싶다.</h1>
          <h2>이번달 휴일은 언제일까?</h2>
        </Title>
        <MovePageButton onClick={onMoveToElement}>확인하러 가기</MovePageButton>
      </FirstContainer>
      <SecondContainer ref={element}>
        <p>here!</p>
      </SecondContainer>
    </Main>
  );
}

export default App;
