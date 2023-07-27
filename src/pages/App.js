import React from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import * as deleteActionList from '../redux/actions/deleteAction';
// import * as searchActionList from '../redux/actions/searchAction';
import * as getActionList from '../redux/actions/getAction';
// import './crud.css';

const App = ({ dataRes }) => {
    const dispatch = useDispatch();
    const [records, setRecords] = React.useState([]);
    const [currentPage, setCurrentPage] = React.useState(1);

    const recordsPerPage = 5;
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const recordData = records.slice(firstIndex, lastIndex);
    const totalPage = Math.ceil(records.length / recordsPerPage);

    // const handleSubmit = (id) => {
    //     const confirm = window.confirm('Do you want to delete?');
    //     if (confirm) {
    //         dispatch(deleteActionList.deleteData(id));
    //         alert('Data deleted successfully');
    //         window.location.reload();
    //     }
    // }

    // const handleSearch = (e) => {
    //     const timer = setTimeout(() => {
    //         return dispatch(searchActionList.searchData(e.target.value))
    //     }, 500);
    //     return () => clearTimeout(timer);
    // }

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
        }
    }

    const nextPage = () => {
        if (currentPage !== totalPage) {
            setCurrentPage(currentPage + 1);
        }
    }

    React.useEffect(() => {
        if (dataRes.length > 0) {
            setRecords(dataRes);
        }
    }, [dataRes]);

    let shadow;
    const dragit = (e) => {
        console.log(e);
        shadow = e.target;
    }

    const dragover = (e) => {
        console.log(e);
        let children = Array.from(e.target.parentNode.parentNode.children);
        if (children.indexOf(e.target.parentNode) > children.indexOf(shadow))
            e.target.parentNode.after(shadow);
        else e.target.parentNode.before(shadow);
    }

    return (
        <div className='container mt-5 p-2' style={{ border: '1px solid' }}>
            <div>
                <input type='text' placeholder='Search...' style={{ width: '50%', marginLeft: "100px", outline: 'none', padding: '5px' }} 
                // onChange={handleSearch}
                 />
                <div style={{ float: 'right' }}>
                    <Link to='/create' className='btn btn-primary'>Add +</Link>
                </div>
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        recordData.map((data, index) => (
                            <tr key={index} draggable={true} className='item' onDragStart={(e) => dragit(e)} onDragOver={(e) => dragover(e)}>
                                <td className='details'>{data.id}</td>
                                <td className='details'>{data.name}</td>
                                <td className='details'>{data.email}</td>
                                <td>
                                    <Link to={`/update/${data.id}`} className='btn btn-sm ms-1 btn-success'>Update</Link>
                                    {/* <button onClick={() => handleSubmit(data.id)} className='btn btn-sm ms-1 btn-danger'>Delete</button> */}
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            <div style={{ display: 'flex', justifyContent: 'right' }}>
                <button style={{ margin: '5px' }} className='btn btn-secondary' onClick={prevPage} disabled={currentPage === 1 && true}>&lt; Prev</button>
                <div style={{ display: 'flex', alignItems: 'center', margin: '5px' }}>
                    <h5>{currentPage}</h5>
                </div>
                <button style={{ margin: '5px' }} className='btn btn-secondary' onClick={nextPage} disabled={currentPage === totalPage && true}>Next &gt;</button>
            </div>
        </div>
    )
};

export default App;