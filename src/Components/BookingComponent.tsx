import { useState, useEffect, ChangeEvent} from 'react';
import { variables } from '../variables';
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {Booking, BookingProp} from '../Models/Booking';
import {Msg} from '../Models/MessageModel';
import CustomSnackBar from './CustomSnackBar';
// import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { bookSelectedRecource } from '../Services/HttpService';

export default function BookingComponent (props:BookingProp){

    const [DateFrom, setDateFrom] = useState<string>("");
    const [DateTo, setDateTo] = useState<string>("");
    const [TimeFrom, setTimeFrom] = useState<string>("");
    const [TimeTo, setTimeTo] = useState<string>("");
    const [Quantity, setQuantity] = useState<string>("");
    const [Message, setMessage] = useState<Msg>({show:false,msg:"",type:'info'});

    // const [BookingDetails,setBookingDetails] = useState<Booking>([]);    

    function ChangeQuantity(quantity: ChangeEvent<HTMLInputElement>)
    {setQuantity(quantity.target.value);}
    function ChangeDateFrom(value:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {setDateFrom(value.target.value.toString());}
    function ChangeDateTo (value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {setDateTo(value.target.value.toString());}
    function ChangeTimeFrom(value:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {setTimeFrom(value.target.value.toString());}
    function ChangeTimeTo (value: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)
    {setTimeTo(value.target.value.toString());}
   
    function AddNewBooking()
    {
        const BookingDetails:Booking = {
            ResourceId:props.ResourceDetails.Id,
            DateFrom:DateFrom,
            DateTo:DateTo,
            TimeFrom:TimeFrom,
            TimeTo:TimeTo,
            Name:props.ResourceDetails.Name,
            Quantity:Quantity
        };
        const successCallBack = ()=> {
            setMessage({
            show: true, 
            type: 'success',
            msg: 'successful Booking'
       })};
        const failedCallBack = ()=> {
            setMessage({
            show: true, 
            type: 'error',
            msg: 'Oops,Error'
        })};
        bookSelectedRecource(BookingDetails,successCallBack,failedCallBack);
    }
    return(
        <Modal show={true} onHide={props.OnClose}>
            <Modal.Header closeButton><Modal.Title>{"Booking " + props.ResourceDetails.Name}</Modal.Title></Modal.Header>
            <Modal.Body>
            <Container>
            <Row>
                <Col xs={6} md={4}>
                Date From
                </Col>
                <Col>
                    <Row>
                        <Col>
                            <Form.Control type="Date" placeholder="DateFrom" value={DateFrom} onChange={(date) => ChangeDateFrom(date)} />
                        </Col>
                        <Col>
                            <Form.Control type="Time" placeholder="TimeFrom" value={TimeFrom} onChange={(Time) => ChangeTimeFrom(Time)} />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={4}>
                Data To
                </Col>
                <Col>
                    <Row>
                    <Col >
                        <Form.Control type="Date" placeholder="DateTo" value= {DateTo} onChange ={(date) => ChangeDateTo(date)} />
                    </Col>
                    <Col >
                        <Form.Control type="Time" placeholder="TimeTo" value= {TimeTo} onChange ={(Time) => ChangeTimeTo(Time)} />
                    </Col>
                    </Row>
                </Col>
            </Row>
            <Row>
                <Col xs={6} md={4}>
                Quantity
                </Col>
                <Col xs={6} md={4}>
                <input type="number" placeholder="Quantity" value= {Quantity} onChange = {(quantity) => ChangeQuantity(quantity)}/>
                </Col>
            </Row>
            </Container>
            </Modal.Body>
            <Modal.Footer>
                <button onClick={AddNewBooking}>Book</button>
            </Modal.Footer>
            <CustomSnackBar Msg={Message}></CustomSnackBar>
        </Modal>
    );
}