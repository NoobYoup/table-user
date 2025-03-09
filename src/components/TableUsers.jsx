import { useEffect, useState } from 'react';
import _, { debounce, get } from 'lodash';
import { CSVLink, CSVDownload } from 'react-csv';
import ReactPaginate from 'react-paginate';
import Papa from 'papaparse';

import Table from 'react-bootstrap/Table';

import { fetchAllUser } from '@/services/UserService';
import ModalAddNew from '@/components/ModalAddNew';
import ModalEditUser from '@/components/ModalEditUser';
import ModalConfirm from '@/components/ModalConfirm';

import '@/components/TableUser.scss';
import { toast } from 'react-toastify';

function TableUsers(props) {
    const [listUsers, setListUsers] = useState([]);
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

    const [isShowModalEditUser, setIsShowModalEditUser] = useState(false);
    const [dataUserEdit, setDataUserEdit] = useState({});

    const [isShowModalDelete, setIsShowModalDelete] = useState(false);
    const [dataUserDelete, setDataUserDelete] = useState({});

    const [sortBy, setSortBy] = useState('asc');
    const [sortField, setSortField] = useState('id');

    const [keyword, setKeyword] = useState('');
    const [dataExport, setDataExport] = useState([]);

    useEffect(() => {
        // call API
        getUsers(1);
    }, []);

    async function getUsers(page) {
        let res = await fetchAllUser(page);

        if (res && res.data) {
            setTotalUsers(res.total);
            setListUsers(res.data);
            setTotalPages(res.total_pages);
        }
    }

    // xử lý đóng modal
    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEditUser(false);
        setIsShowModalDelete(false);
    };

    // xử lý update table
    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    };

    // xử lý sửa modal
    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex((item) => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    };

    // xử lý phân trang
    const handlePageClick = (event) => {
        getUsers(event.selected + 1);
    };

    // xử lý bật modal edit
    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEditUser(true);
    };

    // xử lý bật modal delete
    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
    };

    // xử lý xóa user
    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
        setListUsers(cloneListUsers);
    };

    // xử lý sort
    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);
    };

    // xử lý search
    const handleSearch = debounce((term) => {
        if (term) {
            let cloneListUsers = _.cloneDeep(listUsers);
            cloneListUsers = cloneListUsers.filter((item) => item.email.includes(term));
            setListUsers(cloneListUsers);
        } else {
            getUsers(1);
        }
    }, 300);

    const onChange = (event) => {
        setKeyword(event.target.value);
        handleSearch(event.target.value);
    };

    const getUsersExport = (event, done) => {
        let result = [];
        if (listUsers && listUsers.length > 0) {
            result.push(['ID', 'Email', 'First name', 'Last name']);
            listUsers.map((item, index) => {
                let arr = [];
                arr[0] = item.id;
                arr[1] = item.email;
                arr[2] = item.first_name;
                arr[3] = item.last_name;
                result.push(arr);
            });
            setDataExport(result);
            done();
        }
    };

    const handleImportCSV = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            let file = event.target.files[0];

            if (file.type !== 'text/csv') {
                toast.error('Only accept CSV file...');
                return;
            }

            Papa.parse(file, {
                // header: true,
                complete: function (results) {
                    let rawCSV = results.data;
                    if (rawCSV.length > 0) {
                        if (rawCSV[0] && rawCSV[0].length === 3) {
                            if (
                                rawCSV[0][0] !== 'email' ||
                                rawCSV[0][1] !== 'first_name' ||
                                rawCSV[0][2] !== 'last_name'
                            ) {
                                toast.error('Wrong format Header...');
                            } else {
                                let result = [];

                                rawCSV.map((item, index) => {
                                    if (index > 0 && item.length === 3) {
                                        let obj = {};
                                        obj.email = item[0];
                                        obj.first_name = item[1];
                                        obj.last_name = item[2];
                                        result.push(obj);
                                    }
                                });
                                setListUsers(result);
                            }
                        } else {
                            toast.error('Wrong format CSV file...');
                        }
                    } else {
                        toast.error('Not found data...');
                    }
                },
            });
        }
    };

    return (
        <>
            <div className="app-container col-12 my-3 d-sm-flex justify-content-between">
                <h5>List Users:</h5>
                <div>
                    <label htmlFor="import" className="btn btn-info">
                        Import
                    </label>
                    <input type="file" id="import" hidden onChange={(event) => handleImportCSV(event)} />

                    <CSVLink
                        data={dataExport}
                        filename={'my-file.csv'}
                        className="btn btn-primary mx-2"
                        target="_blank"
                        asyncOnClick={true}
                        onClick={getUsersExport}
                    >
                        Export
                    </CSVLink>

                    <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
                        Add new user
                    </button>
                </div>
            </div>

            <div className="my-3">
                <input
                    className="form-control"
                    placeholder="Search user by email..."
                    value={keyword}
                    onChange={onChange}
                />
            </div>

            <div className="customize-table">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th className="sort-header d-flex justify-content-between">
                                <span>ID</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort('desc', 'id')}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'id')}
                                    ></i>
                                </span>
                            </th>
                            <th className="sort-header">Email</th>
                            <th className="sort-header d-flex justify-content-between">
                                <span>First Name</span>
                                <span>
                                    <i
                                        className="fa-solid fa-arrow-down-long"
                                        onClick={() => handleSort('desc', 'first_name')}
                                    ></i>
                                    <i
                                        className="fa-solid fa-arrow-up-long"
                                        onClick={() => handleSort('asc', 'first_name')}
                                    ></i>
                                </span>
                            </th>
                            <th className="sort-header">Last Name</th>
                            <th className="sort-header">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listUsers &&
                            listUsers.length > 0 &&
                            listUsers.map((item, index) => {
                                return (
                                    <tr key={`users-${index}`}>
                                        <td>{item.id}</td>
                                        <td>{item.email}</td>
                                        <td>{item.first_name}</td>
                                        <td>{item.last_name}</td>
                                        <td>
                                            <button
                                                className="btn btn-warning me-2"
                                                onClick={() => handleEditUser(item)}
                                            >
                                                Edit
                                            </button>
                                            <button className="btn btn-danger" onClick={() => handleDeleteUser(item)}>
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </Table>
            </div>

            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={5}
                pageCount={totalPages}
                previousLabel="< previous"
                renderOnZeroPageCount={null}
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
            />

            <ModalAddNew show={isShowModalAddNew} handleClose={handleClose} handleUpdateTable={handleUpdateTable} />

            <ModalEditUser
                show={isShowModalEditUser}
                handleClose={handleClose}
                dataUserEdit={dataUserEdit}
                handleEditUserFromModal={handleEditUserFromModal}
            />

            <ModalConfirm
                show={isShowModalDelete}
                handleClose={handleClose}
                dataUserDelete={dataUserDelete}
                handleDeleteUserFromModal={handleDeleteUserFromModal}
            />
        </>
    );
}

export default TableUsers;
