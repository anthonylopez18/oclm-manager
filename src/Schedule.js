import './Schedule.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import cheerio  from 'cheerio';
import $ from 'jquery';

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
    d.setMonth(month > 11 ? month - 12 : month);
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
function getStartofWeek(month, offset=0){
    var d= new Date(Date.now());
    d.setMonth(month);
    d.setDate(d.getDate()+offset);
    var day = d.getDay();
    var diff= d.getDate() - day + (day == 0 ? -6:1);
    var startDate = new Date(d.setDate(diff));
    return startDate;
}
function WeekCard(props){
    const [show, setShow] = useState(false);
    const [fullscreen, setFullscreen] = useState(true);

    const handleClose = () => setShow(false);
    function handleShow(breakpoint) {
        setFullscreen(breakpoint);
        setShow(true);
      }
    return(
        <>
        <div>
            <button className='clm-btn-weeks' onClick={handleShow}>
                Week of {props.week}
            </button>
        </div>
        <Modal fullscreen={fullscreen} show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Week of {props.week}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <OclmSchedule month={props.month} weekAsDate={props.weekAsDate} />
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
        </>
    );
}
function MonthCard(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <>
        <div className='Month-card'>
            <div className='month-contents'>
                <div className='month-links'>
                <button className='schedule-btn clm-btn' onClick={handleShow}>
                    Our Christian Life and Ministry
                </button>
                </div>
                <div className='month-links'>
                    <a  href=''>
                        <button className='schedule-btn attendant-btn'>
                        Attendant Schedule
                        </button>
                    </a>
                </div>
                <div className='month-links'>
                <a  href=''>
                        <button className='schedule-btn sunday-btn'>
                        Sunday Schedule
                        </button>
                    </a>
                </div>
                <div className='month-links'>
                    <a  href=''>
                        <button className='schedule-btn field-btn'>
                        Field Service Schedule
                        </button>
                    </a>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>OCLM Schedule</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <OclmWeeks month={props.month} />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
        
        </>
    );
}

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
class OclmSchedule extends React.Component {
    constructor(props){
        super(props);
        const weekAsDate = props.weekAsDate;
        this.state = {
            error:null,
            isLoaded : false,
            meetingParts : {
                prayer:''
            }
        };
    }
        componentDidMount(){
        let dateToday = Date.now();
        //let dateToday = this.props.weekAsDate;
        var date = new Date(dateToday);
        console.log('year: ' + date.getFullYear());
        var beginningDate = new Date(date.getFullYear(), 0,1);
        //var today = new Date(Date.now());
        var today = this.props.weekAsDate;
        console.log('weekAsDate: ' + today.toDateString());
        
        var diff = today - beginningDate;
        var diffTime = Math.abs(today - beginningDate);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log('diff: ' + diffDays);
        var weekNumber = Number.parseFloat((diffDays/7)+1).toFixed(0);
        console.log(weekNumber);
        var month = today.getMonth();
        month = month +1;
        //const url = "https://wol.jw.org/en/wol/meetings/r1/lp-e/"+date.getFullYear()+"/"+weekNumber;
        const url = "https://oclm-api.herokuapp.com"
        const options = {
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin':'http://localhost:3000'
            },
            method:'POST',
            body: JSON.stringify({
                language:'english',
                month: month,
                day: today.getDate(),
                year: today.getFullYear()
            })
        };
        console.log('month: ' + month);
        console.log('day: ' + (today.getDate()));
        console.log('year: ' + (today.getFullYear()));
        fetch(url,options)
        .then(res => res.text())
        .then(
            (result) => {
                console.log(result);
                var jsonResult = JSON.parse(result);
                this.setState({
                  isLoaded: true,
                  meetingParts: {
                    openingPrayer: jsonResult.response[0].title,
                    openingComments: jsonResult.response[1].title,
                    treasures: jsonResult.response[3].title,
                    gems: jsonResult.response[4].title,
                    reading: jsonResult.response[9].title,
                    studentPart2: jsonResult.response[11].title,
                    studentPart3: jsonResult.response[12].title,
                    studentPart4: jsonResult.response[13].title,
                    midSong: jsonResult.response[15].title,
                    livingPart1: jsonResult.response[16].title,
                    livingPart2: jsonResult.response[17].title,
                    cbs: jsonResult.response[18].title,
                    closingComments: jsonResult.response[19].title,
                  }
                });
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                this.setState({
                  isLoaded: true,
                  error
                });
              }
        );
        
    }
    render(){
        const { error, isLoaded, meetingParts } = this.state;
       
        //console.log("response: " + meetingParts.prayer);
        return(
            <div className='oclm-container'>
                <div className='assignment-container'>
                    <div className='asssignment-left'>7:00 {meetingParts.openingPrayer}</div>
                    <div className='asssignment-right'>Panalangin: XXXXXXX</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>7:05 {meetingParts.openingComments}(1)</div>
                    <div className='asssignment-right'>Chairman: XXXXXXXX</div>
                </div>
                <div className='oclm-header-treasure'>
                    KAYAMANAN MULA SA SALITA NG DIYOS
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>7:06 {meetingParts.treasures} (10)</div>
                    <div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>7:16 {meetingParts.gems} (10)</div>
                    <div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>7:26 {meetingParts.reading} (4): </div>
                    <div className='asssignment-right'><span className='studyNumber'>Aralin X</span>Br. XXXXXXXXXXXXX</div>
                </div>
                <div className='oclm-header-ministry'>
                    MAGING MAHUSAY SA MINISTERYO
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>7:31 {meetingParts.studentPart2} (4): </div>
                    <div className='asssignment-right'><span className='studyNumber'>Aralin X</span>Br. XXXXXXXXXXXXX</div>
                    <div className='asssignment-left'></div><div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>7:36 {meetingParts.studentPart3} (4): </div>
                    <div className='asssignment-right'><span className='studyNumber'>Aralin X</span>Br. XXXXXXXXXXXXX</div>
                    <div className='asssignment-left'></div><div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>7:40 {meetingParts.studentPart4} (4): </div>
                    <div className='asssignment-right'><span className='studyNumber'>Aralin X</span>Br. XXXXXXXXXXXXX</div>
                    <div className='asssignment-left'></div><div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>
                </div>
                <div className='oclm-header-christians'>
                    PAMUMUHAY BILANG KRISTYANO
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>7:47 {meetingParts.midSong}</div>
                    
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>7:52 {meetingParts.livingPart1}</div>
                    <div className='asssignment-right'>Br. XXXXXXXX</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>7:57 {meetingParts.livingPart2}</div>
                    <div className='asssignment-right'>Br. XXXXXXXX</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>8:07 {meetingParts.cbs} (30)</div>
                    <div className='asssignment-right'>Br. XXXXXXXX</div>
                    <div className='asssignment-left'></div><div className='asssignment-right'><span className='studyNumber'>Tagabasa</span>Br. XXXXXXXXXXXXX</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>8:37 {meetingParts.closingComments} (3)</div>
                    <div className='asssignment-right'>Br. XXXXXXXX</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>8:40 Awit XXX : XXXXXXXXXXX</div>
                    <div className='asssignment-right'><span className='studyNumber'>Panalangin</span>Br. XXXXXXXX</div>
                </div>
            </div>
        );
    }    
}


export default Schedule;