import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import {Link} from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';

const ContactList = () => {
    //State define in functional component
    const [contacts, setContacts] = useState([]); // update
    const [confirmModal, setConfirmModal] = useState({showOrNot: false});
    const [okModal, setOkModal] = useState({showOrNot: false});

    //React hook that only run one, as the dependencies is empty
    useEffect(() => {
        const unsub = db.collection('contact').orderBy("lastUpdated", "desc").onSnapshot(snapshot => {
            const allContacts = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setContacts(allContacts);
        });

        return () => {
            //clean up
            unsub();
        };

    }, []);

    //function: handler for delete contact in database, once user confirmed the action
    const onConfirmDelete = (id) => {
        //when confirm button in the confirm modal is click
        
        //hide the confirm modal
        setConfirmModal({
            showOrNot: false
        })

        //Delete action in firebase
        db.collection("contact").doc(id).delete().then(function() {
            //success show info in modal, promise return
            setOkModal({
                showOrNot: true,
                title: "Successfully delete the contact",
                desc: "Successfully delete the contact. You may see the changes instantly."
            })

        }).catch(function(error) {
            //Error
            alert("Some Error Occur when deleting contact. Please Try Again Later!.")
        });
    };

    const onCancelDelete = () => {
        //when cancel button in the confirm modal is click
        setConfirmModal({
            showOrNot: false
        })// hide the modal
    };

    //function: show confirmation modal for delete action
    const confirmDelete = (docId) => {
        setConfirmModal({
            showOrNot: true,
            title: "Confirm Delete Contact?",
            desc: "Click Yes to permenantly delete the contact. This action is could not be reverse.",
            targetId: docId
        })
    }

    return (
        <div>       
            <div className="text-center">
                <Link to="/new"><button type="button" className="w-50 m-4 btn btn-success clearfix">Create New Contact</button></Link><br />
                <table className="table text-left">
                    <thead>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">PhoneNumber</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map(contact => (
                            <tr key={contact.id}>
                                <th scope="row">{contact.id}</th>
                                <td>{contact.name}</td>
                                <td>{contact.phone}</td>
                                <td>
                                    <Link to={`/${contact.id}`}><button type="button" className="btn btn-primary mr-2">Edit</button></Link>
                                    <button type="button" onClick={confirmDelete.bind(this, contact.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

            </div>
            
            <SweetAlert show={okModal["showOrNot"]} success title={okModal["title"] || ""} onConfirm={() => setOkModal({showOrNot: false})} >
                    {okModal["desc"] || ""}
            </SweetAlert>
            <SweetAlert show={confirmModal["showOrNot"]} warning showCancel confirmBtnText="Yes, delete it!" confirmBtnBsStyle="danger" title={confirmModal["title"] || ""} onConfirm={onConfirmDelete.bind(this, confirmModal["targetId"])} onCancel={onCancelDelete}>
                {confirmModal["desc"] || ""}
            </SweetAlert>
        </div>
        
    );

}

export default ContactList;