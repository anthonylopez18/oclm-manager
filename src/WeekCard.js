import './Schedule.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import cheerio  from 'cheerio';
import $ from 'jquery';
import OclmSchedule from './OclmSchedule';

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



export default WeekCard;