import * as React from 'react'

const RulerX = ({
    from,
    to
})=>{
    const range = to - from 
    const a = new Array(range)
    a.fill(0)
    const res = a.map((o, i)=>(
        <>
        <line 
            key={i}
            strokeWidth='.002'
            stroke='black'
            x1={`${i/range}`} y1='-.1'
            x2={`${i/range}`} y2='0'
        />
        
        <text  key={i} strokeWidth='.002' x={`${i/range}`} y='-.1' fontFamily="Verdana" fontSize='.025'>{i+ from}</text>
        </>

    ))
    return res
}

export default React.memo(RulerX)
//export default RulerX
