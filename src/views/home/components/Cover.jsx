import React from 'react'
import CoverItem from './CoverItem'

import cover1 from '../../../assets/cover1.png'
import cover2 from '../../../assets/cover2.png'
import cover3 from '../../../assets/cover3.png'
import cover4 from '../../../assets/cover4.png'
import cover5 from '../../../assets/cover5.png'

const Cover = () => {
    return (
        <main className='w-full h-[calc(200vh_-_6rem)] md:h-[calc(100vh_-_6rem)] p-2
        relative overflow-hidden z-20'>
            {/*Flexbox
            <div className={`absolute h-full bg-contain`} style={{backgroundImage: img}}>a</div>*/}
            <div className='w-full h-full flex flex-col md:flex-row gap-2'>
                    <CoverItem 
                        bgColor={'bg-[#fae3d9]'}
                        text='Em ritmo de Copa'
                        imgSrc={cover1}
                        link={'products/?n=e&categories=football'}
                        imgMargin={'right-4'}
                        coverSize={'big'}
                    />
                <div className='w-full md:w-1/2 h-full grid grid-cols-2 grid-rows-2 gap-2'>
                    <CoverItem 
                        bgColor={'bg-[#bee2d6]'}
                        text='Camisetas'
                        imgSrc={cover2}
                        imgMargin={'right-4'}
                        link={'products/?n=e&categories=shirt'}
                        coverSize={'small'}
                    />
                    <CoverItem 
                        bgColor={'bg-[#d6d4f0]'}
                        text='Óculos'
                        imgMargin={'right-0'}
                        imgSrc={cover3}
                        link={'products/?n=e&categories=glasses'}
                        coverSize={'small'}
                    />
                    <CoverItem 
                        bgColor={'bg-[#fae3d9]'}
                        text='Calças'
                        imgMargin={'right-1'}
                        imgSrc={cover4}
                        link={'products/?n=e&categories=pants'}
                        coverSize={'small'}
                    />
                    <CoverItem 
                        bgColor={'bg-[#bee2d6]'}
                        text='Calçados'
                        imgSrc={cover5}
                        imgMargin={'right-1'}
                        link={'products/?n=e&categories=shoes'}
                        coverSize={'small'}
                    />
                </div>
            </div>
        </main>
        
        )
};

export default Cover;