/* eslint-disable react/prop-types */
import styled from 'styled-components';
import moment from 'moment/moment';
import { useState } from 'react';
import {
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

const Container = styled.main``;
const Toolbar = styled.div`
  margin-bottom: 30px;
  button {
    border: none;
    background-color: inherit;
  }
`;
const CalendarTable = styled.table``;
const Week = styled.tr``;
const Days = styled.tbody``;

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
                  <td key={index} style={{ backgroundColor: 'gray' }}>
                    <span>{days.format('D')}</span>
                  </td>
                );
              } else if (isHoliday) {
                return (
                  <td key={index} style={{ backgroundColor: 'red' }}>
                    <span>{days.format('D')}</span>
                  </td>
                );
              } else {
                return (
                  <td key={index}>
                    <span>{days.format('D')}</span>
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
            <th>일</th>
            <th>월</th>
            <th>화</th>
            <th>수</th>
            <th>목</th>
            <th>금</th>
            <th>토</th>
          </Week>
          {calendarArr()}
        </Days>
      </CalendarTable>
    </Container>
  );
};

export default Calendar;
