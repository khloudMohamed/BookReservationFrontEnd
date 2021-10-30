import { Booking} from '../Models/Booking';
import { Resource } from '../Models/Resources';
import {variables} from '../variables';

export function refreshList():Promise<Resource[]> {
    return fetch(variables.Get_API_URL)
    .then((response) => response.json())
    .then((responseData) => responseData);

}
export function bookSelectedRecource(NewBooking:Booking,successCallBack:()=>void,FailedCallBack:()=>void) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({"id": 0,
                              "dateFrom": CreateDate(NewBooking.DateFrom , NewBooking.TimeFrom),
                              "dateTo": CreateDate(NewBooking.DateTo, NewBooking.TimeTo),
                              "bookingQuantity": +NewBooking.Quantity,
                              "resourceId": +NewBooking.ResourceId
        })
    };
    fetch(variables.Post_API_URL, requestOptions)
        .then(async response => {
            const isJson = response.headers.get('content-type')?.includes('application/json');
            const data = isJson && await response.json();
            if (!response.ok) {
                const error = (data && data.message) || response.status;
                FailedCallBack();
            }
            if(!data) FailedCallBack();
            else successCallBack();
        })
        .catch(error => {
            FailedCallBack();
        }
    );
}
function CreateDate(date:string,time:string)
{
    const tempDate = new Date(date);
    const hour = time.split(':')[0];
    const min = time.split(':')[1];
    tempDate.setHours(+hour);
    tempDate.setMinutes(+min);
    return tempDate;
}