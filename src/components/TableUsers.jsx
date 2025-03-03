import { useEffect, useState } from 'react';
import _ from 'lodash';

import Table from 'react-bootstrap/Table';
import ReactPaginate from 'react-paginate';

import { fetchAllUser } from '@/services/UserService';
import ModalAddNew from '@/components/ModalAddNew';
import ModalEditUser from '@/components/ModalEditUser';
import ModalConfirm from '@/components/ModalConfirm';
import '@/components/TableUser.scss';

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

    const handleClose = () => {
        setIsShowModalAddNew(false);
        setIsShowModalEditUser(false);
        setIsShowModalDelete(false);
    };

    const handleUpdateTable = (user) => {
        setListUsers([user, ...listUsers]);
    };

    const handleEditUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        let index = listUsers.findIndex((item) => item.id === user.id);
        cloneListUsers[index].first_name = user.first_name;
        setListUsers(cloneListUsers);
    };

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

    const handlePageClick = (event) => {
        getUsers(event.selected + 1);
    };

    const handleEditUser = (user) => {
        setDataUserEdit(user);
        setIsShowModalEditUser(true);
    };

    const handleDeleteUser = (user) => {
        setIsShowModalDelete(true);
        setDataUserDelete(user);
        console.log(user);
    };

    const handleDeleteUserFromModal = (user) => {
        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
        setListUsers(cloneListUsers);
    };

    const handleSort = (sortBy, sortField) => {
        setSortBy(sortBy);
        setSortField(sortField);

        let cloneListUsers = _.cloneDeep(listUsers);
        cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
        setListUsers(cloneListUsers);
    };

    return (
        <>
            <div className="app-container my-3 d-flex justify-content-between">
                <p>List Users:</p>
                <button className="btn btn-success" onClick={() => setIsShowModalAddNew(true)}>
                    Add new user
                </button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="sort-header d-flex justify-content-between">
                            <span>ID</span>
                            <span>
                                <i className="fa-solid fa-arrow-down-long" onClick={() => handleSort('desc', 'id')}></i>
                                <i className="fa-solid fa-arrow-up-long" onClick={() => handleSort('asc', 'id')}></i>
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
                                        <button className="btn btn-warning me-2" onClick={() => handleEditUser(item)}>
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
