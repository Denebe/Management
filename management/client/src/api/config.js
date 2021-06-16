import axios from "axios"

export const callApi = () => {
    axios.get('/api/customers')
        .then(response => {
            setUser({ customers: response.data })
            console.log(response)
        }, error => {
            console.log(error);
        })
}

export const delApi = () => {
    const url = '/api/customers/';

        const data = {
             id : props.id
            }
        window.location.reload();

        return axios.patch(url , data)
}

export const upApi = () => {
      //axios.post 구성 url, data
      const url = '/api/customers/';

      const data = {
          id: props.id,
          NAME: info.userName,
          birthday: info.birthday,
          gender: info.gender,
          job: info.job
      }
      console.log(data);
      window.location.reload();

      return axios.put(url, data)
}