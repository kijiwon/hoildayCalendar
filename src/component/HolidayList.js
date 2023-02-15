import React from "react";
import './holiday.css'
import Holiday from "./Holiday";
import {BsFillArrowLeftSquareFill} from 'react-icons/bs'
function HolidayList({holidayData}){
    const {item,totalCount} = holidayData;
    return (
        <div className="list">
            <h3>2023년 09월의 공휴일</h3>
            <div>{totalCount}</div>
            <div className="holiday">
                <BsFillArrowLeftSquareFill className="btnClose"/>
                <div>
                    <p>2023/09/00 - 추석</p>
                    {item.map((el)=>
                        <Holiday
                        dateName = {el.dateName}
                        locdate = {el.locdate}
                        />
                    )}
                </div>
            </div>
        </div>
    )
}


export default HolidayList;