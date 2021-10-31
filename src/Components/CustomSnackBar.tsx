import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { Msg } from "../Models/MessageModel";

type Props = {
    Msg:Msg
  };

const CustomSnackBar = ({Msg}:Props) => {
    return (
         <Snackbar
          open={Msg?.show}
          autoHideDuration={3000}
          >
          <Alert 
            severity = {Msg.type}
            sx={{ width: '100%' }}>
             {Msg.msg}   
          </Alert>
        </Snackbar>
    );
};


export default CustomSnackBar;