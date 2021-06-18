import axios from "axios"

//read
export const callApi = (setUser) => {

    axios.get('/api/customers')
        .then(response => {
            setUser({ customers: response.data })
            console.log(response)
        }, error => {
            console.log(error);
        })
}

//delete
export const delApi = (props) => {


    const url = '/api/customers/';

        const data = {
             id : props.id
            }

        return axios.patch(url , data)
}

//update
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

//add
export const addApi = (name, birthday, gender, job) => {
    const url = '/api/customers';

    const data = {
        NAME: name,
        birthday: birthday,
        gender: gender,
        job: job
    }

    return axios.post(url, data)
}