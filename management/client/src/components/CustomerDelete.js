import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

function CustomerDelete(props) {

    const [open, setOpen] = useState(false);

    const handleFormSubmit = (e) => {
        //event를 인자로 받고 이벤트의 기본동작은 하지않고, this.addcustomer()이 수행된다.
        e.preventDefault()

        //addCustomer함수호출
        deleteCustomer()

        setOpen(false);
        //새로고침
        props.stateRefresh();
        //window.location.reload();
    }

    const handleClickOpen = () => {

        console.log(props.id);

        setOpen(true);
    }

    const handleClose = () => {
        
        setOpen(false);
    }
    // api들은 폴더로 관리
    const deleteCustomer = () => {
        const url = '/api/customers/';

        const data = {
             id : props.id
            }

        return axios.patch(url , data)

    }
    return (
        <div>
            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                삭제
                </Button>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle onClose={handleClose}>
                    삭제 경고
                    </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 고객 정보가 삭제됩니다.
                        </Typography>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={handleFormSubmit} >삭제</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default CustomerDelete;