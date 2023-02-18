import React from "react";
import './holiday.css'

function Holiday({dateName,locdate}){
    return(
        <div>
            <div>{dateName}</div>
            <div>{locdate}</div>
        </div>
    )
}
export default Holiday