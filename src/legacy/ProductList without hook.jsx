import React from "react";
import { useLocation } from "react-router-dom";
import Products from "../components/Products";
import ProductsFilter from "../components/ProductsFilter";
import axios from 'axios'
import SERVER from '../global'
import { useEffect, useState } from "react";
import useResetScroll from '../hooks/useResetScroll'

const ProductList = (props) => {
    var pathname = useLocation().pathname.split('/').slice(-1)[0];

    useResetScroll();

    const category = pathname=='products'?'':pathname;
    const [color, setColor] = useState(null);
    const [size, setSize] = useState(null);
    const [order, setOrder] = useState('newest');
    const [productsFilteredByCategory, setProductsFilteredByCategory] = useState(null);
    const [productsSorted, setProductsSorted] = useState([]);
    console.log(category)

    useEffect(() => {
        // Caso o state com produtos seja null, faz request GET ao backend para obter produtos do banco de dados Mongo
        // state com produtos será null apenas na primeira renderização
        if (!productsFilteredByCategory) {
            (async() => {
                try {
                    const res = await axios(SERVER + 'product/')
                    const filteredByCategory = res.data.filter(e=>e.categories.filter(ee=>ee==category).length!=0);
                    setProductsFilteredByCategory(
                        category?filteredByCategory:res.data,   
                    )
                    setProductsSorted(
                        category?filteredByCategory:res.data
                    )
                } catch (error) {
                    console.log('Cannot GET products: ' + error);
                }
            })()}
    })

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
    
    return (
        <div id="ProductListWrapper" className="pt-20">
            <ProductsFilter handleFilter={handleFilter} />
            <Products products={productsSorted} filteredColor={color} filteredSize={size} />
        </div>
    )
}



export default ProductList;