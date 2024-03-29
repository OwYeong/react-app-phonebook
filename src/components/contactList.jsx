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
                <table>
                    <thead>
                        <tr>
                            <th>Type</th>
                            <th>Link</th>
                            <th>Expectation</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>App Link</td>
                            <td><a href="https://payment.tngdigital.com.my/sc/bDLnsUR1ws">https://payment.tngdigital.com.my/sc/bDLnsUR1ws</a>
                            </td>
                            <td>Open in app, native static payment screen.</td>
                        </tr>
                        <tr>
                            <td>Deep Link</td>
                            <td><a href="tngdwallet://client/dl/paymentlink/bDLnsUR1ws">tngdwallet://client/dl/paymentlink/bDLnsUR1ws</a>
                            </td>
                            <td>Open in app if installed, native static payment screen.</td>
                        </tr>
                        <tr>
                            <td>One Link Wrap Deep Link</td>
                            <td><a href="https://onelink.tngd.my/8mmV/ag6xnwga">https://onelink.tngd.my/8mmV/ag6xnwga</a>
                            </td>
                            <td>Open in app if installed, native static payment screen.</td>
                        </tr>
                        <tr>
                            <td>One Link Wrap App Link</td>
                            <td><a href="https://onelink.tngd.my/8mmV/e57cerer">https://onelink.tngd.my/8mmV/e57cerer</a>
                            </td>
                            <td>Open in app if installed, native static payment screen.</td>
                        </tr>
                    </tbody>
                </table>
                <p className="small text-danger font-weight-lighter	">Note: If browsing on small mobile screen, table could be scroll horizontally. Action button (Edit, Delete) located at the last column of the table</p>
                <Link to={"/list/new"}><button type="button" className="w-50 m-4 btn btn-success clearfix">Create New Contact</button></Link><br />
                <div className="table-responsive">
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
                                        <Link to={`/list/${contact.id}`}><button type="button" className="btn btn-primary mb-1">Edit</button></Link> {'\u00A0'}
                                        <button type="button" onClick={confirmDelete.bind(this, contact.id)} className="btn btn-danger mb-1">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

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
