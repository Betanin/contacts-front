import reducer from './reducer';
import constants from './constants';
require('chai').should();

describe('contacts reducer', () => {

    it('load items', () => {

        const previousState = Object.freeze({});
        const action = {
            type: constants.LOAD_ALL,
            payload: {
                items: [
                    {
                        "_id": "5aca82d0e637561d2bf1c30c",
                        "name": "John Doe",
                        "email": "mail@mail.com",
                        "company": "Doe SA",
                        "phone": "555-55555",
                        "userId": "5aca828ce637561d2bf1c30b",
                        "createdAt": "2018-04-08T21:00:00.440Z",
                        "updatedAt": "2018-04-08T21:00:00.440Z",
                        "__v": 0
                    }
                ]
            }
        };

        reducer(previousState, action).should.be.an('object')
            .and.deep.include({
                items: [
                    {
                        id: "5aca82d0e637561d2bf1c30c",
                        name: "John Doe",
                        email: "mail@mail.com",
                        company: "Doe SA",
                        phone: "555-55555"
                    }
                ],
                filteredItems: [
                    {
                        id: "5aca82d0e637561d2bf1c30c",
                        name: "John Doe",
                        email: "mail@mail.com",
                        company: "Doe SA",
                        phone: "555-55555"
                    }
                ],
                filter: ''
            });

    });

    it('applies filter', () => {

        const previousState = Object.freeze({
            items: [
                {
                    id: "5aca82d0e637561d2bf1c30c",
                    name: "John Doe",
                    email: "mail@mail.com",
                    company: "Doe SA",
                    phone: "555-55555"
                },
                {
                    id: "5aca82d0e637561d2bf1c30d",
                    name: "Mary Doe",
                    email: "mail@mail.com",
                    company: "Doe SA",
                    phone: "555-55555"
                }
            ]
        });

        const action = {
            type: constants.APPLY_FILTER,
            payload: {
                filter: 'Mary',
            }
        };
        
        reducer(previousState, action).should.be.an('object')
            .and.deep.include({
                items: [
                    {
                        id: "5aca82d0e637561d2bf1c30c",
                        name: "John Doe",
                        email: "mail@mail.com",
                        company: "Doe SA",
                        phone: "555-55555"
                    },
                    {
                        id: "5aca82d0e637561d2bf1c30d",
                        name: "Mary Doe",
                        email: "mail@mail.com",
                        company: "Doe SA",
                        phone: "555-55555"
                    }
                ],
                filteredItems: [
                    {
                        id: "5aca82d0e637561d2bf1c30d",
                        name: "Mary Doe",
                        email: "mail@mail.com",
                        company: "Doe SA",
                        phone: "555-55555"
                    }
                ]
            });

    });   
    
    it('load empty items list', () => {

        const action = {
            type: constants.LOAD_ALL,
            payload: {}
        };

        reducer(undefined, action).should.be.an('object')
            .and.deep.include({
                items: [],
                filteredItems: []
            });

    });
    
    it('keeps the state at non managed actions', () => {

        const previousState = Object.freeze({});
        const action = {
            type: 'ANY'
        };

        reducer(previousState, action).should.be.an('object')
            .and.deep.include(previousState);

    });
    
});