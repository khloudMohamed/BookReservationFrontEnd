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
            <div>{Msg.msg}</div>
        </Snackbar>
    );
};

const Alert = (props: any) => {
    return (
        <Alert 
            elevation={6} 
            variant="filled" 
            {...props} 
        />
    );
};

export default CustomSnackBar;