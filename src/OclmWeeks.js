import './Schedule.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import cheerio  from 'cheerio';
import $ from 'jquery';

import WeekCard from './WeekCard';
function OclmWeeks(props){
    
    return(
    <>
        <div>
            <WeekCard month={props.month} week={getStartofWeek(props.month,0).toDateString().replace('Mon ','')} weekAsDate={getStartofWeek(props.month,0)} />
            <WeekCard month={props.month} week={getStartofWeek(props.month,7).toDateString().replace('Mon ','')} weekAsDate={getStartofWeek(props.month,7)} />
            <WeekCard month={props.month} week={getStartofWeek(props.month,14).toDateString().replace('Mon ','')} weekAsDate={getStartofWeek(props.month,14)} />
            <WeekCard month={props.month} week={getStartofWeek(props.month,21).toDateString().replace('Mon ','')} weekAsDate={getStartofWeek(props.month,21)} />
            <WeekCard month={props.month} week={getStartofWeek(props.month,28).toDateString().replace('Mon ','')} weekAsDate={getStartofWeek(props.month,28)} />
            
        </div>
    </>
    );
}

function getStartofWeek(month, offset=0){
    console.log('In getStartofWeek: month: '+ month);
    var d= new Date(Date.now());
    d.setDate(7+offset);
    console.log('setdate: '+ d.getDate());
    var day = d.getDay();
    var diff= d.getDate() - day + (day == 0 ? -6:1);
    console.log('diff: '+ diff);
    var startDate = new Date(d.setDate(diff));
    d.setMonth(month);
    console.log('startDate: '+ startDate.toDateString());
    return startDate;
}

export default OclmWeeks;