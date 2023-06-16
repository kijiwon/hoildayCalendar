/* eslint-disable react/prop-types */
import styled from 'styled-components';
import moment from 'moment/moment';
import { useState } from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import { COLOR } from '../style/Theme';
import { AiFillHeart } from 'react-icons/ai';
const Container = styled.main`
  width: 80%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Toolbar = styled.div`
  margin-bottom: 30px;
  text-align: center;
  background-color: ${COLOR.main_yellow};
  border-radius: 10px;
  padding: 5px 3px 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    border: none;
    border-radius: inherit;
    background-color: inherit;
    font-weight: 600;
    font-size: 18px;
    :nth-of-type(2) {
      margin-bottom: 3px;
    }
  }
`;
const CalendarTable = styled.table`
  width: 80%;
  min-height: 200px;
  text-align: center;
`;
const Week = styled.tr`
  font-size: 16px;
  font-weight: 600;
`;
const Days = styled.tbody``;

const Day = styled.span`
  font-size: 16px;
  height: 35px;
  display: inline-block;
  margin-top: 5px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;
const LastOrNextMonth = styled.td`
  background-color: ${COLOR.button_shadow};
`;
const Calendar = ({ holiday }) => {
  console.log(holiday);
  const [today, setMoment] = useState(moment());
  const firstWeek = today.clone().startOf('month').week();
  const lastWeek =
    today.clone().endOf('month').week() === 1
      ? 53
      : today.clone().endOf('month').week();

  const calendarArr = () => {
    let result = [];
    let week = firstWeek;
    for (week; week <= lastWeek; week++) {
      result = result.concat(
        <tr key={week}>
          {Array(7)
            .fill(0)
            .map((data, index) => {
              let days = today
                .clone()
                .startOf('year')
                .week(week)
                .startOf('week')
                .add(index, 'day');

              let isHoliday = false;
              if (Array.isArray(holiday)) {
                const holidayData = holiday.find(
                  (item) => item.locdate === parseInt(days.format('YYYYMMDD'))
                );
                isHoliday = holidayData ? holidayData.isHoliday : false;
              } else if (typeof holiday === 'object') {
                isHoliday =
                  holiday.locdate === parseInt(days.format('YYYYMMDD'))
                    ? holiday.isHoliday
                    : false;
              }

              if (days.format('MM') !== today.format('MM')) {
                return (
                  <LastOrNextMonth key={index}>
                    <Day style={{ color: 'darkgray' }}>{days.format('D')}</Day>
                  </LastOrNextMonth>
                );
              } else if (isHoliday) {
                return (
                  <td key={index}>
                    <Day>
                      {days.format('D')}
                      <AiFillHeart style={{ color: 'red' }} />
                    </Day>
                  </td>
                );
              } else {
                return (
                  <td key={index}>
                    <Day>{days.format('D')}</Day>
                  </td>
                );
              }
            })}
        </tr>
      );
    }
    return result;
  };

  return (
    <Container>
      <Toolbar>
        <button
          onClick={() => {
            setMoment(moment(today).subtract(1, 'month'));
          }}
        >
          <MdOutlineKeyboardArrowLeft />
        </button>
        <button
          onClick={() => {
            setMoment(moment());
          }}
        >
          {today.format('YYYY 년 MM 월')}
        </button>
        <button
          onClick={() => {
            setMoment(moment(today).add(1, 'month'));
          }}
        >
          <MdOutlineKeyboardArrowRight />
        </button>
      </Toolbar>
      <CalendarTable>
        <Days>
          <Week>
            <th style={{ color: 'red' }}>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th style={{ color: 'blue' }}>토</th>
          </Week>
          {calendarArr()}
        </Days>
      </CalendarTable>
    </Container>
  );
};

export default Calendar;
