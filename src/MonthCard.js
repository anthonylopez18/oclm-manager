import './Schedule.css';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import cheerio  from 'cheerio';
import $ from 'jquery';

import OclmWeeks from './OclmWeeks'
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

export default MonthCard;