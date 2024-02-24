import React, { Component } from 'react'

import {

    makeStyles
} from '@material-ui/core';


import {
    Box,
    Button,
    Container,
    Grid, TextField
} from "@mui/material";

import { Typography } from '@mui/material';



const materials = [
    "Aluminum",
    "Carbon Steel",
    "Stainless Steel",
    "Alloy steel",
    "Tool Steel",
    "Copper",
    "Brass",
    "Titanium",
    "super aloy",
];

const material3D = ["PLA", "ABS", "PET-G"];

const colors = ["white", "black"];

const subgrade = [
    [
        "Al 6065-T6",
        "Al 7075-T6",
        "Al 6061",
        "Al6082",
        "Al 6063",
        "AMPCOLOY 45",
        "Al 2014",
    ],
    [
        "1018.0 ",
        "1040.0 ",
        "EN8",
        "A36",
        "EN1A",
        "1045.0 ",
        "IS2062",
        "EN9",
        "EN3B",
        "1010.0 ",
        "1020.0 ",
        "1024.0 ",
        "1527.0 ",
        "1035.0 ",
        "1042.0 ",
        "1080.0 ",
        "129.0 ",
    ],
    [
        "SS304",
        "SS316",
        "SS310",
        "SS304L",
        "SS303",
        "SS316L",
        "SS416",
        "SS420",
        "17-4 PH",
        "SS430",
        "Super duplex",
    ],
    [
        "EN-19/ 4140",
        "EN-24/ 4340",
        "1215.0 ",
        "4145.0 ",
        "8620.0 ",
        "4130.0 ",
        "4150.0 ",
        "4320.0 ",
        "5150.0 ",
        "16MNCR5 ",
        "20MNCR5 ",
        "830006.0 ",
    ],
    ["A1", "A2", "OHNS O1", "OHNS O2", "D2", "D3", "M2", "M42", "W1"],
    ["C110", "C101", "C17200"],
    ["ASTM B16", "C36000", "CZ121", "Navel brass UNS 46400"],
    ["Grade 1", "Grade 2", "Grade 5"],
    [
        "Hstelloy c276",
        "inconel 718",
        "incoloy 925",
        "Inconel 625",
        "Monel 400",
        "Monel 500",
    ],
];


class SettingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

            number1: 0,
            number2: 0,
            number3: 0,
            number4: 0,
            number5: 0,
            number6: 0,


        };
    }


    Input = () => {

        return (<TextField label={'margin="none"'} id="margin-none" />)
    }


    render() {




        return (
            <Box>

                <Box container spacing={2} sx={{
                    marginTop: "5px",
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    alignContent: 'center',
                    borderBottom: "1px solid #000000",
                    paddingBottom: "10px",
                    marginBottom: "25px",

                }}>


                    <Box sx={
                        {
                            display: 'flex',
                            flexDirection: 'column',
                            flex: 1

                        }
                    }>
                        <Typography variant='h4' className="bold">Material Rate setting</Typography>
                         </Box>
                    <Box sx={
                        {
                            display: 'flex',

                        }
                    }>
                         <Typography variant='h6' className="semi_bold">Last updated : 12/10/2021</Typography>
                
                    </Box>


                </Box>



                <Box sx={{

                    display: 'flex',
                    flexDirection: 'column',


                }}>

                    {materials.map((item, index) => {
                        return (
                            <Box sx={{ display: "flex", flexDirection: "column", margin: "40px 0px 0px 0px", padding: "15px" }} className="shaddow">


                                <Box sx={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    alignContent: 'center',


                                }}>
                                    <Box sx={{ display: "flex", flex: 1 }}>

                                        <Typography variant='h5' className="semi_bold">{item}</Typography>

                                    </Box>
                                    <Box sx={
                                        {
                                            display: 'flex',

                                        }
                                    }>
                                        <Button variant="contained" color="primary" sx={{
                                            marginTop: "5px",
                                        }}>
                                            Save
                                        </Button>
                                    </Box>
                                </Box>


                                <Box sx={{
                                    marginLeft: "20px",
                                }}>
                                    {subgrade[index].map((item2, index2) => {
                                        return (
                                            <Grid container spacing={2} sx={{
                                                marginTop: "5px",
                                            }}

                                            >
                                                <Grid item xs={12} md={6} >

                                                    <label>Yesterday</label>
                                                    <TextField margin="dense" required
                                                        fullWidth label={item2} variant='outlined'
                                                        defaultValue={Math.floor(Math.random() * 100) + 1}
                                                    />
                                                </Grid>
                                                <Grid item xs={12} md={6}

                                                >

                                                    <label>Today</label>
                                                    <TextField
                                                        variant="outlined"
                                                        margin="dense"
                                                        required
                                                        fullWidth

                                                        label={item2}


                                                        placeholder="Enter New Value"

                                                    />
                                                </Grid>

                                            </Grid>

                                        )
                                    })}
                                </Box>
                            </Box>
                        );
                    })}




                </Box>




            </Box >

        );
    }
}

export default SettingScreen;