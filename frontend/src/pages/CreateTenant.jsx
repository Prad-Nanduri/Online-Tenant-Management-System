import React, { useState } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const createTenant = () => {
    const [name, setName] = useState('');
    const [phonenumber, setNum] = useState('');
    const [email, setEmail] = useState('');
    const [dateofCin, setdateofCin] = useState('');
    const [dateofCout, setdateofCout] = useState('');
    const [aptNum, setaptNum] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleSaveTenant = () => {
        const data = {
            name,
            phonenumber,
            email,
            dateofCin,
            dateofCout,
            aptNum,
        };
        setLoading(true);
        axios
        .post('http://localhost:5555/tenants', data)
        .then(() => {
            setLoading(false);
            navigate('/');
        })
        .catch((error) => {
            setLoading(false);
            alert('An error occured. Please check Console');
            console.log(error);
        });
    };

    return (
        <div className='p-4'>
            <BackButton />
            <h1 className='text-3xl my-4'>Add Tenant</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-x1 w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Name</label>
                    <input
                    type='text'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className='border-2 border-gray-500 px-4 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>PhoneNumber</label>
                    <input
                    type='number'
                    value={phonenumber}
                    onChange={(e) => setNum(e.target.value)}
                    className='border-2 border-gray-500 px-4 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Email</label>
                    <input
                    type='text'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='border-2 border-gray-500 px-4 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>DateofCin</label>
                    <input
                    type='date'
                    value={dateofCin}
                    onChange={(e) => setdateofCin(e.target.value)}
                    className='border-2 border-gray-500 px-4 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>DateofCout</label>
                    <input
                    type='date'
                    value={dateofCout}
                    onChange={(e) => setdateofCout(e.target.value)}
                    className='border-2 border-gray-500 px-4 w-full'
                    />
                </div>
                <div className='my-4'>
                    <label className='text-xl mr-4 text-gray-500'>Apt Number</label>
                    <input
                    type='number'
                    value={aptNum}
                    onChange={(e) => setaptNum(e.target.value)}
                    className='border-2 border-gray-500 px-4 w-full'
                    />
                </div>
                <button className='p-2 bg-sky-300 m-8' onClick={handleSaveTenant}>
                    Save
                </button>
            </div>
        </div>
    )
}

export default createTenant;