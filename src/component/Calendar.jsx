import styled from 'styled-components';
import moment from 'moment/moment';
import { useState } from 'react';

const Toolbar = styled.div``;

const Calendar = () => {
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

              if (moment().format('YYYYMMDD') === days.format('YYYYMMDD')) {
                return (
                  <td key={index} style={{ backgroundColor: 'red' }}>
                    <span>{days.format('D')}</span>
                  </td>
                );
              } else if (days.format('MM') !== today.format('MM')) {
                return (
                  <td key={index} style={{ backgroundColor: 'gray' }}>
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
    <div>
      <Toolbar>
        <button
          onClick={() => {
            setMoment(today.clone().subtract(1, 'month'));
          }}
        >
          이전달
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
            setMoment(today.clone().add(1, 'month'));
          }}
        >
          다음달
        </button>
      </Toolbar>
      <table>
        <tr>
          <th>일</th>
          <th>월</th>
          <th>화</th>
          <th>수</th>
          <th>목</th>
          <th>금</th>
          <th>토</th>
        </tr>
        <tbody>{calendarArr()}</tbody>
      </table>
    </div>
  );
};

export default Calendar;
