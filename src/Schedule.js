import './Schedule.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import cheerio  from 'cheerio';
import $ from 'jquery';
import MonthCard from './MonthCard';

function Schedule() {
    
    return (
    <>
    <div className='Schedule'>
       
        <div className='month-card'>
            <div className='month-header'>
                {getMonthAndYear(0)}    
            </div>
            <div className='month-contents'>
                <MonthCard month={getMonth(0)} />
            </div>
        </div>
        <div className='month-card'>
            <div className='month-header'>
                {getMonthAndYear(1)}    
            </div>
            <div className='month-contents'>
                <MonthCard month={getMonth(1)} />
                
            </div>
        </div>
        <div className='month-card'>
            <div className='month-header'>
                {getMonthAndYear(2)}    
            </div>
            <div className='month-contents'>
                <MonthCard month={getMonth(2)}  />
            </div>
        </div>
        <div className='month-card'>
            <div className='month-header'>
                {getMonthAndYear(3)}    
            </div>
            <div className='month-contents'>
                <MonthCard  month={getMonth(3)} />
            </div>
        </div>
    </div>
    
    </>
  );
}

function getMonth(offset){
    var d= new Date(Date.now());
    var month = d.getMonth();
    month = month + offset;
    console.log('In getMonth month: '+month + ' offset = '+offset + ' d: '+ d.getMonth());
    d.setMonth(month > 11 ? month - 12 : month);
    console.log(' d.setMonth: '+ d.getMonth());
    return (d.getMonth());
}
function getMonthAndYear(offset =0){
    var d= new Date(Date.now());
    var month = d.getMonth();
    month = month + offset;
    d.setMonth(month > 11 ? month - 12 : month);
    d.setFullYear(month > 11 ? d.getFullYear() -1 : d.getFullYear());
    var monthStr = '';
    switch (month){
        case 0:
            monthStr = 'JANUARY';
            break;
        case 1:
            monthStr = 'FEBRUARY';
            break;
        case 2:
            monthStr = 'MARCH';
            break;
        case 3:
            monthStr = 'APRIL';
            break;
        case 4:
            monthStr = 'MAY';
            break;
        case 5:
            monthStr = 'JUNE';
            break;
        case 6:
            monthStr = 'JULY';
            break;
        case 7:
            monthStr = 'AUGUST';
            break;
        case 8:
            monthStr = 'SEPTEMBER';
            break;
        case 9:
            monthStr = 'OCTOBER';
            break;
        case 10:
            monthStr = 'NOVEMBER';
            break;
        case 11:
            monthStr = 'DECEMBER';
            break;
    }
    
    return (monthStr + ' ' + d.getFullYear());
}

export default Schedule;