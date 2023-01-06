const Loading = () => {
    return(
        <div className="flex justify-center text-center w-full h-[70vh]">
            <img className='object-contain max-h-8 max-w-8 m-auto' src={new URL('/src/assets/loading.gif',import.meta.url).href} />
        </div>
    )
}

export default Loading