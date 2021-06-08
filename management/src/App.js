import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import Customer from './components/Customer';

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

const Tbody = styled.tbody`
  .tr {
  border - bottom: 1px solid #dddddd;
}
`;

const customer = [
  {
    'id': 1,
    'name': '홍길동',
    'birthday': '971202',
    'gender': '남자',
    'job': '학생'
  },
  {
    'id': 2,
    'name': '나동번',
    'birthday': '920202',
    'gender': '남자',
    'job': '프로그래머'
  },
  {
    'id': 3,
    'name': '박동민',
    'birthday': '921002',
    'gender': '남자',
    'job': '쿠팡맨'
  }
]

const App = () => {

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
          </tr>
        </Thead>
        <Tbody>
          {
            customer.map(info => {
              return (
                <Customer
                  key={info.id}
                  id={info.id}
                  name={info.name}
                  birthday={info.birthday}
                  gender={info.gender}
                  job={info.job}
                />
              )
            })}
        </Tbody>
      </Table>
    </div>
  )
}

export default App;