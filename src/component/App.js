import React from "react";
import {FormControlLabel, Grid, Box, Slider, Typography, Checkbox, List, ListItem, ListItemText} from '@mui/material';
import { TransitionGroup, CSSTransition, SwitchTransition } from "react-transition-group";
import "./App.css";
import "../logic/calculate";
import calculate from "../logic/calculate";

const length_marks = [
    {
      value: 8
    },
    {
      value: 12
    },
    {
      value: 15
    },
    {
      value: 20
    },
    {
        value: 52
    },    
  ];

  const num_marks = [
    {
      value: 1
    },
    {
      value: 5
    },
    {
      value: 10
    },    
  ];

  const spec_marks = [
    {
      value: 1
    },
    {
      value: 2
    },
    {
      value: 5
    },    
  ];

class App extends React.Component {
    state = {
      changed: 0,
      length: 12,
      num: 2,
      spec: 2,
      allowRepeat: false,
      noUpper: false,
      results: ["", "", ""],
    };

    handleChange = event => (e, value) => {
      const x = Object.assign({}, this.state);
      x[event] = value;
      const r = [calculate(x), calculate(x), calculate(x)];
      this.setState({ changed: (this.state.changed === 0 ? 1 : 0), results: r });  
    }

    render() {
        return (
            <div>
                <Box sx={{ minWidth: 300, margin: 1, mt: 10, justifyContent: "center", alignItems: "center" }}>
                  <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item>
                      <Typography gutterBottom>Total length:</Typography>
                    </Grid>
                    <Grid item xs>
                      <Slider
                        aria-label="Always visible"
                        defaultValue={this.state.length}
                        marks={length_marks}
                        min={5}
                        max={52} 
                        valueLabelDisplay="on"
                        onChangeCommitted={this.handleChange("length")}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item>
                      <Typography gutterBottom>Numbers:</Typography>
                    </Grid>
                    <Grid item xs>
                      <Slider
                        aria-label="Always visible"
                        defaultValue={this.state.num}
                        marks={num_marks}
                        min={1}
                        max={10} 
                        valueLabelDisplay="on"
                        onChangeCommitted={this.handleChange("num")}
                      />
                    </Grid>
                  </Grid> 

                  <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item>
                      <Typography gutterBottom>Special:</Typography>
                    </Grid>
                    <Grid item xs>
                      <Slider
                        aria-label="Always visible"
                        defaultValue={this.state.spec}
                        marks={spec_marks}
                        min={1}
                        max={5} 
                        valueLabelDisplay="on"
                        onChangeCommitted={this.handleChange("spec")}
                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={2} justify="center" alignItems="center">
                    <Grid item>
                     <FormControlLabel control={<Checkbox onChange={this.handleChange("noUpper")}/>} label="No upper" />
                    </Grid>

                    <Grid item>
                      <FormControlLabel control={<Checkbox onChange={this.handleChange("allowRepeat")}/>} label="Allow repeat" />
                    </Grid>
                  </Grid>                   

                  <List className="resultName" component="nav" aria-label="mailbox folders">
                    {this.state.results.map((todo, index) => (
                      <ListItem button divider sx={{ justifyContent: "center", alignItems: "center" }} key={index.toString()}>
                        <SwitchTransition mode="out-in">
                          <CSSTransition
                            classNames="fade"
                            addEndListener={(node, done) => {
                              node.addEventListener("transitionend", done, false);
                            } }
                            key={index.toString()}
                          >
                            <ListItemText className="text" primary={todo} />
                          </CSSTransition>
                        </SwitchTransition>
                      </ListItem>
                    ))}
                  </List>       
                </Box>                       
            </div>
        );
    }
}

export default App;