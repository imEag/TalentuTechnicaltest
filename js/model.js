'use strict';

export { Model };

class Model {
    constructor() {
        this.controller = '';

        this.api_url = 'https://reqres.in/api/users?page=1';
        this.fetch_config = {
            // Config for the petition for the API
            "method": "GET",
            "headers": {}
        }

        this.api_response = '';
    }

    set_controller(controller) {
        this.controller = controller;
    }

    set_api_url(api_url) {
        this.api_url = api_url;
    }

    get_api_url() {
        return this.api_url;
    }

    async fetchApiData(search, fetch_config) {
        //this method does the fetch from the API, First parameter is the API url,
        //second parameter is the configuration object with the method and header

        await fetch(search, fetch_config)
            .then(response => response.json())
            .then(response => {
                this.api_response = response;
            })
            .catch(err => {
                console.log('An error ocurred: ' + err);
            });
    }

    async getData() {
        //return data element from localStorage

        // checks if there is an 'data' object in local storage, if not, fetches it from API.
        if (!localStorage.getItem('data')) {
            await this.fetchApiData(this.api_url);
            localStorage.setItem('data', JSON.stringify(this.api_response.data));
        }

        return localStorage.getItem('data');
    }

    setData(personData) {
        //saves an object containing id, name, age and email to localstorage

        //if argument is not an object method return false.
        if (typeof personData !== 'object') return false;

        // if any field is empty it will return false.
        if (personData.email === '' || personData.first_name === '' || personData.last_name === '' || personData.birthday === '') return false;

        // if given date is grater than today, return false
        if (new Date(personData.birthday) > new Date()) return false;

        // from birthday to age
        personData.age = this.date_to_age(personData.birthday);

        //generating id


        // if data element does not exists in local storage it will create it.
        if (!localStorage.getItem('data')) {
            localStorage.setItem('data', JSON.stringify([personData]));
        } else {
            //if data element does exists, it will add the object to the end.
            let data = JSON.parse(localStorage.getItem('data'));
            data.push(personData);
            localStorage.setItem('data', JSON.stringify(data));
        }

        return true;
    }

    date_to_age(date) {
        // Converts date into age;
        var today = new Date();
        var birthDate = new Date(date);
        var age = today.getFullYear() - birthDate.getFullYear();
        var month = today.getMonth() - birthDate.getMonth();
        if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    }

}
