import { useEffect, useState } from 'react';
import { SERVER } from '../global/constants'
import axios from 'axios'


const useFeatured = () => {
  const [featuredProducts, setFeaturedProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)


  useEffect(() => {
    (async() => {
        try {
            setIsLoading(true)
            const res = await axios(SERVER+'/product/')
            const featuredProducts = res.data.filter(e=>e.featured==true);
            setFeaturedProducts(featuredProducts)

            setIsLoading(false)
        } catch (error) {
            console.log('Cannot GET products: ' + error);
            setError(error)
        }
    })()
  }, [true]);

  return {featuredProducts, isLoading, error} 
};

export default useFeatured;