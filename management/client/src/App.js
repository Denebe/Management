import React, { Component } from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';

const GloblaStyle = createGlobalStyle`
  body{
    width: 100%;
    margin: 0 auto;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 25px 0;
  font-size: 0.9em;
  font-family: sans-serif;
  min-width: 400px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
`;

const Thead = styled.thead`
  .tr{
    background-color: #009879;
    color: #ffffff;
    text-align: left;
  }

  .td{
    padding: 12px 15px;
  }
`;


class App extends Component {

  constructor(props) {

    super(props);

    //state초기화
    this.state = {
      customers: '',
      completed: 0
    }

    this.stateRefresh = this.stateRefresh.bind(this);

  }


  stateRefresh() {
    this.setState({
      customers: '',
      completed: 0
    });

    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  //컴포넌트가 마운트된 직후 호출된다.
  componentDidMount() {
    //callApi 호출
    this.callApi()
      .then(res => this.setState({ customers: res }))
      .catch(err => console.log(err));
  }

  //async가 있어야 await 사용가능
  callApi = async () => {
    //
    const response = await fetch('/api/customers');
    const body = await response.json();
    return body;
  }
  render() {
    return (
      <div>
        <GloblaStyle />
        <Table>
          <Thead>
            <tr className="tr">
              <td className="td">번호</td>
              <td className="td">이름</td>
              <td className="td">생년월일</td>
              <td className="td">성별</td>
              <td className="td">직업</td>
              <td className="td">설정</td>
            </tr>
          </Thead>
          <tbody>
            {this.state.customers ? this.state.customers.map(info => {
              return (
                <Customer
                  stateRefresh = {this.stateRefresh}
                  key={info.id}
                  id={info.id}
                  name={info.NAME}
                  birthday={info.birthday}
                  gender={info.gender}
                  job={info.job}
                />
              )
            }) : ''}
          </tbody>
        </Table>
        <CustomerAdd stateRefresh={this.stateRefresh} />
      </div>
    );
  }
}

export default App;