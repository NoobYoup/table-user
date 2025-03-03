import { useEffect, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

import { putUpdateUser } from '@/services/UserService';
import { toast } from 'react-toastify';

function ModalEditUser(props) {
    const { show, handleClose, dataUserEdit, userId, handleEditUserFromModal } = props;

    const [name, setName] = useState('');
    const [job, setJob] = useState('');

    const handleEditUser = async () => {
        let res = await putUpdateUser(userId, name, job);
        if (res && res.updatedAt) {
            //success
            handleEditUserFromModal({ first_name: name, id: dataUserEdit.id });
            handleClose();
            toast.success('Update user succeed');
        } else {
        }
    };

    useEffect(() => {
        if (show) {
            setName(dataUserEdit.first_name);
        }
    }, [dataUserEdit]);

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Edit a user</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="body-add-new">
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Job</label>
                        <input
                            type="text"
                            className="form-control"
                            value={job}
                            onChange={(e) => setJob(e.target.value)}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleEditUser}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditUser;
