import React, { useReducer } from 'react';
import  {v4 as uuid} from 'uuid';
import ContactContext from './contactContext';
import contactReducer from './contactReducer';
import {
    ADD_CONTACT,
    DELETE_CONTACT,
    SET_CURRENT,
    CLEAR_CONTACT,
    UPDATE_CONTACT,
    FILTER_CONTACTS,
    CLEAR_FILTER,
    CLEAR_CURRENT
} from '../types'


const ContactState = props => {
    const initialState = {
        contacts: [
            {
                id:1,
                name: 'Andy Wilman',
                email: 'andy.wilman@gt.co.uk',
                phone: '111-111-1111',
                type: 'personal'
            },
            {
                id:2,
                name: 'Jeremy Clarkson',
                email: 'j.clarkson@gt.co.uk',
                phone: '431-111-4751',
                type: 'personal'
            },
            {
                id:3,
                name: 'Richard Hammond',
                email: 'r.hammond@gt.co.uk',
                phone: '662-111-7576',
                type: 'personal'
            },
            {
                id:4,
                name: 'James May',
                email: 'j.may@gt.co.uk',
                phone: '773-111-5423',
                type: 'professional'
            }
        ],
        current: null,
        filtered: null
    };
    const [state, disptach] = useReducer(contactReducer, initialState);

    // add contact
    const addContact = (contact) =>{
        contact.id = uuid();
        disptach({ type: ADD_CONTACT, payload: contact});
    }

    // delete contact
    const deleteContact = id => {
        disptach({ type: DELETE_CONTACT, payload: id});
    }

    // set current contact
    const setCurrent = contact => {
        disptach({ type: SET_CURRENT, payload: contact});
    }

    // clear current contact
    const clearCurrent = contact => {
        disptach({ type: CLEAR_CURRENT});
    }

    // update contact
    const updateContact = contact => {
        disptach({ type: UPDATE_CONTACT, payload: contact});
    }

    // filter contacts
    const filterContacts = text => {
        disptach({ type: FILTER_CONTACTS, payload: text});
    }

    // clear filter
    const clearFilter = () => {
        disptach({ type: CLEAR_FILTER});
    }

    return (
        <ContactContext.Provider value={{
            contacts: state.contacts,
            current: state.current,
            filtered: state.filtered,
            addContact,
            deleteContact,
            setCurrent,
            clearCurrent,
            updateContact,
            filterContacts,
            clearFilter
        }}>
            {props.children}
        </ContactContext.Provider>
    )
}


export default ContactState