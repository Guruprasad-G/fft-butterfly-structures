import {complex, conj, add, multiply, subtract, sqrt} from 'mathjs'
import { Graph } from "react-d3-graph";

const Butterflyrender = (inputArray,yoffset,xoffset,name) => {
    const output = []
    const half = inputArray.length/2;
    const nodes = []
    const links = []
    for(let i=0;i<inputArray.length;i++)
    {
        nodes.push({id: name+" "+String(inputArray[i]), x: xoffset*100, y: (yoffset+i+1)*100})
        console.log("Inp-",name+" "+String(inputArray[i]),"-x-",xoffset*100,"-y-",(yoffset+i+1)*100)
        if(i<half)
        {
            output[i] = add(inputArray[i],inputArray[half+i])
            nodes.push({id: name+" "+String(output[i]), x: (xoffset+1)*100, y: (yoffset+i+1)*100})
            console.log("Op1-",name+" "+String(output[i]),"-x- ",(xoffset+1)*100,"-y- ",(yoffset+i+1)*100)
            links.push({source: name+" "+String(inputArray[i]), target: name+" "+String(output[i])})
            links.push({source: name+" "+String(inputArray[half+i]), target: name+" "+String(output[i])})
        }
        else
        {
            output[i] = subtract(inputArray[i-half],inputArray[i])
            nodes.push({id: name+" "+String(output[i]), x: (xoffset+1)*100, y: (yoffset+i+1)*100})
            console.log("Op2-",name+" "+String(output[i]),"-x- ",(xoffset+1)*100,"-y- ",(yoffset+i+1)*100)
            links.push({source: name+" "+String(inputArray[i-half]), target: name+" "+String(output[i])})
            links.push({source: name+" "+String(inputArray[i]), target: name+" "+String(output[i])})
        }
    }
    // console.log("Output -> ",output)
    return {output:output,nodes:nodes,links:links}
}

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
    
    const first_stage_output = Butterflyrender(x,1,1,"Stage 1")
    console.log("First stage output =",first_stage_output.output)
    // console.log("First stage nodes ->",first_stage_output.nodes)

    const second_stage_input = [first_stage_output.output[0],first_stage_output.output[1],first_stage_output.output[2],first_stage_output.output[3],
        multiply(first_stage_output.output[4],w[0]),multiply(first_stage_output.output[5],w[1]),multiply(first_stage_output.output[6],w[2]),multiply(first_stage_output.output[7],w[3])]
    console.log("Second stage input =",second_stage_input)
    
    const second_stage_output_a = Butterflyrender([second_stage_input[0],second_stage_input[1],second_stage_input[2],second_stage_input[3]],1,3,"Stage 2a")
    const second_stage_output_b = Butterflyrender([second_stage_input[4],second_stage_input[5],second_stage_input[6],second_stage_input[7]],5,3,"Stage 2b")
    const second_stage_output = {output: [...second_stage_output_a.output, ...second_stage_output_b.output], nodes : [...second_stage_output_a.nodes, ...second_stage_output_b.nodes], links: [...second_stage_output_a.links, ...second_stage_output_b.links]}
    // console.log("Second stage output =",second_stage_output.output)
    // console.log("Second stage nodes ->",second_stage_output.nodes)

    const third_stage_input = [second_stage_output.output[0],second_stage_output.output[1],multiply(second_stage_output.output[2],w[0]),multiply(second_stage_output.output[3],w[2]),
        second_stage_output.output[4],second_stage_output.output[5],multiply(second_stage_output.output[6],w[0]),multiply(second_stage_output.output[7],w[2])]
    console.log("Third stage input =",third_stage_input)

    const third_stage_output_a = Butterflyrender([third_stage_input[0],third_stage_input[1]],1,5,"Stage 3a")
    const third_stage_output_b = Butterflyrender([third_stage_input[2],third_stage_input[3]],3,5,"Stage 3b")
    const third_stage_output_c = Butterflyrender([third_stage_input[4],third_stage_input[5]],5,5,"Stage 3c")
    const third_stage_output_d = Butterflyrender([third_stage_input[6],third_stage_input[7]],7,5,"Stage 3d")

    const third_stage_output = {
        output : [...third_stage_output_a.output,...third_stage_output_b.output,...third_stage_output_c.output,...third_stage_output_d.output],
        nodes : [...third_stage_output_a.nodes,...third_stage_output_b.nodes,...third_stage_output_c.nodes,...third_stage_output_d.nodes],
        links : [...third_stage_output_a.links,...third_stage_output_b.links,...third_stage_output_c.links,...third_stage_output_d.links]
    }
    console.log("Third stage output =",third_stage_output.output)
    // console.log("Third stage nodes ->",third_stage_output.nodes)

    const y = [third_stage_output.output[0],third_stage_output.output[4],third_stage_output.output[2],third_stage_output.output[6],
        third_stage_output.output[1],third_stage_output.output[5],third_stage_output.output[3],third_stage_output.output[7]]
    
    for(let i=0;i<y.length;i++)
    {
        if(num)
            y[i] = y[i]/8
    }
    
    // console.log("Y =",y)
    
    const nodes = [...first_stage_output.nodes, ...second_stage_output.nodes, ...third_stage_output.nodes]
    const links = [...first_stage_output.links, ...second_stage_output.links, ...third_stage_output.links]
    // console.log("Nodes --")
    // console.log(nodes)
    return {nodes:nodes, links:links}
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
    console.log("First stage output =",first_stage_output.output)
    
    const second_stage_input = [first_stage_output[0],first_stage_output[1],multiply(first_stage_output[2],w[0]),multiply(first_stage_output[3],w[2]),
        first_stage_output[4],first_stage_output[5],multiply(first_stage_output[6],w[0]),multiply(first_stage_output[7],w[2])]
    console.log("Second stage input =",second_stage_input)
    
    const second_stage_output = [...Butterflyrender([second_stage_input[0],second_stage_input[1],second_stage_input[2],second_stage_input[3]],1,2),...Butterflyrender([second_stage_input[4],second_stage_input[5],second_stage_input[6],second_stage_input[7]],2,2)]
    console.log("Second stage output =",second_stage_output.output)
    
    const third_stage_input = [second_stage_output.output[0],second_stage_output.output[1],second_stage_output.output[2],second_stage_output.output[3],
        multiply(second_stage_output.output[4],w[0]),multiply(second_stage_output.output[5],w[1]),multiply(second_stage_output.output[6],w[2]),multiply(second_stage_output.output[7],w[3])]
    console.log("Third stage input =",third_stage_input)
    
    const third_stage_output = [...Butterflyrender(third_stage_input)]
    console.log("Third stage output =",third_stage_output.output)

    const y = third_stage_output.output

    for(let i=0;i<y.length;i++)
    {
        if(num)
            y[i] = y[i]/8
    }
    
    console.log("Y =",y)
    
    const nodes = [...first_stage_output.nodes, ...second_stage_output.nodes, ...third_stage_output.nodes]
    const links = [...first_stage_output.links, ...second_stage_output.links, ...third_stage_output.links]

    return {nodes:nodes, links:links}
}

const Butterfly = ({val}) => {
    console.log("Val ->",val)
    if(!val)
    {
        return null;
    }
    const myConfig = {
        "automaticRearrangeAfterDropNode": false,
        "collapsible": false,
        "directed": true,
        "focusAnimationDuration": 0.75,
        "focusZoom": 1,
        "freezeAllDragEvents": false,
        "height": 400,
        "highlightDegree": 1,
        "highlightOpacity": 1,
        "linkHighlightBehavior": false,
        "maxZoom": 8,
        "minZoom": 0.1,
        "nodeHighlightBehavior": false,
        "panAndZoom": true,
        "staticGraph": true,
        "staticGraphWithDragAndDrop": false,
        "width": 800,
        "d3": {
            "alphaTarget": 0.05,
            "gravity": -100,
            "linkLength": 100,
            "linkStrength": 1,
            "disableLinkForce": false
        },
        "node": {
            "color": "green",
            "fontColor": "pink",
            "fontSize": 14,
            "fontWeight": "normal",
            "highlightColor": "SAME",
            "highlightFontSize": 8,
            "highlightFontWeight": "normal",
            "highlightStrokeColor": "SAME",
            "highlightStrokeWidth": "SAME",
            "labelProperty": "id",
            "mouseCursor": "pointer",
            "opacity": 1,
            "renderLabel": true,
            "size": 200,
            "strokeColor": "none",
            "strokeWidth": 1.5,
            "svg": "",
            "symbolType": "circle"
        },
        "link": {
            "color": "red",
            "fontColor": "yellow",
            "fontSize": 8,
            "fontWeight": "normal",
            "highlightColor": "SAME",
            "highlightFontSize": 8,
            "highlightFontWeight": "normal",
            "labelProperty": "label",
            "mouseCursor": "pointer",
            "opacity": 1,
            "renderLabel": false,
            "semanticStrokeWidth": false,
            "strokeWidth": 1.5,
            "markerHeight": 6,
            "markerWidth": 6,
            "strokeDasharray": 0,
            "strokeDashoffset": 0,
            "strokeLinecap": "butt"
        }
    }
    const {nodes,links} = val
    const data = {nodes : [...nodes], links : [...links]}
    return (
        <Graph
            id="graph-id"
            data = {data}
            config = {myConfig}
        />
    )
}

export {Butterfly, Point8DIFFFTorDITIFFT, Point8DITFFTorDIFIFFT}

