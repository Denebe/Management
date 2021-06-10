import React from 'react';
import axios from 'axios';

class CustomerAdd extends React.Component {

    //state값을 초기화하거나 메서드를 바인딩할때 사용한다.
    constructor(props) {
        super(props);

        //state 초기값 설정
        this.state = {
            userName: '',
            birthday: '',
            gender: '',
            job: ''
        }

        //콜백에서 this가 작동하려면 아래와 같이 바인딩(this를 고정시킬때 사용하는 방법)을 해줘야한다.
        this.handleFormSubmit = this.handleFormSubmit.bind(this)

        this.handleValueChange = this.handleValueChange.bind(this)

        this.addCustomer = this.addCustomer.bind(this)
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
            })
        //state값 초기화
        this.setState({
            userName:'',
            birthday:'',
            gender:'',
            job:''
        })
        //새로고침
        window.location.reload();
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

    //클래스 컴포넌트에서 반드시 구현돼야하는 메서드
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