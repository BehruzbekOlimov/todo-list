import {useState} from "react";
import {Button, Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap';


const TasksList = ({tasks, onClick, length}) => {
    const [modal, setModal] = useState(false);
    const [modalInput, setModalInput] = useState('');
    const [tempId, setTempId] = useState(null);
    const toggle = (data) => {
        if (data) {
            setModalInput(data.name)
            setTempId(data.id)
        }
        setModal(!modal)
    };
    const onSubmit = (e) => {
        e.preventDefault()
        onClick('EDIT', {name: modalInput, id: tempId})
        setModal(!modal)
    };
    return (
        <div className="TasksList">
            {
                tasks.length? <h2>{length} tasks remaining</h2>:''
            }
            <ul>
                {
                    tasks.length ?
                        tasks.map(item => (
                            <Task key={item.id} data={item} toggle={toggle} onClick={onClick} onEdit={toggle}/>
                        )) :
                        <h5>None</h5>
                }
            </ul>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Edit Task</ModalHeader>
                <ModalBody>
                    <form onSubmit={onSubmit} className='d-flex flex-column'>
                        <input type="text" value={modalInput} onChange={(e) => setModalInput(e.target.value)}
                               className="form-control"/>
                        <button className="btn btn-primary px-5 mt-3 ml-auto">Edit</button>
                    </form>
                </ModalBody>
            </Modal>
        </div>
    );
};

const Task = ({data, onClick, toggle}) => {
    return (
        <li className="Task">
            <div className="d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center">
                    <input type="checkbox" checked={data.status} onClick={() => onClick('CHANGE_STATUS', data)}/>
                    <p className={data.status ? 'checked-text name':'name'}> {data.name}</p>
                </div>
                <div className="d-flex align-items-center">
                    <button className="btn btn-warning" onClick={() => toggle(data)}>Edit</button>
                    <button className="btn btn-danger ml-2" onClick={() => onClick('DELETE', data.id)}>Delete</button>
                </div>
            </div>
        </li>
    );
};

export default TasksList;