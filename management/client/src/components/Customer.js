import React from 'react';
import styled from 'styled-components';
import CustomerDelete from './CustomerDelete';
import CustomerUpdate from './CustomerUpdate';

const Tr = styled.tr`

    border-bottom: 1px solid #dddddd;
    &:hover {
        background-color: #f3f3f3;
    }
`;

const Td = styled.td`
    padding: 12px 15px;
`;

// table에 뿌려주기
function Customer(props) {

    return (

        <Tr>
            <Td>
                {props.id}
            </Td>
            <Td>
                {props.name}
            </Td>
            <Td>
                {props.birthday}
            </Td>
            <Td>
                {props.gender}
            </Td>
            <Td>
                {props.job}
            </Td>
            <Td>
                <CustomerDelete stateRefresh={props.stateRefresh} id={props.id} />
            </Td>
            
            <Td>
                <CustomerUpdate stateRefresh={props.stateRefresh} id={props.id} name={props.name} birthday={props.birthday} gender={props.gender} job={props.job} />
            </Td>
            
        </Tr>

    )

}



export default Customer;