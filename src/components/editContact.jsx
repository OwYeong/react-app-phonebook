import React, { useState, useEffect } from 'react';
import { db, firebaseWithoutParenthesis } from '../firebase';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';


const EditContact = ({ match }) => {
    //State define in functional component
    const [form, setForm] = useState({
        fields: {},
        errors: {}
    });
    const [okModal, setOkModal] = useState({ showOrNot: false });
    const [errorModal, setErrorModal] = useState({ showOrNot: false });

    const docId = match.params.id;
    //This editContact component is reusable for create and update contact.
    var isNewContact = (docId === "new") ? true : false;//Indicate if create or update by the url params

    //function: fetch data with docId for existing contact editing
    const fetchDataFromFirestore = () => {
        if (isNewContact === false) {
            //firestore get doc
            db.collection('contact').doc(docId).get()
                .then(doc => {
                    if (doc.exists) {
                         //if valid, update the data in form state
                        const contactData = { id: doc.id, ...doc.data() }
                        setForm({
                            ...form,
                            fields: contactData
                        });


                    } else {
                        //if invalid
                        if (!isNewContact) {
                            //If doc ID provided does not exist in fire store, redirect user to new contact page
                            window.location.href = "/new";
                        }
                    }
                    
                })
                .catch(() => {
                   //Error
                });
        }

    }
  
    //function: Validate input in the form, show error if necassary.
    const validateInput = () => {
        let fields = form.fields;
        let newErrors = {};
        let isValid = true;

        //Name
        if (!fields["name"]) {
            isValid = false;
            newErrors["name"] = "Name Cannot be empty";
        }

        if (!!fields["name"]) {
            if(fields["name"].length > 50) {
                isValid = false;
                newErrors["name"] = "Maximum character allow for name is 50";
            }

            if (!fields["name"].match(/^[a-zA-Z ()]+$/)) {
                isValid = false;
                newErrors["name"] = "Name can only letters and symbol( -, +, (, ) )";
            }
        }

        //phone
        if (!fields["phone"]) {
            isValid = false;
            newErrors["phone"] = "Phone Cannot be empty";
        }

        if (!!fields["phone"]) {
            if(fields["phone"].length > 15) {
                isValid = false;
                newErrors["phone"] = "Maximum character allow for phone is 15";
            }

            if (!fields["phone"].match(/^[0-9\-+]+$/)) {
                isValid = false;
                newErrors["phone"] = "Only number, + or -";
            }
        }
        
        //update the form state with error message to show changes
        setForm({
            ...form,
            errors: newErrors
        });
        
        return isValid;
    }

    //function: Handle change for field in the form, this function is called everytime value change
    const handleChange = (field, e) => {
        let mFields = form.fields;
        mFields[field] = e.target.value;
        //update the form state to show changes
        setForm({
            ...form,
            fields: mFields
        });
        validateInput();

    }

    const handleSubmit = () => {

        if (validateInput()) {
            if (!isNewContact) {
                //Existing contact in database
                db.collection("contact").doc(docId).set({
                        ...form.fields,
                        lastUpdated: firebaseWithoutParenthesis.FieldValue.serverTimestamp()
                    }).then(function () {
                        setOkModal({
                            showOrNot: true,
                            title: "Successfully Updated the contact",
                            desc: "Successfully Updated the contact into the database. You may see the changes instantly."
                        })
                    })
                    .catch(function (error) {
                        setErrorModal({
                            showOrNot: true,
                            title: "Error!",
                            desc: "Some error occur please try again later."
                        });
                    });
            } else {
                //create new contact in database
                db.collection("contact").add({
                        ...form.fields,
                        lastUpdated: firebaseWithoutParenthesis.FieldValue.serverTimestamp()
                    }).then(function () {
                        setOkModal({
                            showOrNot: true,
                            title: "Successfully Created the contact",
                            desc: "Successfully Created the contact into the database. You may see the changes instantly."
                        });
                    })
                    .catch(function (error) {
                        setErrorModal({
                            showOrNot: true,
                            title: "Error!",
                            desc: "Some error occur please try again later."
                        });
                    });
            }

        } else {
            setErrorModal({
                showOrNot: true,
                title: "Error!",
                desc: "Form contains error. Please amend it based on the instruction provided."
            });
        }

    }

    //React hook that only run one, as the dependencies is empty
    useEffect(() => {
        fetchDataFromFirestore();
    }, []);



    return (
        <div>
            <div className="container text-center">
                <h2 className="my-3" >{isNewContact ? "New Contact" : "Edit Contact"}</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="id">Id</label>
                        <input disabled type="text" className="form-control" id="exampleFormControlInput1" placeholder="id" value={form["fields"]["id"] || ""} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Contact Name</label>
                        <input className="form-control" placeholder="Name" type="text" onChange={handleChange.bind(this, "name")} value={form["fields"]["name"] || ""} />
                        <div className="invalid-feedback d-block text-left">{form["errors"]["name"] || ""}</div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="exampleFormControlInput1">Contact Phone</label>
                        <input type="text" className="form-control" onChange={handleChange.bind(this, "phone")} placeholder="xxx-xxxxxxx" value={form["fields"]["phone"] || ""} />
                        <div className="invalid-feedback d-block text-left">{form["errors"]["phone"] || ""}</div>
                    </div>
                </form>
                <button onClick={handleSubmit} className="btn btn-success mr-2">{isNewContact ? "Create New Contact" : "Edit Contact"}</button>
                <Link to="/"><button className="btn btn-secondary">Cancel</button></Link>
            </div>
            <SweetAlert show={okModal["showOrNot"]} success title={okModal["title"] || ""} onConfirm={() => { window.location.href = "/" }} >
                {okModal["desc"] || ""}
            </SweetAlert>
            <SweetAlert show={errorModal["showOrNot"]} danger title={errorModal["title"] || ""} onConfirm={()=>{setErrorModal({ showOrNot: false })}}>
                {errorModal["desc"] || ""}
            </SweetAlert>
        </div>
    );

}

export default EditContact;