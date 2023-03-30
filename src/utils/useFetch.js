import { useState, useEffect } from 'react';
import axios from 'axios';
import baseURL from '../config/config';
const useAxios = () => {

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
      await axios.post(`${baseURL}/notifyLogin.php`, {
      username: username,
      password: password,
      company: company
    }).then((response) => {

      console.log('response')
      console.log(response.data);
      if(response.data.status == 'OK') {
        setIsLoading(false)
        navigation.navigate('HomePage', {userid: response.data.res.userid })
      } else {
        setIsLoading(false);
        console.log(response.data)
      }
    });
    };

    fetchData();
  }, []);

  return { data, isLoading, error };
};

export default useAxios;



