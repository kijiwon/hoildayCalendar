/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import styled from 'styled-components';
import useMoveScroll from './hooks/useMoveScroll';
import { COLOR } from './style/Theme';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from './component/Calendar';

const Main = styled.main`
  width: 100%;
  min-width: 360px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  > h2 {
    font-size: 18px;
    font-weight: 600;
  }
`;
const SearchForm = styled.form`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;
const SearchDate = styled.div``;

const InputYear = styled.input`
  width: 100px;
  padding: 5px 3px 0px 5px;
`;

const SelectMonth = styled.div``;
function App() {
  const { element, onMoveToElement } = useMoveScroll();
  const [holiday, setHoliday] = useState('');
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  // const formatMonth = (month) => {
  //   return month < 10 ? '0' + month : month;
  // };
  useEffect(() => {
    console.log('---새로고침---');
    console.log(month, year);
  }, [month, year]);
  const handleYear = (e) => {
    setYear(e.target.value);
  };
  const handleMonth = (e) => {
    setMonth(e.target.value);
    console.log(e.target.value); // 선택된 값 콘솔 출력
  };

  useEffect(() => {
    axios
      .get(
        `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getRestDeInfo?solYear=${year}&ServiceKey=${process.env.REACT_APP_SERVICE_KEY}`
      )
      .then((res) => {
        setHoliday(res.data.response.body.items.item);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [month, year]);

  console.log(holiday);
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
        <h2>어느달에 가장 많이 쉴 수 있을까?</h2>
        <SearchForm>
          <SearchDate>
            <InputYear
              defaultValue={year}
              type="text"
              placeholder="연도"
              onChange={handleYear}
            />
            <span>년</span>
          </SearchDate>
          <SelectMonth>
            <select defaultValue={month} onChange={handleMonth}>
              <option value={'1'}>01</option>
              <option value={'2'}>02</option>
              <option value={'3'}>03</option>
              <option value={'4'}>04</option>
              <option value={'5'}>05</option>
              <option value={'6'}>06</option>
              <option value={'7'}>07</option>
              <option value={'8'}>08</option>
              <option value={'9'}>09</option>
              <option value={'10'}>10</option>
              <option value={'11'}>11</option>
              <option value={'12'}>12</option>
            </select>
          </SelectMonth>
        </SearchForm>
        <button onClick={() => console.log(year, month)}>찾아보기</button>
        <Calendar holiday={holiday}></Calendar>
      </SecondContainer>
    </Main>
  );
}

export default App;
