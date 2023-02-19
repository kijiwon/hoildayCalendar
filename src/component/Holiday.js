import React from "react";
import './holiday.css'

function Holiday({dateName,locdate}){
    // console.log(typeof locdate)
    let date = String(locdate)
    // console.log(typeof date)
    let year = date.slice(0,4);
    let month = date.slice(4,6);
    let day = date.slice(6);
    return(
        <div className="list-item">
            <div>{year}년 {month}월 {day}일</div>
            <div>{dateName}</div>
        </div>
    )
}
export default Holiday