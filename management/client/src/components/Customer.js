import React from 'react';
import styled from 'styled-components';
import CustomerDelete from './CustomerDelete';


const Tr = styled.tr`

    border-bottom: 1px solid #dddddd;
    &:hover {
        background-color: #f3f3f3;
    }
`;

const Td = styled.td`
    padding: 12px 15px;
`;


class Customer extends React.Component {

    render() {

        return (

            <Tr>
                <Td>
                    {this.props.id}
                </Td>
                <Td>
                    {this.props.name}
                </Td>
                <Td>
                    {this.props.birthday}
                </Td>
                <Td>
                    {this.props.gender}
                </Td>
                <Td>
                    {this.props.job}
                </Td>
                <Td>
                    <CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id} />
                </Td>
            </Tr>

        )
    }
}



export default Customer;