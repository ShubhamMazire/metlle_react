import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import api, { URL_PATH, assetBaseUrl } from '../../Common/API';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';

import Box from '@material-ui/core/Box';
import HeaderComponent from '../../Components/HeaderComponentMLP';
import { Button, Typography } from '@material-ui/core';

const thumbnails = [
    { id: 250, thumbnail_path: "thumbnails/1696136396826.png" },
    { id: 251, thumbnail_path: "thumbnails/1696136509489.png" },
    { id: 252, thumbnail_path: "thumbnails/1696136524213.png" },
    { id: 253, thumbnail_path: "thumbnails/1696136616960.png" },
    { id: 254, thumbnail_path: "thumbnails/1696136680898.png" },
    { id: 255, thumbnail_path: "thumbnails/1696136768564.png" },
    { id: 256, thumbnail_path: "thumbnails/1696136783836.png" },
    { id: 257, thumbnail_path: "thumbnails/1696136916397.png" },
    { id: 258, thumbnail_path: "thumbnails/1696137005096.png" },
    { id: 259, thumbnail_path: "thumbnails/1696138060142.png" },]






const data = [
    {
        "id": 250,
        "thumbnails": "thumbnails/1696136396826.png",
        "filePath": "price_matching/MTL1_04.step",
        "volume": 39277.27,
        "size": [
            29.97,
            75,
            28
        ],
        "cost": 43,
        "cost50nos": 39.775,
        "thumbnail": "price_matching/MTL1_04.png",
        "msaasPrice": "656",
        "msaasPrice50nos": "4564"
    },
    {
        "id": 251,
        "thumbnails": "thumbnails/1696136509489.png",
        "filePath": "price_matching/MTL2_10.step",
        "volume": 42562.43,
        "size": [
            64,
            64,
            12
        ],
        "cost": 96,
        "cost50nos": 88.8,
        "msaasPrice": "46",
        "msaasPrice50nos": "6546"
    },
    {
        "id": 252,
        "thumbnails": "thumbnails/1696136524213.png",
        "filePath": "price_matching/MTL3_12.step",
        "volume": 44096.81,
        "size": [
            40,
            40,
            68.33
        ],
        "cost": 101,
        "cost50nos": 93.425,
        "msaasPrice": "4654",
        "msaasPrice50nos": "564"
    },
    {
        "id": 253,
        "thumbnails": "thumbnails/1696136616960.png",
        "filePath": "price_matching/MTL4_20.step",
        "volume": 330501.3,
        "size": [
            66,
            124.5,
            65.97
        ],
        "cost": 92,
        "cost50nos": 85.1,
        "msaasPrice": "56",
        "msaasPrice50nos": "5646"
    },
    {
        "id": 254,
        "thumbnails": "thumbnails/1696136680898.png",
        "filePath": "price_matching/MTL5_40.step",
        "volume": 5134.675,
        "size": [
            7.5,
            35,
            57.49
        ],
        "cost": 202,
        "cost50nos": 186.85,
        "msaasPrice": "654654",
        "msaasPrice50nos": "6546"
    },
    {
        "id": 255,
        "thumbnails": "thumbnails/1696136768564.png",
        "filePath": "price_matching/MTL6_42.step",
        "volume": 9715.796,
        "size": [
            74.98,
            64,
            6.5
        ],
        "cost": 157,
        "cost50nos": 145.225,
        "msaasPrice": "4564",
        "msaasPrice50nos": "654"
    },
    {
        "id": 256,
        "thumbnails": "thumbnails/1696136783836.png",
        "filePath": "price_matching/MTL7_250.step",
        "volume": 6564.009,
        "size": [
            25,
            31,
            18
        ],
        "cost": 112,
        "cost50nos": 103.6,
        "msaasPrice": "65456",
        "msaasPrice50nos": "4654"
    },
    {
        "id": 257,
        "thumbnails": "thumbnails/1696136916397.png",
        "filePath": "price_matching/MTL8_19.step",
        "volume": 238764.6,
        "size": [
            91.65,
            99.97,
            40
        ],
        "cost": 246,
        "cost50nos": 227.55,
        "msaasPrice": "65456",
        "msaasPrice50nos": "654"
    },
    {
        "id": 258,
        "thumbnails": "thumbnails/1696137005096.png",
        "filePath": "price_matching/MTL9_554.step",
        "volume": 629999,
        "size": [
            152.4,
            76.2,
            142.21
        ],
        "cost": 161,
        "cost50nos": 148.925,
        "msaasPrice": "65456",
        "msaasPrice50nos": "4564"
    },
    {
        "id": 259,
        "thumbnails": "thumbnails/1696138060142.png",
        "filePath": "price_matching/MTL10_610.step",
        "volume": 733141,
        "size": [
            220,
            110,
            85
        ],
        "cost": 402,
        "cost50nos": 371.85,
        "msaasPrice": "46",
        "msaasPrice50nos": "654"
    }
]


const styles = {
    borderedCell: {
        borderRight: '1px solid #e0e0e0', // Adjust the border style and color as needed
        backgroundColor: '#f5f5f5',
    },
};

class PriceMatchingScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

            match: false,

            data: [
                {
                    "id": 250,
                    "thumbnails": "thumbnails/1696136396826.png",
                    "filePath": "price_matching/MTL1_04.step",
                    "volume": 39277.27,
                    "size": [
                        29.97,
                        75,
                        28
                    ],
                    "cost": 198,
                    "cost50nos": 183,
                    "thumbnail": "price_matching/MTL1_04.png",
                    "msaasPrice": 100,
                    "msaasPrice50nos": 50
                },
                {
                    "id": 251,
                    "thumbnails": "thumbnails/1696136509489.png",
                    "filePath": "price_matching/MTL2_10.step",
                    "volume": 42562.43,
                    "size": [
                        64,
                        64,
                        12
                    ],
                    "cost": 243,
                    "cost50nos": 225,
                    "msaasPrice": 75,
                    "msaasPrice50nos": 60
                },
                {
                    "id": 252,
                    "thumbnails": "thumbnails/1696136524213.png",
                    "filePath": "price_matching/MTL3_12.step",
                    "volume": 44096.81,
                    "size": [
                        40,
                        40,
                        68.33
                    ],
                    "cost": 241,
                    "cost50nos": 223,
                    "msaasPrice": 69,
                    "msaasPrice50nos": 60
                },
                {
                    "id": 253,
                    "thumbnails": "thumbnails/1696136616960.png",
                    "filePath": "price_matching/MTL4_20.step",
                    "volume": 330501.3,
                    "size": [
                        66,
                        124.5,
                        65.97
                    ],
                    "cost": 385,
                    "cost50nos": 356,
                    "msaasPrice": 67,
                    "msaasPrice50nos": 65
                },
                {
                    "id": 254,
                    "thumbnails": "thumbnails/1696136680898.png",
                    "filePath": "price_matching/MTL5_40.step",
                    "volume": 5134.675,
                    "size": [
                        7.5,
                        35,
                        57.49
                    ],
                    "cost": 557,
                    "cost50nos": 515,
                    "msaasPrice": 79,
                    "msaasPrice50nos": 75
                },
                {
                    "id": 255,
                    "thumbnails": "thumbnails/1696136768564.png",
                    "filePath": "price_matching/MTL6_42.step",
                    "volume": 9715.796,
                    "size": [
                        74.98,
                        64,
                        6.5
                    ],
                    "cost": 432,
                    "cost50nos": 400,
                    "msaasPrice": 36,
                    "msaasPrice50nos": 30
                },
                {
                    "id": 256,
                    "thumbnails": "thumbnails/1696136783836.png",
                    "filePath": "price_matching/MTL7_250.step",
                    "volume": 6564.009,
                    "size": [
                        25,
                        31,
                        18
                    ],
                    "cost": 310,
                    "cost50nos": 287,
                    "msaasPrice": 19,
                    "msaasPrice50nos": 10
                },
                {
                    "id": 257,
                    "thumbnails": "thumbnails/1696136916397.png",
                    "filePath": "price_matching/MTL8_19.step",
                    "volume": 238764.6,
                    "size": [
                        91.65,
                        99.97,
                        40
                    ],
                    "cost": 1161,
                    "cost50nos": 1073,
                    "msaasPrice": 93,
                    "msaasPrice50nos": 70
                },
                {
                    "id": 258,
                    "thumbnails": "thumbnails/1696137005096.png",
                    "filePath": "price_matching/MTL9_554.step",
                    "volume": 629999,
                    "size": [
                        152.4,
                        76.2,
                        142.21
                    ],
                    "cost": 442,
                    "cost50nos": 408,
                    "msaasPrice": 97,
                    "msaasPrice50nos": 90
                },
                {
                    "id": 259,
                    "thumbnails": "thumbnails/1696138060142.png",
                    "filePath": "price_matching/MTL10_610.step",
                    "volume": 733141,
                    "size": [
                        220,
                        110,
                        85
                    ],
                    "cost": 1101,
                    "cost50nos": 1018,
                    "msaasPrice": 79,
                    "msaasPrice50nos": 70
                }
            ]
        };
    }


    componentDidMount() {

    }

    match = async () => {
        let temp = [...this.state.data];
        // validation
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].msaasPrice === '' || temp[i].msaasPrice50nos === '' || temp[i].msaasPrice === null || temp[i].msaasPrice50nos === null || temp[i].msaasPrice === undefined || temp[i].msaasPrice50nos === undefined) {
                alert('Please fill all the values');
                return;
            }
        }
        const { status, message, data } = await api.post(URL_PATH.msaas_match_price(this.props.match.params.id), {
            data: temp
        });

        if (status === 200) {
            console.log(status)
            // Use the history object to redirect to another page
            this.props.history.goBack();
        }

    }

    sendBack = async () => {
        let temp = [...this.state.data];
        // validation
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].msaasPrice === '' || temp[i].msaasPrice50nos === '' || temp[i].msaasPrice === null || temp[i].msaasPrice50nos === null || temp[i].msaasPrice === undefined || temp[i].msaasPrice50nos === undefined) {
                alert('Please fill all the values');
                return;
            }
        }

    }

    submitValue = async () => {
        let temp = [...this.state.data];
        // validation
        for (let i = 0; i < temp.length; i++) {
            if (temp[i].msaasPrice === '' || temp[i].msaasPrice50nos === '' || temp[i].msaasPrice === null || temp[i].msaasPrice50nos === null || temp[i].msaasPrice === undefined || temp[i].msaasPrice50nos === undefined) {
                alert('Please fill all the values');
                return;
            }
        }
       
        this.setState({ match: true });
    }

    render() {

        const { data, match } = this.state;

        return (
            <Box className="container-fluid" >
                <HeaderComponent section="customer" theme="light" />
                <TableContainer>
                    <Box sx={{
                        marginBottom: '1rem'
                    }}>
                        <h3 className='bold'>
                            Price Matching tool
                        </h3>

                        <Typography className='bold'>
                            1. Download the models by clicking on the download button
                        </Typography>
                        <Typography className='bold'>
                            2. consider AISI 1080/ AISI 1070/ AISI 1060/ AISI 1151/ AISI 1050 steel grade material for calculation the quotation
                        </Typography>

                    </Box>


                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell style={styles.borderedCell}>
                                    <Box className='bold h6'>Models</Box>
                                </TableCell>

                                <TableCell style={styles.borderedCell}>
                                    <Box className='bold h6'>Size</Box>
                                </TableCell>

                                <TableCell style={styles.borderedCell}>
                                    <Box>
                                        <div className='bold center h6'>Your quotation values<span className='h8'> (matching costs only)</span></div>
                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                height: '100%',
                                                marginTop: '1rem'
                                            }}
                                        >
                                            <div className='bold h7'>Price per unit</div>
                                            <div className='bold h7'>Price per unit for 50 nos</div>
                                        </Box>
                                    </Box>
                                </TableCell>
                                <TableCell style={styles.borderedCell}>
                                    <Box>
                                        <div className='bold center h6'>
                                            our auto-quotation values <span className='h8'> (matching costs only)</span>
                                        </div>

                                        <Box
                                            sx={{
                                                display: 'flex',
                                                flexDirection: 'row',
                                                justifyContent: 'space-between',
                                                alignItems: 'center',
                                                height: '100%',
                                                marginTop: '1rem'
                                            }}
                                        >
                                            <div className='bold h7'>Price per unit</div>
                                            <div className='bold h7'>Price per unit for 50 nos</div>
                                        </Box>

                                    </Box>


                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell style={styles.borderedCell}>
                                        <Box

                                            className='d-flex flex-row align-items-center justify-content-between'
                                        >
                                            <Box className="d-flex flex-row align-items-center">
                                                <img src={assetBaseUrl + row.thumbnails} alt="thumbnail"
                                                    className='thumbnail border rounded'
                                                    style={{
                                                        width: '100px',
                                                        height: '100px'
                                                    }}
                                                />
                                                <Box
                                                    sx={{
                                                        marginLeft: '1rem'
                                                    }}
                                                    className='bold'
                                                >
                                                    {row.filePath.split('/')[1]}
                                                </Box>

                                            </Box>


                                            <Box>
                                                <a href={assetBaseUrl + row.filePath} download>

                                                    <img src="https://cdn-icons-png.flaticon.com/512/2810/2810390.png"
                                                        alt="arrow"
                                                        className='arrow'
                                                        style={{
                                                            width: '25px',
                                                            height: '25px'
                                                        }}
                                                    />
                                                </a>
                                            </Box>
                                        </Box>


                                    </TableCell>
                                    <TableCell style={styles.borderedCell}>
                                        <Box className='bold'>size: {row.size[0]} x {row.size[1]} x {row.size[2]}</Box>
                                        <Box className='bold'>Volume: {row.volume}</Box>
                                    </TableCell>

                                    <TableCell style={styles.borderedCell}>
                                        <Box className='d-flex flex-row align-items-center justify-content-between'>

                                            <Box sx={{
                                                margin: "5px"
                                            }}>
                                                <TextField
                                                    placeholder="Amount"
                                                    variant="outlined"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                ₹
                                                            </InputAdornment>
                                                        ),
                                                    }}

                                                    value={row.msaasPrice ?? ''}

                                                    onChange={(e) => {
                                                        let temp = [...data];
                                                        temp[index].msaasPrice = e.target.value;
                                                        this.setState({ data: temp })
                                                    }}
                                                />
                                            </Box>

                                            <Box sx={{
                                                margin: "0px 5px"
                                            }}

                                            >
                                                <TextField
                                                    placeholder="Amount"
                                                    variant="outlined"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end" >
                                                                ₹
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    value={row.msaasPrice50nos ?? ''}
                                                    onChange={(e) => {
                                                        let temp = [...data];
                                                        temp[index].msaasPrice50nos = e.target.value;
                                                        this.setState({ data: temp })
                                                    }}

                                                />
                                            </Box>
                                        </Box>
                                    </TableCell>

                                    <TableCell style={styles.borderedCell}>

                                        {match && <Box className='d-flex flex-row align-items-center justify-content-between'>

                                            <Box sx={{
                                                margin: "5px"
                                            }}>
                                                <TextField
                                                    placeholder="Amount"
                                                    variant="outlined"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                ₹
                                                            </InputAdornment>
                                                        ),
                                                    }}

                                                    value={row.cost ?? ''}

                                                    aria-readonly

                                                />
                                            </Box>

                                            <Box sx={{
                                                margin: "0px 5px"
                                            }}

                                            >
                                                <TextField
                                                    placeholder="Amount"
                                                    variant="outlined"
                                                    InputProps={{
                                                        endAdornment: (
                                                            <InputAdornment position="end" >
                                                                ₹
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                    value={row.cost50nos ?? ''}
                                                    aria-readonly

                                                />
                                            </Box>
                                        </Box>}
                                    </TableCell>

                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            backgroundColor: '#f5f5f5',
                            padding: '1rem'
                        }}

                    >
                        <div class="col-md-3">

                        </div>
                        <div class="col-md-1">

                        </div>
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-5">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <Button variant="contained" color="primary"
                                                onClick={this.match}
                                            >
                                                Match this values
                                            </Button>
                                        </div>
                                        <div class="col-md-6">
                                            <Button variant="contained" color="primary"
                                                onClick={this.submitValue}
                                            >
                                                Submit Values
                                            </Button>
                                        </div>
                                    </div>
                                    
                                    
                                </div>
                                <div class="col-md-3">
                                </div>
                                <div class="col-md-4">
                                    <Button variant="contained" color="primary"
                                        onClick={this.sendBack}
                                    >
                                        Match this values
                                    </Button>
                                </div>
                            </div>
                        </div>
                       
                    </Box>

                </TableContainer>
            </Box>
        );
    }
}

export default PriceMatchingScreen;