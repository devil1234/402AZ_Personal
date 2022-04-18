import React, {Component, /*Fragment*/} from 'react';

export default class ContactMain extends Component {
    render(){
        return(
            <div className='container'>
                <section className='section'>
                <h1 className='title'>Contact Us</h1>
                <p>
                <p><a href="mailto:ursus@cu.coventry.ac.uk">Stefan Robert Ursu</a></p>
                <p><a href="mailto:watork@cu.coventry.ac.uk">Krystian Wator</a></p>
                <p><a href="mailto:sotillos2@cu.coventry.ac.uk">Francisco Javier Sotillos Fernandez</a></p>
                </p>
                </section>
            </div>
        );
    }
}