
//import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Navigation from './Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './UpdateSchedule.css';
//import { useState } from 'react';
import { extend, param } from 'jquery';
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react';


function withParams(Component) {
  return props => <Component {...props} params={useParams()} />;
}

function UpdateSchedule(props){
    const [state, setState] = useState({
            error:null,
            isLoading : false,
            meetingParts : {
                openingPrayer:'test'
            },
            assignments:{
            }
        });
    const [meetingParts, setMeetingParts] = useState({
        openingPrayer: '',
        treasures:'',
        gems: '',
        bibleReading: '',
        ministryPart1: '',
        ministryPart2: '',
        ministryPart3: '',
        midSong: '',
        livingPart1: '',
        livingPart2:'',
        livingPart3:'',
        cbs: '',
        closingComments: '',
        closingSong: ''
    });
    const[assignments, setAssignments] = useState({
        ClosingPrayer: '',
        LivingPart2: '',
        Chairman: '',
        OpenningPrayer: '',
        Treasures: '',
        Gems: '',
        MinistryPart3: '',
        MinistryPart1: '',
        CBS: '',
        CBSReader:'',
        MinistryPart2: '',
        LivingPart3: '',
        Reading: '',
        LivingPart1: ''
    });

    const handleChange=(event)=> {
        const {name, value} = event.target;
        // this.assignments.setState((prevData)=>({
        //     ...prevData,
        //     [name] : value
        // }));
        var assignObj = { ... assignments};
        setAssignments((prevData)=>({   ...assignObj,         
            [name] : value
        }));
    }
    
    const handleSubmit=(event) => {        

        const date = new Date(props.params.year, props.params.month, props.params.dd);
        console.log('date: ' + date.getDate() + '/ ' + date.getMonth());
        updateSchedule(date.getDate(), date.getMonth(), date.getFullYear());
        event.preventDefault();
    }
    const updateSchedule=(day, month, year)=>{
        var date = new Date();
        var beginningDate = new Date(date.getFullYear(), 0,1);
        var reqDate = new Date(year, month-1, day);
        
        var diffTime = Math.abs(reqDate - beginningDate);
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        console.log('diff: ' + diffDays);
        var weekNumber = Number.parseFloat((diffDays/7)+1).toFixed(0);
        
        var assignObj = assignments;
        //assignObj.push({weekNumber:weekNumber});
        //this.assignments.setState({weekNumber:weekNumber});

        console.log('assignment requestBody: ' + JSON.stringify(assignments));

        const url ="https://oclm-api.onrender.com/assignments"; 
        const options = {
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://master.d3ldsmi1fd1rti.amplifyapp.com/' 
            },
            method:'POST',
            body: JSON.stringify({
                ClosingPrayer: assignObj.ClosingPrayer,
                LivingPart2: assignObj.LivingPart2,
                Chairman: assignObj.Chairman,
                OpenningPrayer: assignObj.OpenningPrayer,
                Treasures: assignObj.Treasures,
                Gems: assignObj.Gems,
                MinistryPart3: assignObj.MinistryPart3,
                MinistryPart1: assignObj.MinistryPart1,
                CBS: assignObj.CBS,
                CBSReader:assignObj.CBSReader,
                MinistryPart2: assignObj.MinistryPart2,
                LivingPart3: assignObj.LivingPart3,
                Reading: assignObj.Reading,
                LivingPart1: assignObj.LivingPart1,
                weekNumber: weekNumber
            })
        };
        console.log(JSON.stringify({
            ClosingPrayer: assignObj.ClosingPrayer,
            LivingPart2: assignObj.LivingPart2,
            Chairman: assignObj.Chairman,
            OpenningPrayer: assignObj.OpenningPrayer,
            Treasures: assignObj.Treasures,
            Gems: assignObj.Gems,
            MinistryPart3: assignObj.MinistryPart3,
            MinistryPart1: assignObj.MinistryPart1,
            CBS: assignObj.CBS,
            CBSReader:assignObj.CBSReader,
            MinistryPart2: assignObj.MinistryPart2,
            LivingPart3: assignObj.LivingPart3,
            Reading: assignObj.Reading,
            LivingPart1: assignObj.LivingPart1,
            weekNumber: weekNumber
        }));
        setState({isLoading:true});
        fetch(url,options)
        .then(res => res.text())
        .then(
            // (result) => {
            //     console.log('UPDATE RESULT: '+result);
            //     var jsonResult = JSON.parse(result);
            //     var assignmentResult = jsonResult.assignments;
            //     var openning;
            //     var gems;
            //     var bibleReading;
            //     var treasures;
            //     var ministryParts = [];
            //     var ministryPart1;
            //     var ministryPart2;
            //     var ministryPart3;
            //     var livingParts = [];
            //     var midSong;
            //     var livingPart1;
            //     var livingPart2;
            //     var livingPart3;
            //     var cbs;
            //     var closingComments;
            //     var closingSong;
            //     var livingPart1;
            //     for(var i =0; i<jsonResult.response.length; i++){
            //         switch(jsonResult.response[i].sectionName){
            //             case 'openning':
            //                 console.log('openning: '+jsonResult.response[i].title);
            //                 openning=jsonResult.response[i].title;
            //                 break;
            //             case 'treasures':
            //                 if(jsonResult.response[i].title.includes('Espirituwal na Hiyas')){
            //                     gems = jsonResult.response[i].title;
            //                     break;
            //                 }
            //                 if(jsonResult.response[i].title.includes('Pagbabasa ng Bibliya')){
            //                     bibleReading = jsonResult.response[i].title;
            //                     break;
            //                 }
            //                 treasures = jsonResult.response[i].title;
            //                 break;
            //             case 'ministry':
            //                 ministryParts.push(jsonResult.response[i].title);
            //                 break;
            //             case 'living':
            //                 livingParts.push(jsonResult.response[i].title);
            //                 break;
            //             default:
            //                 break;
            //         }
                    
            //     }
            //     for(var i=0; i<livingParts.length;i++){
            //         switch(i){
            //             case 0:
            //                 midSong = livingParts[i];
            //                 break;
            //             case 1:
            //                 livingPart1 = livingParts[i]
            //                 break;
            //             case livingParts.length-3:
            //                 cbs = livingParts[i]
            //                 break;
            //             case livingParts.length-2:
            //                 closingComments = livingParts[i]
            //                 break;
            //             case livingParts.length-1:
            //                 closingSong = livingParts[i]
            //                 break;
            //         }
            //     }
            //     if(livingParts.length == 5)
            //         livingPart2 = livingParts[i];
            //     if(livingParts.length == 6)
            //         livingPart3 = livingParts[i];
            //     for(var i=0; i<ministryParts.length;i++){
            //         switch(i){
            //             case 0:
            //                 ministryPart1 = ministryParts[i];
            //                 console.log('ministry1: '+ministryPart1);
            //                 break;
            //             case 1:
            //                 ministryPart2 = ministryParts[i];
            //                 break;
            //             case 2:
            //                 ministryPart3 = ministryParts[i];
            //                 break;
            //         }
            //     }
            //     // this.setState({
            //     //   isLoading: false,
            //     //   meetingParts: {
            //     //     openingPrayer: openning,
            //     //     treasures:treasures,
            //     //     gems: gems,
            //     //     bibleReading: bibleReading,
            //     //     ministryPart1: ministryPart1,
            //     //     ministryPart2: ministryPart2,
            //     //     ministryPart3: ministryPart3,
            //     //     midSong: midSong,
            //     //     livingPart1: livingPart1,
            //     //     livingPart2:livingPart2,
            //     //     livingPart3:livingPart3,
            //     //     cbs: cbs,
            //     //     closingComments: closingComments,
            //     //     closingSong: closingSong
            //     //   },
            //     //   assignments: {
            //     //     ClosingPrayer: assignmentResult.ClosingPrayer,
            //     //     LivingPart2: assignmentResult.LivingPart2,
            //     //     Chairman: assignmentResult.Chairman,
            //     //     OpenningPrayer: assignmentResult.OpenningPrayer,
            //     //     Treasures: assignmentResult.Treasures,
            //     //     Gems: assignmentResult.Gems,
            //     //     MinistryPart3: assignmentResult.MinistryPart3,
            //     //     MinistryPart1: assignmentResult.MinistryPart1,
            //     //     CBS: assignmentResult.CBS,
            //     //     CBSReader:assignmentResult.CBSReader,
            //     //     MinistryPart2: assignmentResult.MinistryPart2,
            //     //     LivingPart3: assignmentResult.LivingPart3,
            //     //     Reading: assignmentResult.Reading,
            //     //     LivingPart1: assignmentResult.LivingPart1
            //     //   }
            //     // });
            //     setMeetingParts({
            //         openingPrayer: openning,
            //         treasures:treasures,
            //         gems: gems,
            //         bibleReading: bibleReading,
            //         ministryPart1: ministryPart1,
            //         ministryPart2: ministryPart2,
            //         ministryPart3: ministryPart3,
            //         midSong: midSong,
            //         livingPart1: livingPart1,
            //         livingPart2:livingPart2,
            //         livingPart3:livingPart3,
            //         cbs: cbs,
            //         closingComments: closingComments,
            //         closingSong: closingSong
            //     });
            //     setAssignments({
            //         ClosingPrayer: assignmentResult.ClosingPrayer,
            //         LivingPart2: assignmentResult.LivingPart2,
            //         Chairman: assignmentResult.Chairman,
            //         OpenningPrayer: assignmentResult.OpenningPrayer,
            //         Treasures: assignmentResult.Treasures,
            //         Gems: assignmentResult.Gems,
            //         MinistryPart3: assignmentResult.MinistryPart3,
            //         MinistryPart1: assignmentResult.MinistryPart1,
            //         CBS: assignmentResult.CBS,
            //         CBSReader:assignmentResult.CBSReader,
            //         MinistryPart2: assignmentResult.MinistryPart2,
            //         LivingPart3: assignmentResult.LivingPart3,
            //         Reading: assignmentResult.Reading,
            //         LivingPart1: assignmentResult.LivingPart1
            //     });
            //   },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                setState({
                  isLoading: true,
                  error
                });
              }
        );
    }
    
    const getSchedule = (day, month, year)=>{
        console.log('request body: ' + JSON.stringify({
            language:'tagalog',
            month: month,
            day: day,
            year: year
        }));
        const url ="https://oclm-api.onrender.com"; 
        const options = {
            mode:'cors',
            headers:{
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'https://master.d3ldsmi1fd1rti.amplifyapp.com' 
            },
            method:'POST',
            body: JSON.stringify({
                language:'tagalog',
                month: month,
                day: day,
                year: year
            })
        };
        setState({isLoading:true});
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
                var livingPart1;
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
                setMeetingParts({
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
                  });
                setAssignments({
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
                  });
                // setState({
                //   isLoading: false,
                //   meetingParts: {
                //     openingPrayer: openning,
                //     treasures:treasures,
                //     gems: gems,
                //     bibleReading: bibleReading,
                //     ministryPart1: ministryPart1,
                //     ministryPart2: ministryPart2,
                //     ministryPart3: ministryPart3,
                //     midSong: midSong,
                //     livingPart1: livingPart1,
                //     livingPart2:livingPart2,
                //     livingPart3:livingPart3,
                //     cbs: cbs,
                //     closingComments: closingComments,
                //     closingSong: closingSong
                //   },
                //   assignments: {
                //     ClosingPrayer: assignmentResult.ClosingPrayer,
                //     LivingPart2: assignmentResult.LivingPart2,
                //     Chairman: assignmentResult.Chairman,
                //     OpenningPrayer: assignmentResult.OpenningPrayer,
                //     Treasures: assignmentResult.Treasures,
                //     Gems: assignmentResult.Gems,
                //     MinistryPart3: assignmentResult.MinistryPart3,
                //     MinistryPart1: assignmentResult.MinistryPart1,
                //     CBS: assignmentResult.CBS,
                //     CBSReader:assignmentResult.CBSReader,
                //     MinistryPart2: assignmentResult.MinistryPart2,
                //     LivingPart3: assignmentResult.LivingPart3,
                //     Reading: assignmentResult.Reading,
                //     LivingPart1: assignmentResult.LivingPart1
                //   }
                // });
              },
              // Note: it's important to handle errors here
              // instead of a catch() block so that we don't swallow
              // exceptions from actual bugs in components.
              (error) => {
                setState({
                  isLoading: true,
                  error
                });
              }
        );
    }
    useEffect(() => {        
        console.log('url params: ' + JSON.stringify(props.params));
        var thisDate = props.params;
        getSchedule(thisDate.dd, thisDate.month, thisDate.year);
        return ()=>{

        };
    },[]);

    return (
        <form id='updateForm'>
            <div className='assignment-container'>
                <div className='asssignment-left'> {meetingParts.openingPrayer}</div>
                <div className='asssignment-right'>Panalangin: <input name='OpenningPrayer' type='text' defaultValue= {assignments.OpenningPrayer} onChange={handleChange} /></div>
            </div>
            <div className='assignment-container'>
                <div className='asssignment-left'></div>
                <div className='asssignment-right'>Chairman: <input  name='Chairman' type='text' defaultValue= {assignments.Chairman} onChange={handleChange} /></div>
            </div>
            <div className='oclm-header-treasure'>
                KAYAMANAN MULA SA SALITA NG DIYOS
            </div>
            <div className='assignment-container'>
                <div className='asssignment-left'>{meetingParts.treasures}</div>
                <div className='asssignment-right'><input  name='Treasures' type='text'defaultValue= {assignments.Treasures} onChange={handleChange} /></div>
            </div>
            <div className='assignment-container'>
                <div className='asssignment-left'>{meetingParts.gems}</div>
                <div className='asssignment-right'><input  name='Gems' type='text'defaultValue= {assignments.Gems} onChange={handleChange} /></div>
            </div>
            <div className='assignment-container'>
                <div className='asssignment-left'>{meetingParts.bibleReading}</div>
                <div className='asssignment-right'><input  name='Reading' type='text'defaultValue={assignments.Reading} onChange={handleChange} /></div>
            </div>
            <div className='oclm-header-ministry'>
                MAGING MAHUSAY SA MINISTERYO
            </div>
            <div className='assignment-container'>
                <div className='asssignment-left'> {meetingParts.ministryPart1}: </div>
                <div className='asssignment-right'><input  name='MinistryPart1' type='text'defaultValue={assignments.MinistryPart1} onChange={handleChange} /></div>
                {/*<div className='asssignment-left'></div><div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>*/}
            </div>
            <div className='assignment-container'>
                <div className='asssignment-left'>{meetingParts.ministryPart2}: </div>
                <div className='asssignment-right'><input  name='MinistryPart2' type='text'defaultValue={assignments.MinistryPart2} onChange={handleChange} /></div>
                {/*<div className='asssignment-left'></div><div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>*/}
            </div>
            <div className='assignment-container'>
                <div className='asssignment-left'> {meetingParts.ministryPart3}: </div>
                <div className='asssignment-right'><input  name='MinistryPart3' type='text'defaultValue={assignments.MinistryPart3} onChange={handleChange} /></div>
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
                <div className='asssignment-right'><input  name='LivingPart1' type='text'defaultValue={assignments.LivingPart1} onChange={handleChange} /></div>
            </div>
            <div className='assignment-container'>
                <div className='asssignment-left'>{meetingParts.livingPart2}</div>
                <div className='asssignment-right'><input  name='LivingPart2' type='text'defaultValue={assignments.LivingPart2} onChange={handleChange} /></div>
            </div>
            
            <div className='assignment-container'>
                <div className='asssignment-left'>{meetingParts.cbs} (30)</div>
                <div className='asssignment-right'>{assignments.CBS}</div>
                <div className='asssignment-left'></div><div className='asssignment-right'><span className='studyNumber'>Tagabasa</span><input  name='CBSReader' type='text'defaultValue={assignments.CBSReader} onChange={handleChange} /></div>
            </div>
            <div className='assignment-container'>
                <div className='asssignment-left'>{meetingParts.concludingComments} (3)</div>
                <div className='asssignment-right'>{assignments.Chairman}</div>
            </div>
            <div className='assignment-container'>
                <div className='asssignment-left'>{meetingParts.closingSong}</div>
                <div className='asssignment-right'><span className='studyNumber'>Panalangin</span><input  name='ClosingPrayer' type='text'defaultValue={assignments.ClosingPrayer} onChange={handleChange} /></div>
            </div>
            <div className='col-12 p-4'>
                <button className='btn btn-primary btn-lg col-6' type='button'  onClick={handleSubmit} >UPDATE</button>    
            </div>
        </form>
    );

}

// class UpdateSchedule extends React.Component{
//     constructor(props){
//         super(props);
//         const weekAsDate = props.weekAsDate;
//         this.state = {
//             error:null,
//             isLoading : false,
//             meetingParts : {
//             },
//             assignments:{
//             }
//         };
//         this.handleChange = this.handleChange.bind(this);
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }
//     handleChange(event) {
//         const {name, value} = event.target;
//         // this.assignments.setState((prevData)=>({
//         //     ...prevData,
//         //     [name] : value
//         // }));
//         var assignObj = { ... this.state.assignments};
//         this.setState((prevData)=>({  assignments : { ...assignObj,         
//             [name] : value
//         }}));
//     }
    
//     handleSubmit(event) {        

//         const date = new Date(this.props.params.year, this.props.params.month, this.props.params.dd);
//         console.log('date: ' + date.getDate() + '/ ' + date.getMonth());
//         this.updateSchedule(date.getDate(), date.getMonth(), date.getFullYear());
//         event.preventDefault();
//     }
//     updateSchedule(day, month, year){
//         var date = new Date();
//         var beginningDate = new Date(date.getFullYear(), 0,1);
//         var reqDate = new Date(year, month-1, day);
        
//         var diffTime = Math.abs(reqDate - beginningDate);
//         var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
//         console.log('diff: ' + diffDays);
//         var weekNumber = Number.parseFloat((diffDays/7)+1).toFixed(0);
        
//         var assignObj = this.state.assignments;
//         //assignObj.push({weekNumber:weekNumber});
//         //this.assignments.setState({weekNumber:weekNumber});

//         console.log('assignment requestBody: ' + JSON.stringify(this.state.assignments));

//         const url ="https://oclm-api.onrender.com/assignments"; 
//         const options = {
//             mode:'cors',
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': 'https://master.d3ldsmi1fd1rti.amplifyapp.com/' 
//             },
//             method:'POST',
//             body: JSON.stringify({
//                 ClosingPrayer: assignObj.ClosingPrayer,
//                 LivingPart2: assignObj.LivingPart2,
//                 Chairman: assignObj.Chairman,
//                 OpenningPrayer: assignObj.OpenningPrayer,
//                 Treasures: assignObj.Treasures,
//                 Gems: assignObj.Gems,
//                 MinistryPart3: assignObj.MinistryPart3,
//                 MinistryPart1: assignObj.MinistryPart1,
//                 CBS: assignObj.CBS,
//                 CBSReader:assignObj.CBSReader,
//                 MinistryPart2: assignObj.MinistryPart2,
//                 LivingPart3: assignObj.LivingPart3,
//                 Reading: assignObj.Reading,
//                 LivingPart1: assignObj.LivingPart1,
//                 weekNumber: weekNumber
//             })
//         };
//         console.log(JSON.stringify({
//             ClosingPrayer: assignObj.ClosingPrayer,
//             LivingPart2: assignObj.LivingPart2,
//             Chairman: assignObj.Chairman,
//             OpenningPrayer: assignObj.OpenningPrayer,
//             Treasures: assignObj.Treasures,
//             Gems: assignObj.Gems,
//             MinistryPart3: assignObj.MinistryPart3,
//             MinistryPart1: assignObj.MinistryPart1,
//             CBS: assignObj.CBS,
//             CBSReader:assignObj.CBSReader,
//             MinistryPart2: assignObj.MinistryPart2,
//             LivingPart3: assignObj.LivingPart3,
//             Reading: assignObj.Reading,
//             LivingPart1: assignObj.LivingPart1,
//             weekNumber: weekNumber
//         }));
//         this.setState({isLoading:true});
//         fetch(url,options)
//         .then(res => res.text())
//         .then(
//             (result) => {
//                 console.log(result);
//                 var jsonResult = JSON.parse(result);
//                 var assignmentResult = jsonResult.assignments;
//                 var openning;
//                 var gems;
//                 var bibleReading;
//                 var treasures;
//                 var ministryParts = [];
//                 var ministryPart1;
//                 var ministryPart2;
//                 var ministryPart3;
//                 var livingParts = [];
//                 var midSong;
//                 var livingPart1;
//                 var livingPart2;
//                 var livingPart3;
//                 var cbs;
//                 var closingComments;
//                 var closingSong;
//                 var livingPart1;
//                 for(var i =0; i<jsonResult.response.length; i++){
//                     switch(jsonResult.response[i].sectionName){
//                         case 'openning':
//                             console.log('openning: '+jsonResult.response[i].title);
//                             openning=jsonResult.response[i].title;
//                             break;
//                         case 'treasures':
//                             if(jsonResult.response[i].title.includes('Espirituwal na Hiyas')){
//                                 gems = jsonResult.response[i].title;
//                                 break;
//                             }
//                             if(jsonResult.response[i].title.includes('Pagbabasa ng Bibliya')){
//                                 bibleReading = jsonResult.response[i].title;
//                                 break;
//                             }
//                             treasures = jsonResult.response[i].title;
//                             break;
//                         case 'ministry':
//                             ministryParts.push(jsonResult.response[i].title);
//                             break;
//                         case 'living':
//                             livingParts.push(jsonResult.response[i].title);
//                             break;
//                         default:
//                             break;
//                     }
                    
//                 }
//                 for(var i=0; i<livingParts.length;i++){
//                     switch(i){
//                         case 0:
//                             midSong = livingParts[i];
//                             break;
//                         case 1:
//                             livingPart1 = livingParts[i]
//                             break;
//                         case livingParts.length-3:
//                             cbs = livingParts[i]
//                             break;
//                         case livingParts.length-2:
//                             closingComments = livingParts[i]
//                             break;
//                         case livingParts.length-1:
//                             closingSong = livingParts[i]
//                             break;
//                     }
//                 }
//                 if(livingParts.length == 5)
//                     livingPart2 = livingParts[i];
//                 if(livingParts.length == 6)
//                     livingPart3 = livingParts[i];
//                 for(var i=0; i<ministryParts.length;i++){
//                     switch(i){
//                         case 0:
//                             ministryPart1 = ministryParts[i];
//                             console.log('ministry1: '+ministryPart1);
//                             break;
//                         case 1:
//                             ministryPart2 = ministryParts[i];
//                             break;
//                         case 2:
//                             ministryPart3 = ministryParts[i];
//                             break;
//                     }
//                 }
//                 this.setState({
//                   isLoading: false,
//                   meetingParts: {
//                     openingPrayer: openning,
//                     treasures:treasures,
//                     gems: gems,
//                     bibleReading: bibleReading,
//                     ministryPart1: ministryPart1,
//                     ministryPart2: ministryPart2,
//                     ministryPart3: ministryPart3,
//                     midSong: midSong,
//                     livingPart1: livingPart1,
//                     livingPart2:livingPart2,
//                     livingPart3:livingPart3,
//                     cbs: cbs,
//                     closingComments: closingComments,
//                     closingSong: closingSong
//                   },
//                   assignments: {
//                     ClosingPrayer: assignmentResult.ClosingPrayer,
//                     LivingPart2: assignmentResult.LivingPart2,
//                     Chairman: assignmentResult.Chairman,
//                     OpenningPrayer: assignmentResult.OpenningPrayer,
//                     Treasures: assignmentResult.Treasures,
//                     Gems: assignmentResult.Gems,
//                     MinistryPart3: assignmentResult.MinistryPart3,
//                     MinistryPart1: assignmentResult.MinistryPart1,
//                     CBS: assignmentResult.CBS,
//                     CBSReader:assignmentResult.CBSReader,
//                     MinistryPart2: assignmentResult.MinistryPart2,
//                     LivingPart3: assignmentResult.LivingPart3,
//                     Reading: assignmentResult.Reading,
//                     LivingPart1: assignmentResult.LivingPart1
//                   }
//                 });
//               },
//               // Note: it's important to handle errors here
//               // instead of a catch() block so that we don't swallow
//               // exceptions from actual bugs in components.
//               (error) => {
//                 this.setState({
//                   isLoading: true,
//                   error
//                 });
//               }
//         );
//     }
//     getSchedule(day, month, year){
//         console.log('request body: ' + JSON.stringify({
//             language:'tagalog',
//             month: month,
//             day: day,
//             year: year
//         }));
//         const url ="https://oclm-api.onrender.com"; 
//         const options = {
//             mode:'cors',
//             headers:{
//                 'Content-Type': 'application/json',
//                 'Access-Control-Allow-Origin': 'https://master.d3ldsmi1fd1rti.amplifyapp.com' 
//             },
//             method:'POST',
//             body: JSON.stringify({
//                 language:'tagalog',
//                 month: month,
//                 day: day,
//                 year: year
//             })
//         };
//         this.setState({isLoading:true});
//         fetch(url,options)
//         .then(res => res.text())
//         .then(
//             (result) => {
//                 console.log(result);
//                 var jsonResult = JSON.parse(result);
//                 var assignmentResult = jsonResult.assignments;
//                 var openning;
//                 var gems;
//                 var bibleReading;
//                 var treasures;
//                 var ministryParts = [];
//                 var ministryPart1;
//                 var ministryPart2;
//                 var ministryPart3;
//                 var livingParts = [];
//                 var midSong;
//                 var livingPart1;
//                 var livingPart2;
//                 var livingPart3;
//                 var cbs;
//                 var closingComments;
//                 var closingSong;
//                 var livingPart1;
//                 for(var i =0; i<jsonResult.response.length; i++){
//                     switch(jsonResult.response[i].sectionName){
//                         case 'openning':
//                             console.log('openning: '+jsonResult.response[i].title);
//                             openning=jsonResult.response[i].title;
//                             break;
//                         case 'treasures':
//                             if(jsonResult.response[i].title.includes('Espirituwal na Hiyas')){
//                                 gems = jsonResult.response[i].title;
//                                 break;
//                             }
//                             if(jsonResult.response[i].title.includes('Pagbabasa ng Bibliya')){
//                                 bibleReading = jsonResult.response[i].title;
//                                 break;
//                             }
//                             treasures = jsonResult.response[i].title;
//                             break;
//                         case 'ministry':
//                             ministryParts.push(jsonResult.response[i].title);
//                             break;
//                         case 'living':
//                             livingParts.push(jsonResult.response[i].title);
//                             break;
//                         default:
//                             break;
//                     }
                    
//                 }
//                 for(var i=0; i<livingParts.length;i++){
//                     switch(i){
//                         case 0:
//                             midSong = livingParts[i];
//                             break;
//                         case 1:
//                             livingPart1 = livingParts[i]
//                             break;
//                         case livingParts.length-3:
//                             cbs = livingParts[i]
//                             break;
//                         case livingParts.length-2:
//                             closingComments = livingParts[i]
//                             break;
//                         case livingParts.length-1:
//                             closingSong = livingParts[i]
//                             break;
//                     }
//                 }
//                 if(livingParts.length == 5)
//                     livingPart2 = livingParts[i];
//                 if(livingParts.length == 6)
//                     livingPart3 = livingParts[i];
//                 for(var i=0; i<ministryParts.length;i++){
//                     switch(i){
//                         case 0:
//                             ministryPart1 = ministryParts[i];
//                             console.log('ministry1: '+ministryPart1);
//                             break;
//                         case 1:
//                             ministryPart2 = ministryParts[i];
//                             break;
//                         case 2:
//                             ministryPart3 = ministryParts[i];
//                             break;
//                     }
//                 }
//                 this.setState({
//                   isLoading: false,
//                   meetingParts: {
//                     openingPrayer: openning,
//                     treasures:treasures,
//                     gems: gems,
//                     bibleReading: bibleReading,
//                     ministryPart1: ministryPart1,
//                     ministryPart2: ministryPart2,
//                     ministryPart3: ministryPart3,
//                     midSong: midSong,
//                     livingPart1: livingPart1,
//                     livingPart2:livingPart2,
//                     livingPart3:livingPart3,
//                     cbs: cbs,
//                     closingComments: closingComments,
//                     closingSong: closingSong
//                   },
//                   assignments: {
//                     ClosingPrayer: assignmentResult.ClosingPrayer,
//                     LivingPart2: assignmentResult.LivingPart2,
//                     Chairman: assignmentResult.Chairman,
//                     OpenningPrayer: assignmentResult.OpenningPrayer,
//                     Treasures: assignmentResult.Treasures,
//                     Gems: assignmentResult.Gems,
//                     MinistryPart3: assignmentResult.MinistryPart3,
//                     MinistryPart1: assignmentResult.MinistryPart1,
//                     CBS: assignmentResult.CBS,
//                     CBSReader:assignmentResult.CBSReader,
//                     MinistryPart2: assignmentResult.MinistryPart2,
//                     LivingPart3: assignmentResult.LivingPart3,
//                     Reading: assignmentResult.Reading,
//                     LivingPart1: assignmentResult.LivingPart1
//                   }
//                 });
//               },
//               // Note: it's important to handle errors here
//               // instead of a catch() block so that we don't swallow
//               // exceptions from actual bugs in components.
//               (error) => {
//                 this.setState({
//                   isLoading: true,
//                   error
//                 });
//               }
//         );
//     }
    
//     componentDidMount(){
        
//         console.log('url params: ' + JSON.stringify(this.props.params));
//         var thisDate = this.props.params;
//         this.getSchedule(thisDate.dd, thisDate.month, thisDate.year);
//     }
    
//     render(){
//         const { error, isLoading, meetingParts, assignments } = this.state;
        
        
//         return (
//             <form id='updateForm'>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'> {meetingParts.openingPrayer}</div>
//                     <div className='asssignment-right'>Panalangin: <input name='OpenningPrayer' type='text' defaultValue= {assignments.OpenningPrayer} onChange={this.handleChange} /></div>
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'></div>
//                     <div className='asssignment-right'>Chairman: <input  name='Chairman' type='text' defaultValue= {assignments.Chairman} onChange={this.handleChange} /></div>
//                 </div>
//                 <div className='oclm-header-treasure'>
//                     KAYAMANAN MULA SA SALITA NG DIYOS
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'>{meetingParts.treasures}</div>
//                     <div className='asssignment-right'><input  name='Treasures' type='text'defaultValue= {assignments.Treasures} onChange={this.handleChange} /></div>
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'>{meetingParts.gems}</div>
//                     <div className='asssignment-right'><input  name='Gems' type='text'defaultValue= {assignments.Gems} onChange={this.handleChange} /></div>
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'>{meetingParts.bibleReading}</div>
//                     <div className='asssignment-right'><input  name='Reading' type='text'defaultValue={assignments.Reading} onChange={this.handleChange} /></div>
//                 </div>
//                 <div className='oclm-header-ministry'>
//                     MAGING MAHUSAY SA MINISTERYO
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'> {meetingParts.ministryPart1}: </div>
//                     <div className='asssignment-right'><input  name='MinistryPart1' type='text'defaultValue={assignments.MinistryPart1} onChange={this.handleChange} /></div>
//                     {/*<div className='asssignment-left'></div><div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>*/}
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'>{meetingParts.ministryPart2}: </div>
//                     <div className='asssignment-right'><input  name='MinistryPart2' type='text'defaultValue={assignments.MinistryPart2} onChange={this.handleChange} /></div>
//                     {/*<div className='asssignment-left'></div><div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>*/}
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'> {meetingParts.ministryPart3}: </div>
//                     <div className='asssignment-right'><input  name='MinistryPart3' type='text'defaultValue={assignments.MinistryPart3} onChange={this.handleChange} /></div>
//                     {/*<div className='asssignment-left'></div><div className='asssignment-right'>Br. XXXXXXXXXXXXX</div>*/}
//                 </div>
//                 <div className='oclm-header-christians'>
//                     PAMUMUHAY BILANG KRISTYANO
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'>{meetingParts.midSong}</div>
                    
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'>{meetingParts.livingPart1}</div>
//                     <div className='asssignment-right'><input  name='LivingPart1' type='text'defaultValue={assignments.LivingPart1} onChange={this.handleChange} /></div>
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'>{meetingParts.livingPart2}</div>
//                     <div className='asssignment-right'><input  name='LivingPart2' type='text'defaultValue={assignments.LivingPart2} onChange={this.handleChange} /></div>
//                 </div>
                
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'>{meetingParts.cbs} (30)</div>
//                     <div className='asssignment-right'>{assignments.CBS}</div>
//                     <div className='asssignment-left'></div><div className='asssignment-right'><span className='studyNumber'>Tagabasa</span><input  name='CBSReader' type='text'defaultValue={assignments.CBSReader} onChange={this.handleChange} /></div>
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'>{meetingParts.concludingComments} (3)</div>
//                     <div className='asssignment-right'>{assignments.Chairman}</div>
//                 </div>
//                 <div className='assignment-container'>
//                     <div className='asssignment-left'>{meetingParts.closingSong}</div>
//                     <div className='asssignment-right'><span className='studyNumber'>Panalangin</span><input  name='ClosingPrayer' type='text'defaultValue={assignments.ClosingPrayer} onChange={this.handleChange} /></div>
//                 </div>
//                 <div class='col-12 p-4'>
//                     <button className='btn btn-primary btn-lg col-6' type='button'  onClick={this.handleSubmit} >UPDATE</button>    
//                 </div>
//             </form>
//         );
//     }
// }

export default withParams(UpdateSchedule);