import React from 'react'
import {Col} from 'antd';

function GridCards(props) {


    if(props.landingPage){
        return (
            <Col lg={6} md = {8} xs={24}>
                <div style={{position:'relative'}}>
                    <a href={`/movie/${props.movieId}`}>
                        <img style={{width : '100%',height:'320px'}} src={props.image} alt={props.movieName}/>
                    </a>
                </div>
            </Col>
        )
    } 
    
    else {
        return (
            <Col lg={6} md = {8} xs={24}>
                <div style={{position:'relative'}}>
                    <img style={{width : '100%',height:'320px'}} src={props.image} alt={props.castName}/>
                </div>
            </Col>
        )
    }
}

export default GridCards


// functional shortcut : rfce !! 
//==notice==//
// Size of one column is 24. [lg = largest, md = middle, xs = smallest] of the column