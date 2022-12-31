import { Point8DIFFFTorDITIFFT, Point8DITFFTorDIFIFFT } from "./Calculation";
import { Graph } from "react-d3-graph";
import { Card, Container } from "@mui/material";
import { useState } from "react";
import { boolean, complex, leftShift } from 'mathjs'

const MainPage = () => {
    const details = {transform : true, type: true}
    const [input,updateinput] = useState(details)
    const [output,updateoutput] = useState([])

    const onChange = (event) => {
        console.log("event -",event)
        console.log("event.target -",event.target)
        console.log("event.target.value -",event.target.value)
        let value = true
        if(event.target.value === "false")
            value = false
        updateinput({...input, [event.target.name]: value})
        console.log("State value -",input)
    }

    const onSubmit = (event) => {
        // event.preventDefault();
        const x = [36,complex(-4,9.7),complex(-4,4),complex(-4,7.7),-4,complex(-4,-7.7),complex(-4,-4),complex(-4,-9.7)]
        console.log("Input given ->",x)
        let output = Point8DIFFFTorDITIFFT(x,1)
        console.log("Output == ", output)
        updateoutput(output)
    }

    return (
        <>
            <form>
                <label>DFT or IDFT</label>
                <input type="radio" value="true" placeholder="DFT" name="transform" onClick={onChange}></input>
                <input type="radio" value="false" placeholder="IDFT" name="transform" onClick={onChange}></input>
                <br></br>
                <label>Using DIT or DIF</label>
                <input type="radio" value="true" placeholder="DIT" name="type" onClick={onChange}></input>
                <input type="radio" value="false" placeholder="DIF" name="type" onClick={onChange}></input>
                <br></br>
                <label>x(0)</label> <input type="number"></input> <button>i</button>
                <label>x(1)</label> <input type="number"></input> <button>i</button>
                <label>x(2)</label> <input type="number"></input> <button>i</button>
                <label>x(3)</label> <input type="number"></input> <button>i</button>
                <label>x(4)</label> <input type="number"></input> <button>i</button>
                <label>x(5)</label> <input type="number"></input> <button>i</button>
                <label>x(6)</label> <input type="number"></input> <button>i</button>
                <label>x(7)</label> <input type="number"></input> <button>i</button>
                <br></br>
                <button type="submit">Submit</button>
            </form>
            <br></br>
            <button onClick={onSubmit}>Click Me</button>
            <p>Output = </p>
            {output.map((value) => {
                return (
                    <span>{value}</span>
                )
            })}
        </>
    )
}

export default MainPage


