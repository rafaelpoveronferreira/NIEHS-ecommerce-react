import { useState } from "react"
import { useEffect } from "react"
import { useRef } from "react"

const StepTracker = ({count, totalSteps}) => {
    const [barWidth, setBarWidth] = useState(Math.floor(count*100/totalSteps.length))
    
    useEffect(()=>{
        setBarWidth(Math.floor(count*100/totalSteps.length))
    },[count])

    return (
        <div className="relative h-1/5 w-full my-6 duration-400 ease-in">
            <MaskBar />
            <Bar barWidth={barWidth}/>
            <div className="absolute top-1/2 translate-y-[-38%] w-full flex justify-around">
                {totalSteps.map(e=>
                    <Circle key={e} step={e} enabled={e<=count}/>
                )}
            </div>
        </div>
    )
}

const MaskBar = () => {
    return(
        <div className={`absolute top-1/2 w-full h-2 bg-gray-400`}></div>
    )
}


const Bar = ({barWidth}) => {
    var stepBar = useRef(null)
    
    useEffect(()=>{
        stepBar.current.style.width=barWidth+'%'
    }, [barWidth])

    return(
        <div ref={stepBar} className='absolute top-1/2 h-2 bg-black duration-400 ease-in'></div>
    )
}

const Circle = ({step, enabled}) => {
    return(
        <div
            className={`rounded-full text-white ml-auto text-center w-10 h-10 leading-[2.7rem]
            ${enabled?'bg-black':'bg-gray-400'}`}>
            {step}
        </div>
    )
}

export default StepTracker;