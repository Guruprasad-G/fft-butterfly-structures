import { Graph } from "react-d3-graph";

const Butterfly = ({val}) => {
    // console.log("Val ->",val)
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
        "height": 600,
        "highlightDegree": 1,
        "highlightOpacity": 1,
        "linkHighlightBehavior": false,
        "maxZoom": 8,
        "minZoom": 0.1,
        "nodeHighlightBehavior": false,
        "panAndZoom": true,
        "staticGraph": true,
        "staticGraphWithDragAndDrop": false,
        "width": 600,
        "d3": {
            "alphaTarget": 0.05,
            "gravity": -100,
            "linkLength": 100,
            "linkStrength": 1,
            "disableLinkForce": false
        },
        "node": {
            "color": "red",
            "fontColor": "black",
            "fontSize": 14,
            "fontWeight": "normal",
            "highlightColor": "SAME",
            "highlightFontSize": 8,
            "highlightFontWeight": "normal",
            "highlightStrokeColor": "SAME",
            "highlightStrokeWidth": "SAME",
            "labelProperty": "val",
            "labelPosition" : "top",
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
            "color": "black",
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
        <Graph id="graph-id" data = {data} config = {myConfig}/>
    )
}

export { Butterfly }

