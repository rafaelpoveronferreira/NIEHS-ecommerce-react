import React from "react";
import Products from "../../common/components/Products";
import ProductsSorter from "./components/ProductsSorter";
import CategorySelector from "./components/CategorySelector";
import { useState } from "react";
import { useEffect } from "react";
import useResetScroll from '../../hooks/useResetScroll'
import useProducts from "../../hooks/useProducts";


const ProductList = (props) => {
    useResetScroll();

    const { setCategories, productsSorted, color, size, handleFilter, isLoading, error } = useProducts();

    return (
        <div className="my-24 h-max">
            <ProductsSorter handleFilter={handleFilter} />
            <div className="flex gap-2 h-max">
                <div className="w-1/5 h-full">
                    <CategorySelector setCategories={setCategories} />
                </div>
                <div className="w-4/5 h-full">
                    <Products
                        products={productsSorted} 
                        filteredColor={color} 
                        filteredSize={size} 
                        isLoading={isLoading}
                        error={error} />
                </div>
            </div>
            
        </div>
    )
}



export default ProductList;