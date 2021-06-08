import React from 'react';
import Customer from './components/Customer';

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

    </div>
  )
}

export default App;