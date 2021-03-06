import React, {useState} from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { addApi } from '../api/Api';


const styles = theme => ({
    hidden: {
        display: 'none'
    }
});



function CustomerAdd(props) {

        const [info, setInfo] = useState({
            userName: '',
            birthday: '',
            gender: '',
            job: ''
        });

        const [open, setOpen] = useState(false);

    //
    const handleFormSubmit = (e) => {
        //event를 인자로 받고 이벤트의 기본동작은 하지않고, this.addcustomer()이 수행된다.
        e.preventDefault()

        //addApi에 info값 전달
        addApi(info.userName, info.birthday, info.gender, info.job)

        setInfo({
            userName: '',
            birthday: '',
            gender: '',
            job: ''
        })

        setOpen(false);
        //새로고침
        props.stateRefresh();
        //window.location.reload();
    }

    //textfield에 값들을 info값들에 맞게 저장?
    const handleValueChange = e => {

        //state with multiple keys https://medium.com/@shlee1353/%EB%A6%AC%EC%95%A1%ED%8A%B8-hooks-usestate-4%EA%B0%80%EC%A7%80-%EC%83%81%EC%9A%A9%EB%B0%A9%EB%B2%95-dfe8b2096750
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        });
           
    }

    //dialog오픈
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setInfo({
            userName: '',
            birthday: '',
            gender: '',
            job: ''
        })
        setOpen(false);
    }

    
        return (

            <div>
                <Button variant="contained" color="primary" onClick={handleClickOpen}>
                    고객 추가하기
                </Button>

                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="이름" type="text" name="userName" value={info.userName} onChange={handleValueChange} /><br />
                        <TextField label="생년월일" type="text" name="birthday" value={info.birthday} onChange={handleValueChange} /><br />
                        <TextField label="성별" type="text" name="gender" value={info.gender} onChange={handleValueChange} /><br />
                        <TextField label="직업" type="text" name="job" value={info.job} onChange={handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={handleFormSubmit}>추가</Button>
                        <Button variant="contained" color="primary" onClick={handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>

            </div>

        )

}

export default withStyles(styles)(CustomerAdd);