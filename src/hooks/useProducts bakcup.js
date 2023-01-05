import { useEffect, useState } from 'react';
import { SERVER } from '../global/constants'
import axios from 'axios'
import { useLocation } from "react-router-dom";



const useProducts = () => {
  var pathname = useLocation().pathname.split('/').slice(-1)[0];
  const category = pathname=='products'?'':pathname;
    console.log(useLocation().search.split('&').map(e=>e.split('=')[1]))

  const [productsFilteredByCategory, setProductsFilteredByCategory] = useState(null);
  const [productsSorted, setProductsSorted] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const [color, setColor] = useState(null);
  const [size, setSize] = useState(null);
  const [order, setOrder] = useState('newest');

  useEffect(() => {
      (async() => {
        try {
            setIsLoading(true)
            const res = await axios(SERVER + '/product/');
            
            var filteredByCategory;
            if(category) {
              filteredByCategory = res.data.filter(e=>e.categories.filter(ee=>ee==category).length!=0)
            } else {
              filteredByCategory = res.data;
            };

            setIsLoading(false)
            setProductsFilteredByCategory(filteredByCategory)
            setProductsSorted(filteredByCategory)
        } catch (error) {
            console.log('Cannot GET products: ' + error);
            setError(error)
            setIsLoading(false)
        }
    })()
  }, [category]);

  function handleFilter(event) {
    function sortProducts(products, criterion) {
        if (criterion=='desc') {products.sort((a, b) => b.price - a.price)}
        if (criterion=='asc') {products.sort((a, b) => a.price - b.price)}
        if (criterion=='newest') {products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))}
        return products
    }

    var sorted = productsSorted;

    if (!event.target.value) {
        switch(event.target.name) {
            case 'size':
                sorted = productsFilteredByCategory
                if (color) {sorted = productsFilteredByCategory.filter(e=>e.color.filter(ee=>ee==color).length!=0)}
                sorted = sortProducts(sorted, order);
                setSize(null)    
                break
            case 'color':
                sorted = productsFilteredByCategory
                if (size) {sorted = productsFilteredByCategory.filter(e=>e.size.filter(ee=>ee==size).length!=0)}
                sorted = sortProducts(sorted, order);
                setColor(null)
                break
        }
    } else {
        switch(event.target.name) {
            case 'size':
                sorted = productsFilteredByCategory.filter(e=>e.size.filter(ee=>ee==event.target.value).length!=0)
                if(color) {sorted = sorted.filter(e=>e.color.filter(ee=>ee==color).length!=0)}                
                sorted = sortProducts(sorted, order);
                setSize(event.target.value)
                break
            case 'color':
                sorted = productsFilteredByCategory.filter(e=>e.color.filter(ee=>ee==event.target.value).length!=0)
                if(size) {sorted = sorted.filter(e=>e.size.filter(ee=>ee==size).length!=0)}
                sorted = sortProducts(sorted, order);
                setColor(event.target.value)
                break
            case 'order':
                sorted = sortProducts(sorted, event.target.value);
                setOrder(event.target.value)
                break
        }
    }
    setProductsSorted(sorted);            
}

  return {category, productsFilteredByCategory, productsSorted, color, size, order, handleFilter, isLoading, error} 
};

export default useProducts;