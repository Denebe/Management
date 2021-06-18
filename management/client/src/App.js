import React, { useEffect, useState } from 'react';
import Customer from './components/Customer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CustomerAdd from './components/CustomerAdd';
import { callApi } from './api/Api';
import Paging from './components/Paging';
import CircularProgress from '@material-ui/core/CircularProgress';
import styled from 'styled-components';


const Menu = styled.div`
        
    margin-Top: 15px;
    margin-Bottom: 15px;
    display: flex;
    justify-Content: center;
`

const styles = theme => ({
    root: {
        width: "100%",

        marginTop: theme.spacing.unit * 3,

        overflowX: "auto"

    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
        marginLeft: 18,
        marginRight: 18
    },
    progress: {

        margin: theme.spacing.unit * 2
    },
    grow: {
        flexGrow: 1,
    },
    tableHead: {
        fontSize: '1.0rem'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    title: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    }
});



function App(props) {


    const [user, setUser] = useState({
        customers: ''
    })

    const [text, setText] = useState('');


    //새로고침
    const stateRefresh = () => {
        setUser({
            customers: ''
        });

        callApi(setUser)
        setText('')

    }

    useEffect(() => {
        console.log("useEffect")
        callApi(setUser)

    }, [])

    //input Event
    const handleValueChange = (e) => {

        setText(e.target.value);

    }

    //user.customer를 data로 받아온다음, input안에 text와 비교 그리고 map함수 호출
    const searchEvent = (data) => {


        data = data.filter((c) => {
            if (c.NAME.indexOf(text) === 0) {

                return data;
            }
        });
        //console.log(data);

        return data.map((info) => {
            return (
                <Customer stateRefresh={stateRefresh} key={info.id} id={info.id} name={info.NAME} birthday={info.birthday} gender={info.gender} job={info.job} />
            )
        });

    }

    const { classes } = props;
    const cellList = ["번호", "이름", "생년월일", "성별", "직업", "설정"];

    return (
        <div className={classes.root}>


            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer">
                        <MenuIcon />
                    </IconButton>

                    <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                        고객 관리 시스템
                    </Typography>

                    <div className={classes.grow} />
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />


                        </div>
                        <InputBase
                            placeholder="검색하기"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}

                            name="text"
                            value={text}
                            onChange={handleValueChange}
                        />
                    </div>

                </Toolbar>
            </AppBar>

            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {cellList.map(c => {
                                return <TableCell className={classes.tableHead}>{c}</TableCell>
                            })}
                        </TableRow>
                    </TableHead>


                    <TableBody>

                        {
                            user.customers ? searchEvent(user.customers) :

                                <TableCell colSpan="6" align="center">
                                    <CircularProgress className={classes.progress} />
                                </TableCell>
                        }
                    </TableBody>
                </Table>

                <Paging />

            </Paper>
            <Menu>
                <CustomerAdd stateRefresh={stateRefresh} />
            </Menu>
        </div>
    );

}

export default withStyles(styles)(App);