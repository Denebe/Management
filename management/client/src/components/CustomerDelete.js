import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Typography from '@material-ui/core/Typography';

function CustomerDelete(props) {

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {

        setOpen(true);
    }

    const handleClose = () => {
        
        setOpen(false);
    }
    // api들은 폴더로 관리
    const deleteCustomer = (id) => {
        const url = '/api/customers/' + id;
        fetch(url, {
            method: 'DELETE'
        });
        props.stateRefresh();
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
                    <Button variant="contained" color="primary" onClick={(e) => { deleteCustomer(props.id) }}>삭제</Button>
                    <Button variant="outlined" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default CustomerDelete;