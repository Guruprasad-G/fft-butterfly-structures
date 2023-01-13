import {complex, conj, multiply, sqrt, divide} from 'mathjs'
import { Butterflyrender, Additionalnodeconnector } from './Butteflyrender';

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
    
    const first_stage_output = Butterflyrender(1,x,1,1,0)
    // console.log("First stage output =",first_stage_output.output)

    const second_stage_input = [first_stage_output.output[0],first_stage_output.output[1],first_stage_output.output[2],first_stage_output.output[3],
        multiply(first_stage_output.output[4],w[0]),multiply(first_stage_output.output[5],w[1]),multiply(first_stage_output.output[6],w[2]),multiply(first_stage_output.output[7],w[3])]
    // console.log("Second stage input =",second_stage_input)
    
    const second_stage_output_a = Butterflyrender(2,[second_stage_input[0],second_stage_input[1],second_stage_input[2],second_stage_input[3]],3,1,0)
    const second_stage_output_b = Butterflyrender(2,[second_stage_input[4],second_stage_input[5],second_stage_input[6],second_stage_input[7]],3,5,4)
    const second_stage_output = {output: [...second_stage_output_a.output, ...second_stage_output_b.output], nodes : [...second_stage_output_a.nodes, ...second_stage_output_b.nodes], links: [...second_stage_output_a.links, ...second_stage_output_b.links]}
    // console.log("Second stage output =",second_stage_output.output)

    const third_stage_input = [second_stage_output.output[0],second_stage_output.output[1],multiply(second_stage_output.output[2],w[0]),multiply(second_stage_output.output[3],w[2]),
        second_stage_output.output[4],second_stage_output.output[5],multiply(second_stage_output.output[6],w[0]),multiply(second_stage_output.output[7],w[2])]
    // console.log("Third stage input =",third_stage_input)

    const third_stage_output_a = Butterflyrender(3,[third_stage_input[0],third_stage_input[1]],5,1,0)
    const third_stage_output_b = Butterflyrender(3,[third_stage_input[2],third_stage_input[3]],5,3,2)
    const third_stage_output_c = Butterflyrender(3,[third_stage_input[4],third_stage_input[5]],5,5,4)
    const third_stage_output_d = Butterflyrender(3,[third_stage_input[6],third_stage_input[7]],5,7,6)

    const third_stage_output = {
        output : [...third_stage_output_a.output, ...third_stage_output_b.output, ...third_stage_output_c.output, ...third_stage_output_d.output],
        nodes : [...third_stage_output_a.nodes, ...third_stage_output_b.nodes, ...third_stage_output_c.nodes, ...third_stage_output_d.nodes],
        links : [...third_stage_output_a.links, ...third_stage_output_b.links, ...third_stage_output_c.links, ...third_stage_output_d.links]
    }
    // console.log("Third stage output =",third_stage_output.output)

    const y = [third_stage_output.output[0],third_stage_output.output[4],third_stage_output.output[2],third_stage_output.output[6],
        third_stage_output.output[1],third_stage_output.output[5],third_stage_output.output[3],third_stage_output.output[7]]
    
    for(let i=0;i<y.length;i++)
    {
        if(num)
            y[i] = divide(y[i],8)
    }
    // console.log("Y =",y)
    
    const final_stage_additions = Additionalnodeconnector(3,x,y,-1,7)
    // console.log("Output of connector func -",final_stage_additions)
    
    const nodes = [...first_stage_output.nodes, ...second_stage_output.nodes, ...third_stage_output.nodes, ...final_stage_additions.nodes]
    const links = [...first_stage_output.links, ...second_stage_output.links, ...third_stage_output.links, ...final_stage_additions.links]
    // console.log("Nodes --", nodes)
    
    return {nodes:nodes, links:links}
}

const Point8DITFFTorDIFIFFT = (x,num) => {

    const twiddle = [1,multiply(complex(1,-1),(1/sqrt(2))),complex(0,-1),multiply(complex(-1,-1),(1/sqrt(2)))]
    const twiddle_conjugate = [twiddle[0],conj(twiddle[1]),conj(twiddle[2]),conj(twiddle[3])]

    let w = []
    if(num)
        w = twiddle_conjugate
    else if(!num)
        w = twiddle
    else
        console.error("Invalid twiddle choice :",num,"(Twiddle choice should be either true or false. True => Twiddle, False => Twiddle Conjugate)")
    
    const first_stage_input = [x[0],x[4],x[2],x[6],x[1],x[5],x[3],x[7]]
    console.log("First stage input =",first_stage_input)

    const first_stage_output_a =  Butterflyrender(1,[first_stage_input[0],first_stage_input[1]],1,1,0)
    const first_stage_output_b =  Butterflyrender(1,[first_stage_input[2],first_stage_input[3]],1,3,2)
    const first_stage_output_c =  Butterflyrender(1,[first_stage_input[4],first_stage_input[5]],1,5,4)
    const first_stage_output_d =  Butterflyrender(1,[first_stage_input[6],first_stage_input[7]],1,7,6)
    
    const first_stage_output = {
        output : [...first_stage_output_a.output, ...first_stage_output_b.output, ...first_stage_output_c.output, ...first_stage_output_d.output],
        nodes : [...first_stage_output_a.nodes, ...first_stage_output_b.nodes, ...first_stage_output_c.nodes, ...first_stage_output_d.nodes],
        links : [...first_stage_output_a.links, ...first_stage_output_b.links, ...first_stage_output_c.links, ...first_stage_output_d.links]
    }
    // console.log("First stage output =",first_stage_output.output)

    const second_stage_input = [first_stage_output.output[0],first_stage_output.output[1],multiply(first_stage_output.output[2],w[0]),multiply(first_stage_output.output[3],w[2]),
        first_stage_output.output[4],first_stage_output.output[5],multiply(first_stage_output.output[6],w[0]),multiply(first_stage_output.output[7],w[2])]
    // console.log("Second stage input =",second_stage_input)
    
    const second_stage_output_a = Butterflyrender(2,[second_stage_input[0],second_stage_input[1],second_stage_input[2],second_stage_input[3]],3,1,0)
    const second_stage_output_b = Butterflyrender(2,[second_stage_input[4],second_stage_input[5],second_stage_input[6],second_stage_input[7]],3,5,4)
    const second_stage_output = {output: [...second_stage_output_a.output, ...second_stage_output_b.output], nodes : [...second_stage_output_a.nodes, ...second_stage_output_b.nodes], links: [...second_stage_output_a.links, ...second_stage_output_b.links]}
    // console.log("Second stage output =",second_stage_output.output)
    
    const third_stage_input = [second_stage_output.output[0],second_stage_output.output[1],second_stage_output.output[2],second_stage_output.output[3],
        multiply(second_stage_output.output[4],w[0]),multiply(second_stage_output.output[5],w[1]),multiply(second_stage_output.output[6],w[2]),multiply(second_stage_output.output[7],w[3])]
    // console.log("Third stage input =",third_stage_input)
    
    const third_stage_output = Butterflyrender(3,third_stage_input,5,1,0)
    // console.log("Third stage output =",third_stage_output.output)

    const y = third_stage_output.output
    for(let i=0;i<y.length;i++)
    {
        if(num)
            y[i] = divide(y[i],8)
    }
    // console.log("Y =",y)

    const final_stage_additions = Additionalnodeconnector(3,first_stage_input,y,-1,7)
    // console.log("Output of connector func -",final_stage_additions)
    
    const nodes = [...first_stage_output.nodes, ...second_stage_output.nodes, ...third_stage_output.nodes, ...final_stage_additions.nodes]
    const links = [...first_stage_output.links, ...second_stage_output.links, ...third_stage_output.links, ...final_stage_additions.links]

    return {nodes:nodes, links:links}
}

export {Point8DIFFFTorDITIFFT, Point8DITFFTorDIFIFFT}
