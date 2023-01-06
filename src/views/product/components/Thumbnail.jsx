
const Thumbnail = (props) => {
    return(
        <div className='m-3 cursor-pointer' onClick={()=>props.setSelectedImgIndex(props.img)}>
            <img
                className="object-contain
                h-[80px] min-w-[80px] sm:h-[150px] sm:w-full
                border border-solid border-gray-400"
                src={new URL(`/src/assets/products/${props.id}_${props.img}_${props.color}.webp`,import.meta.url).href}
            />
        </div>
    )
}


export default Thumbnail