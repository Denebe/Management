import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';

function CustomerUpdate(props) {

    const [info, setInfo] = useState({
        userName: '',
        birthday: '',
        gender: '',
        job: ''
    });

    const [open, setOpen] = useState(false);
    //
    const handleFormSubmit = (id) => {

        //addCustomer함수호출
        updateCustomer(id)
            //then함수에 전달된 response
            .then((response) => {
                console.log(response.data);
                props.stateRefresh();
            })
        //state값 초기화
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


    const updateCustomer = (id) => {
        console.log(info.userName);

        //axios.post 구성 url, data
        const url = '/api/customers/' + id;

        const data = {
            NAME: info.userName,
            birthday: info.birthday,
            gender: info.gender,
            job: info.job
        }

        return axios.post(url, data)
    }

    const handleValueChange = e => {

        //state with multiple keys https://medium.com/@shlee1353/%EB%A6%AC%EC%95%A1%ED%8A%B8-hooks-usestate-4%EA%B0%80%EC%A7%80-%EC%83%81%EC%9A%A9%EB%B0%A9%EB%B2%95-dfe8b2096750
        setInfo({
            ...info,
            [e.target.name] : e.target.value
        });
           
    }

    const handleClickOpen = (id) => {

        console.log(id);
        const url = '/api/customers/' + id;
        axios.get(url)
            .then(function(response) {
                const userData = response.data;

                setInfo({
                    userName: response.data[0].NAME,
                    birthday: response.data[0].birthday,
                    gender: response.data[0].gender,
                    job: response.data[0].job
                })
                console.log("sucess");
                console.log(userData);
            })
            .catch(function(error) {
                console.log("fail");
            })

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
            <Button variant="contained" color="primary" onClick={(e) => handleClickOpen(props.id)}>
                고객 수정하기
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>고객 수정</DialogTitle>
                <DialogContent>
                    <TextField label="이름" type="text" name="userName" value={info.userName} onChange={handleValueChange} /><br />
                    <TextField label="생년월일" type="text" name="birthday" value={info.birthday} onChange={handleValueChange} /><br />
                    <TextField label="성별" type="text" name="gender" value={info.gender} onChange={handleValueChange} /><br />
                    <TextField label="직업" type="text" name="job" value={info.job} onChange={handleValueChange} /><br />
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(e) => handleFormSubmit(props.id)}>수정</Button>
                    <Button variant="contained" color="primary" onClick={handleClose}>닫기</Button>
                </DialogActions>
            </Dialog>

        </div>
    )

}

export default CustomerUpdate;