import React from 'react';
import axios from 'axios';

class CustomerAdd extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            userName: '',
            birthday: '',
            gender: '',
            job: ''
        }
        this.handleFormSubmit = this.handleFormSubmit.bind(this)

        this.handleValueChange = this.handleValueChange.bind(this)

        this.addCustomer = this.addCustomer.bind(this)
    }

    handleFormSubmit(e) {
        e.preventDefault()
        this.addCustomer()
            .then((response) => {
                console.log(response.data);
            })
        this.setState({
            userName:'',
            birthday:'',
            gender:'',
            job:''
        })

        window.location.reload();
    }

    handleValueChange(e) {
        const nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }


    addCustomer() {
        console.log(this.state.userName);

        const url = '/api/customers';
        
        const data = {
            NAME: this.state.userName,
            birthday: this.state.birthday,
            gender: this.state.gender,
            job: this.state.job
        }

        return axios.post(url, data)
    }

    render() {

        return (

            <form onSubmit={this.handleFormSubmit}>

                <h1>고객 추가</h1>

                    이름: <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange} /><br />

                    생년월일: <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange} /><br />

                    성별: <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange} /><br />

                    직업: <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange} /><br />

                <button type="submit">추가하기</button>

            </form>

        )

    }


}

export default CustomerAdd;