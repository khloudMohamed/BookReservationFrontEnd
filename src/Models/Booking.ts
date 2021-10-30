import { Resource } from "./Resources";

export interface Booking{
    ResourceId:number;
    Name:string;
    DateFrom:string;
    DateTo:string;
    TimeFrom:string;
    TimeTo:string;
    Quantity:string;
} 
export interface BookingProp{
    ResourceDetails:Resource;
    OnClose:()=>void;
} 