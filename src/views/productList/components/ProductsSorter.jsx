import React from 'react'
import { COLORSTOCSSCLASSES, SIZES } from '../../../global/constants';

const ProductsSorter = ({handleFilter}) => {
        return(
            <div className='w-full px-12 py-8 flex justify-between'>
                <div className='flex gap-4 items-center'>
                    <span className='text-xl font-semibold'>
                        Filter Products
                    </span>
                    <select onChange={handleFilter} name="color" className='p-3 rounded-md'>
                        <option defaultValue value=''>
                            all colors
                        </option>
                        {Object.keys(COLORSTOCSSCLASSES).map((e, i)=>
                        <option value={e} key={i}>
                            {e}
                        </option>)}

                    </select>

                    <select onChange={handleFilter} name="size" className='p-3 rounded-md'>
                        <option defaultValue value=''>
                            all sizes
                        </option>
                        {SIZES.map((e, i)=>
                        <option value={e} key={i}>
                            {e}
                        </option>)}
                    </select>
                </div>


                <div className='flex gap-4 items-center'>
                    <span className='text-xl font-semibold'>
                        Order Products
                    </span>
                    <select onChange={handleFilter} name="order" className='p-3 rounded-md'>
                        <option value="newest">
                            Newest
                        </option>
                        <option value="asc">
                            Price (asc)
                        </option>
                        <option value="desc">
                            Price (desc)
                        </option>
                    </select>
                
                </div>
            </div>
        )
    }

export default ProductsSorter;