/* eslint-disable no-undef */
/* eslint-disable import/no-unresolved */
import styled from 'styled-components';
import useMoveScroll from './hooks/useMoveScroll';
import { COLOR } from './style/Theme';
import { useState } from 'react';
import axios from 'axios';
import { useQuery } from 'react-query';
import moment from 'moment/moment';

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
  justify-content: center;
  align-items: center;
`;

function App() {
  const { element, onMoveToElement } = useMoveScroll();
  const [getMoment, setMoment] = useState(moment());
  const today = getMoment;
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  console.log(setMonth, setYear);
  const formatMonth = (month) => {
    return month < 10 ? '0' + month : month;
  };

  const { isLoading, isError, data, error } = useQuery(
    ['date'],
    async () => {
      try {
        const response = await axios.get(
          `https://apis.data.go.kr/B090041/openapi/service/SpcdeInfoService/getHoliDeInfo?solYear=${year}&solMonth=${formatMonth(
            month
          )}&ServiceKey=${process.env.REACT_APP_SERVICE_KEY}`
        );
        return response.data.response.body.items;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: (data) => {
        console.log(data);
      },
      onError: (e) => {
        console.log(e.message);
      },
    }
  );

  if (isLoading) {
    return <span>Loading...</span>;
  }
  if (isError) {
    return <span>Error: {error.message}</span>;
  }
  console.log(data.item);

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
        <div className="control">
          <button
            onClick={() => {
              setMoment(getMoment.clone().subtract(1, 'month'));
            }}
          >
            이전달
          </button>
          <span>{today.format('YYYY 년 MM 월')}</span>
          <button
            onClick={() => {
              setMoment(getMoment.clone().add(1, 'month'));
            }}
          >
            다음달
          </button>
        </div>
      </SecondContainer>
    </Main>
  );
}

export default App;
