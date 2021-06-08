import React from 'react';

const CustomerProfile = (props) => {
    return(
        <div>
            <h2>{props.name}({props.id})</h2>
        </div>
    )
}

const CustomerInfo = (props) => {
    return(
        <div>
            <p>{props.birthday}</p>
            <p>{props.gender}</p>
            <p>{props.job}</p>
        </div>
    )
}

const Customer = (props) => {
    return(
        <div>
            <CustomerProfile id={props.id} name={props.name} />
            <CustomerInfo birthday={props.birthday} gender={props.gender} job={props.job} />
        </div>
    )
}



export default Customer;