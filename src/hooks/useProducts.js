import { useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { SERVER } from '../global/constants'
import axios from 'axios'



const useProducts = () => {
    const categorySearchParam = new URLSearchParams(document.location.search).get('categories')

    var queryArray = categorySearchParam?categorySearchParam.split('_'):null

    const [categories, setCategories] = useState(queryArray)

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

                var filteredByCategory = new Array();

                if(categories) {
                    filteredByCategory = res.data.filter(e=>e.categories.some(ee=>ee==categories[0]))
                    var arr2 = new Array()

                    if(categories.length>1){
                        for(let i = 1; i<=categories.length-1;i++) {
                            arr2 = res.data.filter(e=>e.categories.some(ee=>ee==categories[i]))
                            filteredByCategory = filteredByCategory.filter(e => arr2.includes(e))
                        }
                    }
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
  }, [categories]);

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

  return {categories,setCategories, productsFilteredByCategory, productsSorted, color, size, order, handleFilter, isLoading, error} 
};

export default useProducts;