import { Container } from "@mui/system"
import { Alert, AlertTitle, Button, Card, CardMedia, Grid, Paper } from '@mui/material'

import useMediaQuery from '@mui/material/useMediaQuery';

function SimpleMediaQuery() {
  const matches = useMediaQuery('(min-width:600px)');

  return <span>{`(min-width:600px) matches: ${matches}`}</span>;
}

const Func = () => {
    const screenWidth = useMediaQuery('(min-width:600px)');
    if(screenWidth)
        return (
            <Container style={{display:"flex", marginTop: "10%", padding:"0"}}>
                <Container style={{height:"600px", width:"20%", padding:"0"}}>
                <CardMedia style={{height:"100%", width:"100%", padding:"0"}} component="iframe" src="https://www.youtube.com/embed/ziQ9GURNrUg/">
            </CardMedia>
                </Container>
                <Container style={{height:"600px", width:"60%"}}>
                <Card style={{height:"100%", width:"100%"}}>
                        Hey there wdfeqwffffffffffqwfqwfqeefew
                        <SimpleMediaQuery></SimpleMediaQuery>
                        <input type="text"></input>
                    </Card>
                </Container>
                <Container style={{height:"600px", width:"20%", padding:"0"}}>
                <CardMedia style={{height:"100%", width:"100%", padding:"0"}} component="iframe" src="https://www.youtube.com/embed/ziQ9GURNrUg">
            </CardMedia>
                </Container>
                </Container>
        )
    else
        return null;
}
export default Func

// Anything below 600 px is small screen and aobve will be large screen
// Large Screen
// Ad - Selection - Ad
// Ad - Input selection - Ad
// Ad - Output - Ad
// 
// 
// Small Screen
// Ad
// Selection
// Input Selection
// Ad
// Output
// 
// 
// 


