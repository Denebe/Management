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
import TablePagination from '@material-ui/core/TablePagination';


const styles = theme => ({
    root: {
        width: "100%",
        minWidth: 1080
    },
    menu: {
        marginTop: 15,
        marginBottom: 15,
        display: 'flex',
        justifyContent: 'center'
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

    const [page, setPage] = useState(0);

    const [rowsPerPage, setRowsPerPage] = useState(5);



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

    const handleValueChange = (e) => {

        setText(e.target.value);

    }

    const searchEvent = (data) => {

        data = data.filter((c) => {
            if (c.NAME.indexOf(text) === 0) {

                return data;
            }
        });
        console.log(data);

        return data.map((info) => {
            return <Customer stateRefresh={stateRefresh} key={info.id} id={info.id} name={info.NAME} birthday={info.birthday} gender={info.gender} job={info.job} />
        });

    }

    //페이지늘리는거 만들기
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
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
                            user.customers ? searchEvent(user.customers) : ''
                        }
                    </TableBody>
                </Table>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                    component="div"
                    count={user.customers.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
            <div className={classes.menu}>
                <CustomerAdd stateRefresh={stateRefresh} />
            </div>
        </div>
    );

}

export default withStyles(styles)(App);