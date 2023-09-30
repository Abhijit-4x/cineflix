import React from "react";
import Main from "../components/Main";
import Row from "../components/Rows";
import requests from "../Requests";

const Home = () =>{

    
    
    return(
        <>
            <Main />
            <Row rowId='1' title='Popular' fetchURL={requests.requestPopular} />
            <Row rowId='2' title='Trending' fetchURL={requests.requestTrending} />
            <Row rowId='4' title='TopRated' fetchURL={requests.requestTopRated} />
            <Row rowId='3' title='Upcoming' fetchURL={requests.requestUpcoming} />
            {/* <Row rowId='5' title='Horror' fetchURL={requests.requestHorror} /> */}
        </>
    )
}

export default Home;
