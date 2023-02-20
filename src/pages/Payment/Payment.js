import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Payment.css";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import Colors from "../../utils/Colors";

const Payment = () => {

    const { id } = useParams()

    const [data, setData] = useState([])

    const fetchData = async () => {
        try {
            const response = await fetch(`https://devapi.pepcorns.com/api/test/getPayment/${id}`)
            const json = await response.json()
            setData([...json.response])
        } catch (e) {
            console.log(e)
        }
    }

    const keyGenerator = () =>
        '_' + Math.random().toString(36).substr(2, 9)

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className="container">
            <Typography style={{marginBottom: 30}}>
                Payment details
            </Typography>
            <TableContainer component={Paper} style={{ width: '100%' }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ fontWeight: '700' }}>User Id</TableCell>
                            <TableCell style={{ fontWeight: '700' }}>Name</TableCell>
                            <TableCell style={{ fontWeight: '700' }}>Age</TableCell>
                            <TableCell style={{ fontWeight: '700' }}>Pay Id</TableCell>
                            <TableCell style={{ fontWeight: '700' }}>Pay Ref</TableCell>
                            <TableCell style={{ fontWeight: '700' }}>Amount</TableCell>
                            <TableCell style={{ fontWeight: '700' }}>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item) => (
                            <TableRow
                                key={keyGenerator()}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell>
                                    {item.user_id}
                                </TableCell>
                                <TableCell>
                                    {item.name}
                                </TableCell>
                                <TableCell>
                                    {item.age}
                                </TableCell>
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

export default Payment