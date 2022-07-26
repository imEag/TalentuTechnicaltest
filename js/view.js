'use strict';

export { View };

class View {
    constructor() {
        this.controller = '';
        this.data = '';

        this.add_user_form();
    }

    set_controller(controller) {
        this.controller = controller;
    }

    load_data() {
        (async () => {
            this.data = await this.controller.getData();
           /*  console.log(this.data); */
            this.display_data();
        })();
    }

    display_data() {
        const table_body = document.getElementById('table__body');
        let html_code = '';

        for (let person of this.data) {
            if (person.age === undefined) person.age = 'Sin datos';

            html_code += `<tr class="table__body__row">
            <td data-label="ID" class="body__id">${person.id}</td>
            <td data-label="Nombre" class="body__name">${person.first_name} ${person.last_name}</td>
            <td data-label="Edad" class="body__age">${person.age}</td>
            <td data-label="Email" class="body__email">${person.email}</td>
        </tr>`;
        }

        table_body.innerHTML = html_code;
    }

    add_user_form() {
        let add_user_form = document.getElementById('add_user_form');
        add_user_form.addEventListener('submit', (e) => {
            //prevent redirecting.
            e.preventDefault();

            
            //Turning into obj and sending it to controller.
            let personData = {
                'email': e.target[0].value,
                'first_name': e.target[1].value,
                'last_name': e.target[2].value,
                'birthday': e.target[3].value
            }
            
            // if given date is grater than today, return false
            if (new Date(personData.birthday) > new Date()) this.date_warning();

            let result = this.controller.setData(personData);
            this.save_message(result);
            this.load_data();
        });
    }

    date_warning() {
        // shows a warning message, and hiddes it after 5 seconds.
        let date_message = document.getElementsByClassName('date_warning')[0];
        date_message.style.display = 'flex';
        setTimeout(() => {
            date_message.style.display = 'none';
        }, 5000);
    }

    save_message(state) {
        //shows a validation message. state must be boolean

        let success_message = document.getElementsByClassName('submit_message_success')[0];
        let failure_message = document.getElementsByClassName('submit_message_failure')[0];

        console.log(success_message, failure_message);
        if (state === true) {
            success_message.style.display = 'flex';
            failure_message.style.display = 'none';
        } else {
            success_message.style.display = 'none';
            failure_message.style.display = 'flex';
        }
    }

    show_warning() {

    }

    /* f_test_btn() {
        let test_btn = document.getElementsByClassName('test_btn')[0];
        test_btn.addEventListener('click', async () => {
            let data = await this.controller.getData();
            console.log(data);
        });
    } */

}