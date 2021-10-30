import { useState, useEffect} from 'react';
import {refreshList} from './Services/HttpService';
import "bootstrap/dist/css/bootstrap.min.css";
import { Resource } from './Models/Resources';

import BookingComponent from './Components/BookingComponent';
export default function Home (){

    const [Library,setLibrary] = useState<Resource[]>([]);    
    const [open, setIsOpen] = useState(false);
    const [selectedResouce, setSelectedResource] = useState<Resource>();

    
    useEffect(()=>{async function fetchMyAPI(){ let result = await refreshList();
        setLibrary(result);
    }
    fetchMyAPI();
    },[]);

    function BookClick (id:number) {
        const resource = Library.filter((x)=>x.Id == id)[0];
        setSelectedResource(resource);
        setIsOpen(true);
        console.log(open);
    }

    return(
        <div>
            <h3>This is Library</h3>
            <table className="table table-striped">
                <thead>
                <tr>
                    <th>
                        BookId
                    </th>
                    <th>
                        BookName                
                    </th>
                    <th>
                        Quantity
                    </th>
                </tr>
                </thead>
                    <tbody>
                    {Library.map(Book=>
                    <tr key={Book.Id}>
                        <td>{Book.Id}</td>
                        <td>{Book.Name}</td>
                        <td>{Book.Quantity}</td>
                        <td>
                        <button type="button"
                        className="btn btn-light mr-1"
                        onClick={()=>BookClick(Book.Id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                            </svg>
                        </button>
                        </td>
                    </tr>
                    )}
                </tbody>
            </table>
            {open && <BookingComponent ResourceDetails ={selectedResouce as Resource} OnClose={()=>{setIsOpen(false)}}/>}
        </div>
    )
}