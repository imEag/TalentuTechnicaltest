'use strict';

import { Model } from './model.js';
import { View } from './view.js';

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async getData() {
        //returns data from Local Storage or API if local storage is empty.
        return await this.model.getData();
    }

    setData(personData) {
        console.log(personData);

        return this.model.setData(personData);
    }
}

function main() {
    const my_model = new Model();
    const my_view = new View();
    const my_controller = new Controller(my_model, my_view);
    
    my_model.set_controller(my_controller);
    my_view.set_controller(my_controller);
}

window.addEventListener('load', () => { 
    main();
});
