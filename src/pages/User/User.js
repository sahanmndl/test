import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import "./User.css";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TableSortLabel,
    Typography,
} from '@mui/material';
import Colors from "../../utils/Colors";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

const User = () => {

    const { id } = useParams()

    const [data, setData] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [orderBy, setOrderBy] = useState(null)
    const [order, setOrder] = useState('asc')

    const anchorRef = useRef(null)
    const [open, setOpen] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(0)
    var options = ["All", "Active", "Failed"]

    const fetchData = async () => {
        try {
            const response = await fetch(`https://devapi.pepcorns.com/api/test/getUserById/${id}`)
            const json = await response.json()
            setData([...json.response])
            setFilteredData([...json.response])
        } catch (e) {
            console.log(e)
        }
    }

    const handleSort = (property) => {
        const isDesc = orderBy === property && order === 'desc'
        setOrder(isDesc ? 'asc' : 'desc')
        setOrderBy(property)
    }

    const sortedData = orderBy
        ? [...filteredData].sort((a, b) => {
            const aValue = a[orderBy]
            const bValue = b[orderBy]
            if (aValue < bValue) return order === 'asc' ? -1 : 1
            if (aValue > bValue) return order === 'asc' ? 1 : -1
            return 0
        }) : filteredData

    const keyGenerator = () =>
        '_' + Math.random().toString(36).substr(2, 9)

    const handleMenuItemClick = (event, index, option) => {
        setSelectedIndex(index)
        setOpen(false)
        if (option === "All") {
            setFilteredData(data)
        } else if (option === "Active") {
            setFilteredData(data.filter((i) => {
                return i.status === 1
            }))
        } else if (option === "Failed") {
            setFilteredData(data.filter((i) => {
                return i.status === 0
            }))
        }
    }

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen)
    }

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return
        }
        setOpen(false);
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container">
            <Typography style={{marginBottom: 30}}>
                User Payment details
            </Typography>
            <TableContainer component={Paper} style={{ width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: '700' }}>Pay Id</TableCell>
                            <TableCell style={{ fontWeight: '700' }}>Pay Ref</TableCell>
                            <TableCell style={{ fontWeight: '700' }}>
                                <TableSortLabel 
                                    active={orderBy === 'amount'} 
                                    direction={order} 
                                    onClick={() => handleSort('amount')}
                                >
                                    Amount
                                </TableSortLabel>
                            </TableCell>
                            <TableCell style={{ fontWeight: '700' }}>
                                Status
                                <ButtonGroup variant="" color='info' ref={anchorRef} aria-label="split button">
                                    <Button
                                        size="small"
                                        aria-controls={open ? 'split-button-menu' : undefined}
                                        aria-expanded={open ? 'true' : undefined}
                                        aria-label="select merge strategy"
                                        aria-haspopup="menu"
                                        onClick={handleToggle}
                                    >
                                        <ArrowDropDownIcon />
                                    </Button>
                                </ButtonGroup>
                                <Popper
                                    sx={{ zIndex: 1 }}
                                    open={open}
                                    anchorEl={anchorRef.current}
                                    role={undefined}
                                    transition
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin:
                                                    placement === 'bottom' ? 'center top' : 'center bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleClose}>
                                                    <MenuList id="split-button-menu" autoFocusItem>
                                                        {options.map((option, index) => (
                                                            <MenuItem
                                                                key={option}
                                                                value={option}
                                                                selected={index === selectedIndex}
                                                                onClick={(event) => handleMenuItemClick(event, index, option)}
                                                            >
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedData.map((item) => (
                            <TableRow
                                key={keyGenerator()}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    {item.pay_id}
                                </TableCell>
                                <TableCell>
                                    {item.pay_ref}
                                </TableCell>
                                <TableCell>
                                    {item.amount}
                                </TableCell>
                                <TableCell style={{color: item.status === 1 ? Colors.GREEN : Colors.RED}}>
                                    {item.status === 1 ? 'Active' : 'Failed'}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default User