import React from "react";
import './holiday.css'
import Holiday from "./Holiday";
import {BsFillArrowLeftSquareFill} from 'react-icons/bs'
function HolidayList({holidayData,btnClose,year, month}){
    const {item} = holidayData;

    // console.log(item)
    // item.map((el)=>
    //     console.log(el)
    // )

    return (
        <div className="list">
            <h3>{year}년 {month}월의 공휴일</h3>
            {/* <div>{item.length}</div> */}
            <div className="holiday">
                <BsFillArrowLeftSquareFill className="btnClose" btnClose={btnClose}/>
                <div>
                    <p>2023/09/00 - 추석</p>
                    {/* {Object.keys(item).length !==0 ? (
                        item.map((el)=>
                            <Holiday key={el.datekind}dateName={el.dateName} locdate={el.locdate} />
                        )
                    ) : <div>쉬는 날이 없다니..</div>} */}
                    {/* <Holiday dateName = {item.dateName} locdate={item.locdate}/> */}
                </div>
            </div>
        </div>
    )
}


export default HolidayList;