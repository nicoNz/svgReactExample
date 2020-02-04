import * as React from 'react'

const RulerY = ({
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
            y1={`${i/range}`} x1='-.1'
            y2={`${i/range}`} x2='0'
        />
        <text key={i} transform='scale(1 1)' strokeWidth='.002' y={`${i/range}`} x='-.1' fontFamily="Verdana" fontSize='.025'>{i+ from}</text>
        </>

    ))
    return res
}

export default React.memo(RulerY)
//export default RulerX
