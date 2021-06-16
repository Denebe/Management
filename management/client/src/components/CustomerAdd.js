import React from 'react';
import axios from 'axios';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    hidden: {
        display: 'none'
    }
});



class CustomerAdd extends React.Component {

    //state값을 초기화하거나 메서드를 바인딩할때 사용한다.
    constructor(props) {
        super(props);

        //state 초기값 설정
        this.state = {
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            open: false
        }

        //콜백에서 this가 작동하려면 아래와 같이 바인딩(this를 고정시킬때 사용하는 방법)을 해줘야한다.
        this.handleFormSubmit = this.handleFormSubmit.bind(this)

        this.handleValueChange = this.handleValueChange.bind(this)

        this.addCustomer = this.addCustomer.bind(this)

        this.handleClickOpen = this.handleClickOpen.bind(this)

        this.handleClose = this.handleClose.bind(this);
    }

    //
    handleFormSubmit(e) {
        //event를 인자로 받고 이벤트의 기본동작은 하지않고, this.addcustomer()이 수행된다.
        e.preventDefault()

        //addCustomer함수호출
        this.addCustomer()
            //then함수에 전달된 response
            .then((response) => {
                console.log(response.data);
                this.props.stateRefresh();
            })
        //state값 초기화
        this.setState({
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            open: false
        })
        //새로고침
        this.props.stateRefresh();
        //window.location.reload();
    }

    //
    handleValueChange(e) {
        const nextState = {};

        //e.target.name은 해당 input의 name을 가리킨다.
        nextState[e.target.name] = e.target.value;

        //state값 지정
        this.setState(nextState);
    }


    addCustomer() {
        console.log(this.state.userName);

        //axios.post 구성 url, data
        const url = '/api/customers';

        const data = {
            NAME: this.state.userName,
            birthday: this.state.birthday,
            gender: this.state.gender,
            job: this.state.job
        }

        return axios.post(url, data)
    }

    handleClickOpen() {
        this.setState({
            open: true
        });
    }

    handleClose() {
        this.setState({
            userName: '',
            birthday: '',
            gender: '',
            job: '',
            open: false
        })
    }

    //클래스 컴포넌트에서 반드시 구현돼야하는 메서드
    render() {
        const { classes } = this.props;
        
        return (

            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>

                <Dialog open={this.state.open} onClose={this.handleClose}>
                    <DialogTitle>고객 추가</DialogTitle>
                    <DialogContent>
                        <TextField label="이름" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleFormSubmit}>추가</Button>
                        <Button variant="contained" color="primary" onClick={this.handleClose}>닫기</Button>
                    </DialogActions>
                </Dialog>

            </div>

        )

    }


}

export default withStyles(styles)(CustomerAdd);