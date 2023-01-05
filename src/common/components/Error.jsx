const Error = ({value}) => {
    const genericError = 'Something went wrong!'
    
    return(
        <div className="flex justify-center  text-center w-full h-[70vh]">
            <h3 className="text-center m-auto">{value?value:genericError}</h3>
        </div>
    )
}

export default Error