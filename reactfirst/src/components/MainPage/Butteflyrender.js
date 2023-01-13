import { add, subtract, round} from 'mathjs'

const Butterflyrender = (stage,inputArray,xoffset,yoffset,nextindex) => {
    // xoffset remains same throughout a given stage
    // yoffset varies as number of individual butterflies vary in a stage
    // next is used to keep track of which next set of values you are passing for the same stage inputs. It varies similar to yoffset
    console.log("Inside Butterfly render")
    var output = []
    console.log("Inside Butterfly render")
    const half = inputArray.length/2;
    const nodes = []
    const links = []
    var nextin = nextindex
    var nextout = nextindex
    const inname = "i"+String(stage)
    const outname = "o"+String(stage)
    console.log("Before for loop")
    for(let i=0;i<inputArray.length;i++)
    {
        console.log("Inside for loop")
        nodes.push({id: inname+String(nextin), x: xoffset*100, y: (yoffset+i+1)*100, val:String(inputArray[i])}) // Pushing the input node
        console.log("Inp-",inname+String(nextin),"-x-",xoffset*100,"-y-",(yoffset+i+1)*100)
        if(i<half)
        {
            output[i] = round(add(inputArray[i],inputArray[half+i]),2)
            console.log("Iter -",output)
            nodes.push({id: outname+String(nextout), x: (xoffset+1)*100, y: (yoffset+i+1)*100, val:String(output[i])}) // Pushing the first half of output nodes
            console.log("Op1-",outname+String(nextout),"-x- ",(xoffset+1)*100,"-y- ",(yoffset+i+1)*100)
            links.push({source: inname+String(nextin), target: outname+String(nextout)})
            links.push({source: inname+String(nextin+half), target: outname+String(nextout)})
            nextout++
        }
        else
        {
            output[i] = round(subtract(inputArray[i-half],inputArray[i]),2)
            nodes.push({id: outname+String(nextout), x: (xoffset+1)*100, y: (yoffset+i+1)*100, val:String(output[i])}) // Pushing the first half of output nodes
            console.log("Op2-",outname+String(nextout),"-x- ",(xoffset+1)*100,"-y- ",(yoffset+i+1)*100)
            links.push({source: inname+String(nextin-half), target: outname+String(nextout)})
            links.push({source: inname+String(nextin), target: outname+String(nextout)})
            nextout++
        }
        nextin++
    }
    console.log("Output -> ||| ",output)
    console.log("At the end of a butterfly stage -")
    console.log(nodes)
    console.log(links)
    return {output:output,nodes:nodes,links:links}
}

const Additionalnodeconnector = (n,inputArray,outputArray,inputXoffset,outputXoffset) => {
    const nodes = []
    const links = []
    // Generating 0th input nodes and connection betweem input nodes and 1s stage input
    for(let i=0;i<inputArray.length;i++)
    {
        nodes.push({id : "i0"+String(i), x: inputXoffset*100, y: (i+2)*100, val:String(inputArray[i])})
        links.push({source: "i0"+String(i), target: "i1"+String(i)})
    }
    // Generating connections in-between stages
    for(let j=1;j<n;j++)
    {
        for(let i=0;i<inputArray.length;i++)
        {
            links.push({source: "o"+String(j)+String(i), target: "i"+String(j+1)+String(i)})
        }
    }
    //Generating final output node and connection between 3rd stage output and final output
    for(let i=0;i<inputArray.length;i++)
    {
        nodes.push({id : "o0"+String(i), x: outputXoffset*100, y: (i+2)*100, val:String(outputArray[i])})
        links.push({source: "i"+String(n)+String(i), target: "o0"+String(i)})
    }
    // console.log("At the end of a other connections -")
    // console.log(nodes)
    // console.log(links)
    return {nodes:nodes,links:links}
}

export { Butterflyrender, Additionalnodeconnector}
