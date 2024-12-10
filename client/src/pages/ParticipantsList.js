import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout/Layout';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const ParticipantsList = () => {

    // Initialize the backend URL based on the environment
    const backendUrl = window.location.hostname === 'localhost' ? 
    'http://localhost:3001' : 
    'http://192.168.49.2:30002'; 

    // Access the event ID from the URL params
    const params = useParams();
    
    // State to store the fetched users
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch users for the event
    const getUsers = async () => {
        try {
            // Fetch the event users from the backend
            const { data } = await axios.get(`${backendUrl}/api/v1/event/geteventusers/${params.eid}`);
            console.log('Fetched Data:', data); // Log the fetched data to verify
            
            if (data?.success) {
                setUsers(data?.eventusers); // Set the users in state if successful
            } else {
                setError('Failed to fetch participants');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching participants');
        } finally {
            setLoading(false); // Set loading to false after the request is complete
        }
    };

    // Fetch users when the component mounts
    useEffect(() => {
        console.log('Calling getUsers...');
        getUsers();
    }, []); // Empty dependency array ensures it runs only once when the component mounts

    return (
        <Layout>
            <h3>Participants List</h3>
            <div className='border shadow'>
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                
                <table className='table'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.length > 0 ? (
                                users.map((u, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{u.name}</td>
                                        <td>{u.email}</td>
                                        <td>{u.phone}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4">No participants found</td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </Layout>
    );
}

export default ParticipantsList;
