import React, { useEffect, useState } from 'react';
import NavBarCom from './navbarcom';
import { Col, Container, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import "./dashboard.css";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import 'bootstrap/dist/css/bootstrap.min.css';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table';
import MyVerticallyCenteredModal from './show';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

function Order() {
    const [modalShow, setModalShow] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    function getUsers() {
        const db = firebase.firestore();
        db.collection('users').get()
            .then(snapshot => {
                const usersData = [];
                snapshot.forEach(doc => {
                    usersData.push({ id: doc.id, ...doc.data() });
                });
                setUsers(usersData);
            })
            .catch(error => {
                console.error('Error fetching users:', error);
            });
    }

    const deleteUser = (id) => {
        const db = firebase.firestore();
        db.collection('users').doc(id).delete()
            .then(() => {
                console.log('User successfully deleted');
                getUsers();
            })
            .catch(error => {
                console.error('Error deleting user:', error);
            });
    }

    const handleAcceptOrder = (orderId) => {
        // Handle accepting order
    };

    const handleDeleteOrder = (orderId) => {
        // Handle deleting order
    };

    const MyTable = () => (
        <div style={{ maxHeight: "350px", overflowY: "auto" }}>
            <Table striped bordered hover variant="dark">
                <thead style={{ position: "sticky", top: "0", backgroundColor: "#22f0f0" }}>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>invoice_id</th>
                        <th>Data Handling Options</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, key) =>
                        <tr className='tablerow' key={key}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.mobile}</td>
                            <td>{user.inv_id}</td>
                            <td>
                                <Button variant="primary" onClick={() => setModalShow(user.inv_id)}>More</Button>
                                <Link to={`/user/${user.id}/edit`} className='addingmargin' style={{ marginRight: "10px" }}>Edit</Link>
                                <button className='addingmarginx' onClick={() => deleteUser(user.id)}>Delete</button>
                                <button className='addingmarginy' onClick={() => handleAcceptOrder(user.inv_id)}>Accept</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
            <MyVerticallyCenteredModal show={modalShow} onHide={() => setModalShow(false)} inv_id={modalShow} />
        </div>
    );

    return (
        <>
            <NavBarCom />
            <div className="dashb-body">
                <div className="searchingbar">
                    <div className="searching">
                        <Form.Control
                            type="text"
                            placeholder="Search"
                        />
                    </div>
                    <div id="searching-btn">
                        <Button className='submitingbtn' type="submit">Search</Button>
                    </div>
                </div>
                <div className="dashing-section">
                    <Tabs variant="pills" defaultActiveKey="home" className="mb-3" fill>
                        <Tab eventKey="home" title="Pending Invoices">
                            <div className='inv-dashing'>
                                <MyTable />
                            </div>
                            <Row className='inv-content2'>
                                <Col xs={4}><Link to="user/create" id='createbutton'>Create User</Link></Col>
                                <Col xs={5}>01</Col>
                                <Col xs={1}>
                                    <Button className='printbtn'><LocalPrintshopIcon />&nbsp;&nbsp;Print</Button>
                                </Col>
                            </Row>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </>
    );
}

export default Order;
