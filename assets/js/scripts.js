function showLoader() {
    document.querySelector('.preloader').style.opacity = '1000';
    document.querySelector('.preloader').style.display = 'block';
}

function hideLoader() {
    document.querySelector('.preloader').style.opacity = '0';
    document.querySelector('.preloader').style.display = 'none';
}

function changeFilter(filterNumber) {
    var elements = [];
    elements = document.getElementById('portfolio-btns').children;
    var newElement;

    switch (filterNumber) {
        case 0:
            newElement = document.getElementById('portfolio-all');
            break;

        case 1:
            newElement = document.getElementById('portfolio-websites');
            break;

        case 2:
            newElement = document.getElementById('portfolio-ecommerce');
            break;

        case 3:
            newElement = document.getElementById('portfolio-apps');
            break;

        case 4:
            newElement = document.getElementById('portfolio-design');
            break;

        default:
            break;
    }

    var oldElement;
    if (elements != null && elements != undefined) {
        for (var i = 0; i < elements.length; i++) {
            for (var j = 0; j < elements[i].classList.length; j++) {
                if (elements[i].classList[j] == "active") {
                    oldElement = elements[i];
                }
            }
        }
    }


    var newElementActive = false;

    for (var i = 0; i < newElement.classList.length; i++) {
        if (newElement.classList[i] == "active") {
            newElementActive = true;
        }
    }

    if (newElementActive == false) {
        newElement.classList.add('active');
        oldElement.classList.remove('active');
    }
}

async function sendEmail() {
    var formData = {};

    formData = {
        'to': 'atendimento@uaidevs.com',
        'name': document.getElementById('contact-name').value,
        'email': document.getElementById('contact-email').value,
        'phone': document.getElementById('contact-phone').value,
        'subject': document.getElementById('contact-subject').value,
        'message': document.getElementById('contact-message').value
    };

    if ((formData.name != undefined && formData.name != '') &&
        (formData.email != undefined && formData.email != '') &&
        (formData.phone != undefined && formData.phone != '') &&
        (formData.subject != undefined && formData.subject != '') &&
        (formData.message != undefined && formData.message != '')) {
        showLoader();
        var response = await fetch('https://uai-devs-broker-api.onrender.com/mailer',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

        if (response.status == 200) {
            document.getElementById('contact-name').value = '';
            document.getElementById('contact-email').value = '';
            document.getElementById('contact-phone').value = '';
            document.getElementById('contact-subject').value = '';
            document.getElementById('contact-message').value = '';
            showPlaceholder('E-mail enviado com sucesso! Em breve entraremos em contato com você.', 'success');
        } else {
            showPlaceholder('Falha no envio! Nos chame em nosso WhatsApp.', 'danger');
        }

        hideLoader();
    } else {
        showPlaceholder('Preencha todos os campos para enviar o email de contato!', 'warning');
    }
}

function showPlaceholder(newMessage, newType){
    const alertPlaceholder = document.getElementById('alertPlaceholder')

    if(alertPlaceholder.children.length > 0){
        alertPlaceholder.innerHTML = '';
    }

    const alert = (message, type) => {
      const wrapper = document.createElement('div')
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
      ].join('')
    
      alertPlaceholder.append(wrapper)
    }

    alert(newMessage, newType);
}