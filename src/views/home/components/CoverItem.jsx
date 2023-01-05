import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faAnglesRight} from '@fortawesome/free-solid-svg-icons'

const CoverItem = ({text, imgSrc, imgMargin, link, coverSize, bgColor}) => {
    return (
        <div className={`relative w-full ${coverSize=='small'?'':'md:w-1/2 h-full'} ${bgColor}`}>
            {/*coverSize=='big' && <div className='SlideCircle duration-200 hidden md:block md:scale-125 xl:scale-150 top-[17%] left-[30%]' />*/}
            <span className={`absolute z-10 h-full ${coverSize=='small'?'text-4xl left-8 top-1/4':'text-5xl left-1/2 xs:left-6 -translate-x-1/2 xs:-translate-x-0 top-1/3'}  
                            font-comforter`}>{text}</span>
            <img className={`absolute h-full object-contain ${imgMargin}`} src={imgSrc} alt="richarlisson" />
            <Link to={link}>
                <div className={`absolute bottom-[20%] z-20 left-1/2 xs:left-[17%] -translate-x-1/2 xs:-translate-x-0 
                        ${coverSize=='small'?'text-md':'text-xl'} font-bold font-mono 
                        group/icon 
                        after-underline`}>
                    <span className='tracking-wider'>COMPRAR</span>
                    <FontAwesomeIcon className='group-hover/icon:translate-x-1/2 group-hover/icon:scale-105 duration-150' icon={faAnglesRight}/>                           
                </div>
            </Link>
        </div>
    )
}               

export default CoverItem
                    