import {complex, conj, add, multiply, subtract, im, re, sqrt} from 'mathjs'
import { Butterflyrender } from './Butterfly'

const Point8DIFFFTorDITIFFT = (x,num) => {
    const twiddle = [1,multiply(complex(1,-1),(1/sqrt(2))),complex(0,-1),multiply(complex(-1,-1),(1/sqrt(2)))]
    const twiddle_conjugate = [twiddle[0],conj(twiddle[1]),conj([twiddle[2]]),conj([twiddle[3]])]
    
    let w = []
    if(num)
        w = twiddle_conjugate
    else if(!num)
        w = twiddle
    else
        console.error("Invalid twiddle choice :",num,"(Twiddle choice should be either true or false. True => Twiddle, False => Twiddle Conjugate)")
    
    const first_stage_output = [...Butterflyrender(x,1,1)]
    console.log("First stage output =",first_stage_output)

    const second_stage_input = [first_stage_output[0],first_stage_output[1],first_stage_output[2],first_stage_output[3],
        multiply(first_stage_output[4],w[0]),multiply(first_stage_output[5],w[1]),multiply(first_stage_output[6],w[2]),multiply(first_stage_output[7],w[3])]
    console.log("Second stage input =",second_stage_input)
    
    const second_stage_output = [...Butterflyrender([second_stage_input[0],second_stage_input[1],second_stage_input[2],second_stage_input[3]],1,2),...Butterflyrender([second_stage_input[4],second_stage_input[5],second_stage_input[6],second_stage_input[7]],2,2)]
    console.log("Second stage output =",second_stage_output)

    const third_stage_input = [second_stage_output[0],second_stage_output[1],multiply(second_stage_output[2],w[0]),multiply(second_stage_output[3],w[2]),
        second_stage_output[4],second_stage_output[5],multiply(second_stage_output[6],w[0]),multiply(second_stage_output[7],w[2])]
    console.log("Third stage input =",third_stage_input)

    const third_stage_output = [...Butterflyrender([third_stage_input[0],third_stage_input[1]],1,3), ...Butterflyrender([third_stage_input[2],third_stage_input[3]],2,3), ...Butterflyrender([third_stage_input[4],third_stage_input[5]],3,3), ...Butterflyrender([third_stage_input[6],third_stage_input[7]],4,3)]
    console.log("Third stage output =",third_stage_output)

    const y = [third_stage_output[0],third_stage_output[4],third_stage_output[2],third_stage_output[6],
        third_stage_output[1],third_stage_output[5],third_stage_output[3],third_stage_output[7]]
    
    for(let i=0;i<y.length;i++)
    {
        if(num)
            y[i] = y[i]/8
    }
    
    console.log("Y =",y)
    
    return y
}

const Point8DITFFTorDIFIFFT = (x,num) => {
    const twiddle = [1,multiply(complex(1,-1),(1/sqrt(2))),complex(0,-1),multiply(complex(-1,-1),(1/sqrt(2)))]
    const twiddle_conjugate = [twiddle[0],conj(twiddle[1]),conj[twiddle[2]],conj[twiddle[3]]]
    let w = []
    if(num)
        w = twiddle_conjugate
    else if(!num)
        w = twiddle
    else
        console.error("Invalid twiddle choice :",num,"(Twiddle choice should be either true or false. True => Twiddle, False => Twiddle Conjugate)")
    const first_stage_input = [x[0],x[4],x[2],x[6],x[1],x[3],x[5],x[7]]
    console.log("First stage input =",first_stage_input)

    const first_stage_output = [...Butterflyrender([first_stage_input[0],first_stage_input[1]], ...Butterflyrender([first_stage_input[2],first_stage_input[3]]), ...Butterflyrender([first_stage_input[4],first_stage_input[5]]), ...Butterflyrender([first_stage_input[6],first_stage_input[7]]))]
    console.log("First stage output =",first_stage_output)
    
    const second_stage_input = [first_stage_output[0],first_stage_output[1],multiply(first_stage_output[2],w[0]),multiply(first_stage_output[3],w[2]),
        first_stage_output[4],first_stage_output[5],multiply(first_stage_output[6],w[0]),multiply(first_stage_output[7],w[2])]
    console.log("Second stage input =",second_stage_input)
    
    const second_stage_output = [...Butterflyrender([second_stage_input[0],second_stage_input[1],second_stage_input[2],second_stage_input[3]],1,2),...Butterflyrender([second_stage_input[4],second_stage_input[5],second_stage_input[6],second_stage_input[7]],2,2)]
    console.log("Second stage output =",second_stage_output)
    
    const third_stage_input = [second_stage_output[0],second_stage_output[1],second_stage_output[2],second_stage_output[3],
        multiply(second_stage_output[4],w[0]),multiply(second_stage_output[5],w[1]),multiply(second_stage_output[6],w[2]),multiply(second_stage_output[7],w[3])]
    console.log("Third stage input =",third_stage_input)
    
    const third_stage_output = [...Butterflyrender(third_stage_input)]
    console.log("Third stage output =",third_stage_output)

    const y = third_stage_output

    for(let i=0;i<y.length;i++)
    {
        if(num)
            y[i] = y[i]/8
    }
    
    console.log("Y =",y)
    
    return y
}

export {Point8DIFFFTorDITIFFT, Point8DITFFTorDIFIFFT}



