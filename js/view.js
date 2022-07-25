'use strict';

export { View };

class View {
    constructor() {
        this.controller = '';
        this.data = '';
        this.petitionState = false;

        this.f_test_btn();
        this.f_test_form();

    }

    set_controller(controller) {
        this.controller = controller;
    }

    f_test_form() {
        let form_test = document.getElementById('form_test');
        form_test.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log(e, e.target[0].value);

            //Turning into obj and sending it to controller.
            let personData = {
                'name': 'name',
                'lastname': 'lastname',
                'email': 'email',
                'birthday': 'birthday'
            }

            let result = this.controller.setData(personData);
            console.log(result);
        });
    }

    f_test_btn() {
        let test_btn = document.getElementsByClassName('test_btn')[0];
        test_btn.addEventListener('click', async () => {
            let data = await this.controller.getData();
            console.log(data);
        });
    }

}