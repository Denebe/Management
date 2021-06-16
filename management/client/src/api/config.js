import axios from "axios"

export const callApi = (setUser) => {

    axios.get('/api/customers')
        .then(response => {
            setUser({ customers: response.data })
            console.log(response)
        }, error => {
            console.log(error);
        })
}

export const delApi = (props) => {


    const url = '/api/customers/';

        const data = {
             id : props.id
            }

        return axios.patch(url , data)
}

export const upApi = (props, user, birthday, gender, job) => {

      //axios.post 구성 url, data
      const url = '/api/customers/'; 

      const data = {
          id: props.id,
          NAME: user,
          birthday: birthday,
          gender: gender,
          job: job
      }
      console.log(data);

      return axios.put(url, data)
}