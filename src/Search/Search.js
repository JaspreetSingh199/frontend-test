import React, { Component } from "react";
import "./Show.css";
import empty from './empty.jpg';
import { Grid, Card, CardMedia, CardContent, Typography, Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';


class Search extends Component {

  state = {
    searchValue: "",
    open : true,
    showList: [],
  };


  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  makeApiCall = searchInput => {
    var searchUrl = process.env.REACT_APP_API_URL + "/api/search";
    fetch(searchUrl,{
      method: 'POST',
      headers: {
        'auth-token': sessionStorage.getItem("token"),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({title:searchInput}),
    })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.setState({ showList: jsonData});
        console.log(this.state.showList)
      });
  };

  handleClickImage = showId => { 
    this.setState({ showId: showId })
    //history.push("/season");
  }

  render() {
    return (
      <div id="main">
        <h1>Welcome to TV shows search app</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        {this.state.showList.length > 0 ? (
          <div>
            <Grid container spacing={2} style={{paddingTop: "20px", paddingLeft: "50px", paddingRight: "50px"}}>
              {this.state.showList.map((showObj, index) => (
                <Grid item xs={3} key={index}>
                  <Card>
                  {showObj.show.image !== null ?<CardMedia image={showObj.show.image.medium} style={{ width: "auto", height: "300px" }} /> : <img src={empty} alt="meal-thumbnail" />}
                    <CardContent>
                      <Typography><b>Show Name : {showObj.show.name}</b></Typography>
                      <Typography><b>Show Summary : <div dangerouslySetInnerHTML={{__html: showObj.show.summary}}></div></b></Typography>
                      <Typography><b>Show Type : {showObj.show.type}</b></Typography>
                      <Typography><b>Show Language : {showObj.show.language}</b></Typography>
                      {/* <Typography><b>{showObj.show.genres}</b></Typography> */}
                      <Typography><b>Show Status : {showObj.show.status}</b></Typography>
                      <Typography><b>Show Time : {showObj.show.schedule.time}</b></Typography>
                      <Typography><b>Show Status : {showObj.show.schedule.days}</b></Typography>
                      <Typography><b>Show Genres : {showObj.show.genres.map((item, index) => (
                        <p>{item}</p>
                      ))}

                      </b></Typography>


                    </CardContent>
                  </Card>
                </Grid>
                
              ))}
            </Grid>            
          </div>
        ) : (
          <div>
            {/* Snackbar To Display If There Are No Results*/}
            <Snackbar open={this.state.open} autoHideDuration={6000}>
              <Alert severity="error" >
                No Results
              </Alert>
            </Snackbar>
          </div>
          
        )}
      </div>
    );
  }
}

export default Search;
