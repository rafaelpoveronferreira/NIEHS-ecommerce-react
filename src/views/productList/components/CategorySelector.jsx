import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { CATEGORIES } from '../../../global/constants';
import { useSearchParams } from 'react-router-dom';

const CategorySelector = ({setCategories}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const catArr = searchParams.get('categories')?.split('_')

    function handleChange(e) {
        var catObj = new Object()

        for (const [key, value] in searchParams.entries()) {
            catObj[key] = value
        }

        if(e.target.checked) {
            let updatedCatArr = catArr?[...catArr, e.target.name]:[e.target.name]
            const strUpdatedCatArr = updatedCatArr.toString().replaceAll(',','_')

            setSearchParams({...catObj, categories: strUpdatedCatArr})
            setCategories(updatedCatArr)
        } else {
            catArr.splice(catArr.indexOf(e.target.name),1)
            console.log(catArr)
            if(catArr.length==0) {
                setSearchParams({...catObj})
                setCategories(null)
                return
            }

            const strUpdatedCatArr = catArr.toString().replaceAll(',','_')
            const newParams = {categories: strUpdatedCatArr}

            console.log(strUpdatedCatArr, newParams)
            setSearchParams({...catObj, ...newParams})
            setCategories(catArr)
        }
    }
    return(
        <div className='w-full h-full flex flex-col gap-2'>
            <div className='flex gap-4 text-2xl px-6 py-2 items-center'>
                <FontAwesomeIcon icon={faFilter} size='xl'/>
                <h3 className='font-mono'>FILTROS</h3>
            </div>
            {CATEGORIES.map((e,i)=>
                    <div className='flex pl-4 gap-2 text-xl h-6 py-5' key={i}>
                        <input className='w-6 h-6' type="checkbox" name={e} onChange={handleChange} defaultChecked={catArr?catArr.some(ee=>ee==e):false}/>
                        <span className='font-mono font-thin'>{e.toUpperCase()}</span>
                    </div>)}
        </div>
    )
    }

export default CategorySelector;