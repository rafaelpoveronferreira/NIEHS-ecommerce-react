import axios from 'axios';
import { useEffect, useState } from 'react';
import { SERVER } from '../global/constants'


const useProduct = (id) => {
  const [product, setProduct] = useState(null)
  const [isLoading, setLoading] = useState(false);
  const [imgRange, setImgRange] = useState(0)
  const [error, setError] = useState(null);

  useEffect(() => {
      (async() => {
      try {
          setLoading(true)
          const res = await axios.get(SERVER+'/product/find/'+id)
          if(res.data) {
            setProduct(res.data)
            setImgRange(res.data.img)
            setLoading(false)
          }
          
      } catch (err) {
          setError(err.message)
          setLoading(false)
          console.log("Failed to GET product "+id)
      }})()}
  , [id]);

  return {product, imgRange, isLoading, error} 
};

export default useProduct;