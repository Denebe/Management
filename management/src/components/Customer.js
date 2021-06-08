import React from 'react';
import styled from 'styled-components';


const Tr = styled.tr`

    border-bottom: 1px solid #dddddd;
    &:hover {
        background-color: #f3f3f3;
    }
`;

const Td = styled.td`
    padding: 12px 15px;
`;


const Customer = (props) => {
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
        </Tr>

    )
}



export default Customer;