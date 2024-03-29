import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import cheerio  from 'cheerio';
import $ from 'jquery';

class OclmSchedule extends React.Component {
    constructor(props){
        super(props);
        const weekAsDate = props.weekAsDate;
        this.state = {
            error:null,
            isLoading : false,
            meetingParts : {
            },
            assignments:{
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
        var today = new Date(this.props.weekAsDate);
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
        const url ="https://oclm-api.onrender.com"; //"http://localhost:3000"  //https://master.d53xntq70mux1.amplifyapp.com"
        const options = {
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://master.d3ldsmi1fd1rti.amplifyapp.com'  //'http://localhost:3000'
            },
            method:'POST',
            body: JSON.stringify({
                language:'tagalog',
                month: month,
                day: today.getDate(),
                year: today.getFullYear()
            })
        };
        console.log('month: ' + month);
        console.log('day: ' + (today.getDate()));
        console.log('year: ' + (today.getFullYear()));
        this.setState({isLoading:true});
        fetch(url,options)
        .then(res => res.text())
        .then(
            (result) => {
                console.log(result);
                var jsonResult = JSON.parse(result);
                var assignmentResult = jsonResult.assignments;
                var openning;
                var gems;
                var bibleReading;
                var treasures;
                var ministryParts = [];
                var ministryPart1;
                var ministryPart2;
                var ministryPart3;
                var livingParts = [];
                var midSong;
                var livingPart1;
                var livingPart2;
                var livingPart3;
                var cbs;
                var closingComments;
                var closingSong;
                for(var i =0; i<jsonResult.response.length; i++){
                    switch(jsonResult.response[i].sectionName){
                        case 'openning':
                            console.log('openning: '+jsonResult.response[i].title);
                            openning=jsonResult.response[i].title;
                            break;
                        case 'treasures':
                            if(jsonResult.response[i].title.includes('Espirituwal na Hiyas')){
                                gems = jsonResult.response[i].title;
                                break;
                            }
                            if(jsonResult.response[i].title.includes('Pagbabasa ng Bibliya')){
                                bibleReading = jsonResult.response[i].title;
                                break;
                            }
                            treasures = jsonResult.response[i].title;
                            break;
                        case 'ministry':
                            ministryParts.push(jsonResult.response[i].title);
                            break;
                        case 'living':
                            livingParts.push(jsonResult.response[i].title);
                            break;
                        default:
                            break;
                    }
                    
                }
                for(var i=0; i<livingParts.length;i++){
                    switch(i){
                        case 0:
                            midSong = livingParts[i];
                            break;
                        case 1:
                            livingPart1 = livingParts[i]
                            break;
                        case 2:
                            if(livingParts.length >=5)
                                livingPart2 = livingParts[i];
                        case 3:
                            if(livingParts.length >5)
                                livingPart3 = livingParts[i];
                        case livingParts.length-3:
                            cbs = livingParts[i]
                            break;
                        case livingParts.length-2:
                            closingComments = livingParts[i]
                            break;
                        case livingParts.length-1:
                            closingSong = livingParts[i]
                            break;
                    }
                }
                if(livingParts.length == 5)
                    livingPart2 = livingParts[i];
                if(livingParts.length == 6)
                    livingPart3 = livingParts[i];
                for(var i=0; i<ministryParts.length;i++){
                    switch(i){
                        case 0:
                            ministryPart1 = ministryParts[i];
                            console.log('ministry1: '+ministryPart1);
                            break;
                        case 1:
                            ministryPart2 = ministryParts[i];
                            break;
                        case 2:
                            ministryPart3 = ministryParts[i];
                            break;
                    }
                }
                this.setState({
                  isLoading: false,
                  meetingParts: {
                    openingPrayer: openning,
                    treasures:treasures,
                    gems: gems,
                    bibleReading: bibleReading,
                    ministryPart1: ministryPart1,
                    ministryPart2: ministryPart2,
                    ministryPart3: ministryPart3,
                    midSong: midSong,
                    livingPart1: livingPart1,
                    livingPart2:livingPart2,
                    livingPart3:livingPart3,
                    cbs: cbs,
                    closingComments: closingComments,
                    closingSong: closingSong
                  },
                  assignments: {
                    ClosingPrayer: assignmentResult.ClosingPrayer,
                    LivingPart2: assignmentResult.LivingPart2,
                    Chairman: assignmentResult.Chairman,
                    OpenningPrayer: assignmentResult.OpenningPrayer,
                    Treasures: assignmentResult.Treasures,
                    Gems: assignmentResult.Gems,
                    MinistryPart3: assignmentResult.MinistryPart3,
                    MinistryPart1: assignmentResult.MinistryPart1,
                    CBS: assignmentResult.CBS,
                    CBSReader:assignmentResult.CBSReader,
                    MinistryPart2: assignmentResult.MinistryPart2,
                    LivingPart3: assignmentResult.LivingPart3,
                    Reading: assignmentResult.Reading,
                    LivingPart1: assignmentResult.LivingPart1
                  }
                });
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                this.setState({
                  isLoading: true,
                  error
                });
              }
        );
        
    }
    render(){
        
        const { error, isLoading, meetingParts, assignments } = this.state;
        let d = new Date();
        var dyear = d.toLocaleString("default", { year: "numeric" });
        var dmonth = d.toLocaleString("default", { month: "2-digit" });
        var dday = d.toLocaleString("default", { day: "2-digit" });

        var weekStart = new Date();
        weekStart.setDate(d.getDate() - d.getDay()+1);
        var weekEnd =new Date();
        weekEnd.setDate(d.getDate()+6);

        //console.log("response: " + meetingParts.prayer);
        return(
            <div className='oclm-container'>
                <div>{isLoading ? 
                <Modal fullscreen={true} show={true} >
                    <Modal.Body>
                        LOADING...
                    </Modal.Body>
                </Modal> 
                : 
                <></>}
                </div>
                <div>Goto Date: <input id='gotoDate' type='date' defaultValue={dyear+'-'+dmonth+'-'+dday}></input><button className='btn btn-primary' >Go</button></div>
                <div className='schedule-header'><h2>Week of {weekStart.toLocaleDateString()} to {weekEnd.toLocaleDateString()}</h2></div>
                <div className='assignment-container'>
                    <div className='asssignment-left'> {meetingParts.openingPrayer}</div>
                    <div className='asssignment-right'>Panalangin: {assignments.OpenningPrayer}</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'></div>
                    <div className='asssignment-right'>Chairman: {assignments.Chairman}</div>
                </div>
                <div className='oclm-header-treasure'>
                    KAYAMANAN MULA SA SALITA NG DIYOS
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>{meetingParts.treasures}</div>
                    <div className='asssignment-right'>{assignments.Treasures}</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>{meetingParts.gems}</div>
                    <div className='asssignment-right'>{assignments.Gems}</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>{meetingParts.bibleReading}: </div>
                    <div className='asssignment-right'>{assignments.Reading}</div>
                </div>
                <div className='oclm-header-ministry'>
                    MAGING MAHUSAY SA MINISTERYO
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'> {meetingParts.ministryPart1}: </div>
                    <div className='asssignment-right'>{assignments.MinistryPart1}</div>
                    {/*<div className='asssignment-left'></div><div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>*/}
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>{meetingParts.ministryPart2}: </div>
                    <div className='asssignment-right'>{assignments.MinistryPart2}</div>
                    {/*<div className='asssignment-left'></div><div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>*/}
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'> {meetingParts.ministryPart3}: </div>
                    <div className='asssignment-right'>{assignments.MinistryPart3}</div>
                    {/*<div className='asssignment-left'></div><div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>*/}
                </div>
                <div className='oclm-header-christians'>
                    PAMUMUHAY BILANG KRISTYANO
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>{meetingParts.midSong}</div>
                    
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>{meetingParts.livingPart1}</div>
                    <div className='asssignment-right'>{assignments.LivingPart1}</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>{meetingParts.livingPart2}</div>
                    <div className='asssignment-right'>{assignments.LivingPart2}</div>
                </div>
                
                <div className='assignment-container'>
                    <div className='asssignment-left'>{meetingParts.cbs} (30)</div>
                    <div className='asssignment-right'>{assignments.CBS}</div>
                    <div className='asssignment-left'></div><div className='asssignment-right'><span className='studyNumber'>Tagabasa</span>{assignments.CBSReader}</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>{meetingParts.concludingComments} (3)</div>
                    <div className='asssignment-right'>{assignments.Chairman}</div>
                </div>
                <div className='assignment-container'>
                    <div className='asssignment-left'>{meetingParts.closingSong}</div>
                    <div className='asssignment-right'><span className='studyNumber'>Panalangin</span>{assignments.ClosingPrayer}</div>
                </div>
            </div>
        );
    }    
}


export default OclmSchedule;