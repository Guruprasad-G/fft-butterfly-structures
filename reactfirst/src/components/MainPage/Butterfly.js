import { Graph } from "react-d3-graph";
import {complex, conj, add, multiply, subtract, im, re, sqrt} from 'mathjs'

const Stage1 = (n,x1,x2) => {
    const outputarr = []
    const y1 = add(x1,x2)
    const y2 = subtract(x1,x2)
    const nodes = []
    nodes.push({id: String(x1)})
    nodes.push({id: String(x2)})
    nodes.push({id: String(y1)})
    nodes.push({id: String(y2)})
    const links = []
    links.push({source : String(x1), target: String(y1)})
    links.push({source : String(x1), target: String(y2)})
    links.push({source : String(x2), target: String(y1)})
    links.push({source : String(x2), target: String(y2)})
    return {nodes:nodes,links:links}
}

const Butterflyrender = (inputArray,xoffset,yoffset) => {
    const output = []
    const half = inputArray.length/2;
    const nodes = []
    const links = []
    for(let i=0;i<inputArray.length;i++)
    {
        nodes.push({id: inputArray[i], x: xoffset*i*100, y: yoffset*100})
        if(i<half)
        {
            output[i] = add(inputArray[i],inputArray[half+i])
            nodes.push({id: output[i], x: xoffset*i*100, y:(yoffset+1)*100})
            links.push({source: inputArray[i], target: output[i]})
            links.push({source: inputArray[half+i], target: output[i]})
        }
        else
        {
            output[i] = subtract(inputArray[i-half],inputArray[i])
            nodes.push({id: output[i], x: xoffset*i*100, y:(yoffset+1)*100})
            links.push({source: inputArray[i-half], target: output[i]})
            links.push({source: inputArray[i], target: output[i]})
        }
    }
    console.log("Output -> ",output)
    return output
}

const Butterfly = () => {
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
    const data = {
        nodes : [
            {id: "node1", x : -100, y : 100}, {id: "node2", x : 100, y : 100}, 
            {id: "node3", x : 100, y : -100}, {id: "node4", x : -100, y : -100},
            {id: "node5", x : -100, y : 100}, {id: "node6", x : 100, y : 100}, 
            {id: "node7", x : 100, y : -100}, {id: "node8", x : -100, y : -100},
        ],
        links : [
            {source : "node1", target : "node3"},
            {source : "node1", target : "node2"},
            {source : "node4", target : "node2"},
            {source : "node4", target : "node3"}
        ]
    }
    return (
        <Graph
            id="graph-id"
            data = {data}
            config = {myConfig}
        />
    )
}

export {Butterfly, Butterflyrender}
