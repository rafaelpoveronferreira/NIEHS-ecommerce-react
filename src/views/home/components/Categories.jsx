import React from 'react'
import category1 from '../../../assets/category1.jpeg'
import category2 from '../../../assets/category2.jpg'
import category3 from '../../../assets/category3.webp'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTiktok, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


const Categories = () => {
    const categories = [{category:'tiktok.com/@',id:1,img:category1, icon:faTiktok},
                        {category:'instagram.com/',id:2,img:category2, icon:faInstagram},
                        {category:'twitter.com/',id:3,img:category3, icon:faTwitter},]
    return (
            <div className='w-screen flex flex-col md:flex-row gap-16 md:gap-24 justify-center items-center py-6'>

                {categories.map((e) => {
                    return (
                        <a href={`https://www.${e.category}niehs`} target='_blank' key={e.id}>
                            <div className='relative'>
                                <div className='group absolute top-0 left-0 w-full h-full rounded-2xl hover:bg-[rgba(40,40,40,0.6)]'>
                                    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                                        opacity-0 group-hover:opacity-100 flex flex-col gap-3'>
                                        <FontAwesomeIcon icon={e.icon} size='4x' color='white'/>
                                        <span className='tracking-wider text-white text-xl'>@niehs</span>
                                    </div>
                                </div>
                                <div className='flex w-full h-full flex-col justify-center text-center'>
                                    <img src={e.img} className='rounded-2xl object-cover max-w-[400px] min-w-[250px] h-[400px]'/>
                                </div>
                            </div>
                        </a>
                    )
                })}
            </div>
        )
    }

export default Categories;