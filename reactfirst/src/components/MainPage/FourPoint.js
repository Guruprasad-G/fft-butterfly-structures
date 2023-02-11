import { multiply, divide} from 'mathjs'
import { Butterflyrender,Additionalnodeconnector } from './Butteflyrender'

const Point4DIFFFTorDITIFFT = (x,w,num) => {
    // console.log("Inside Point4DIFFFTorDITIFFT")
    const first_stage_output = Butterflyrender(1,x,1,1,0)
    // console.log("First stage output =",first_stage_output.output)
    const second_stage_input = [first_stage_output.output[0],first_stage_output.output[1],
        multiply(first_stage_output.output[2],w[0]),multiply(first_stage_output.output[3],w[1])]
    // console.log("Second stage input =",second_stage_input)
    
    const second_stage_output_a = Butterflyrender(2,[second_stage_input[0],second_stage_input[1]],3,1,0)
    const second_stage_output_b = Butterflyrender(2,[second_stage_input[2],second_stage_input[3]],3,3,2)
    const second_stage_output = {output: [...second_stage_output_a.output, ...second_stage_output_b.output], nodes : [...second_stage_output_a.nodes, ...second_stage_output_b.nodes], links: [...second_stage_output_a.links, ...second_stage_output_b.links]}
    // console.log("Second stage output =",second_stage_output.output)

    const y = [second_stage_output.output[0],second_stage_output.output[2],second_stage_output.output[1],second_stage_output.output[3]]
    
    for(let i=0;i<y.length;i++)
    {
        if(num)
            y[i] = divide(y[i],4)
    }
    // console.log("Y =",y)
    
    const final_stage_additions = Additionalnodeconnector(2,x,y,-1,7)
    // console.log("Output of connector func -",final_stage_additions)
    
    const nodes = [...first_stage_output.nodes, ...second_stage_output.nodes, ...final_stage_additions.nodes]
    const links = [...first_stage_output.links, ...second_stage_output.links, ...final_stage_additions.links]
    // console.log("Nodes --", nodes)
    
    return {nodes:nodes, links:links}
}

const Point4DITFFTorDIFIFFT = (x,w,num) => {
    // console.log("Point4DITFFTorDIF")
    const first_stage_input = [x[0],x[2],x[1],x[3]]
    // console.log("First stage input =",first_stage_input)

    const first_stage_output_a =  Butterflyrender(1,[first_stage_input[0],first_stage_input[1]],1,1,0)
    const first_stage_output_b =  Butterflyrender(1,[first_stage_input[2],first_stage_input[3]],1,3,2)
    
    const first_stage_output = {
        output : [...first_stage_output_a.output, ...first_stage_output_b.output],
        nodes : [...first_stage_output_a.nodes, ...first_stage_output_b.nodes],
        links : [...first_stage_output_a.links, ...first_stage_output_b.links]
    }
    // console.log("First stage output =",first_stage_output.output)

    const second_stage_input = [first_stage_output.output[0],first_stage_output.output[1],multiply(first_stage_output.output[2],w[0]),multiply(first_stage_output.output[3],w[1])]
    // console.log("Second stage input =",second_stage_input)
    
    const second_stage_output = Butterflyrender(2,[second_stage_input[0],second_stage_input[1],second_stage_input[2],second_stage_input[3]],3,1,0)
    // console.log("Second stage output =",second_stage_output.output)

    const y = second_stage_output.output
    for(let i=0;i<y.length;i++)
    {
        if(num)
            y[i] = divide(y[i],8)
    }
    // console.log("Y =",y)

    const final_stage_additions = Additionalnodeconnector(2,first_stage_input,y,-1,7)
    // console.log("Output of connector func -",final_stage_additions)
    
    const nodes = [...first_stage_output.nodes, ...second_stage_output.nodes,...final_stage_additions.nodes]
    const links = [...first_stage_output.links, ...second_stage_output.links,...final_stage_additions.links]

    return {nodes:nodes, links:links}
}

export {Point4DIFFFTorDITIFFT, Point4DITFFTorDIFIFFT}
