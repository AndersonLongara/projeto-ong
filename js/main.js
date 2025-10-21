/* ========================================================================= */
/* MÓDULO DE VALIDAÇÃO DE FORMULÁRIO                                        */
/* Objetivo: Validar o formulário de cadastro (cadastro.html)               */
/* ========================================================================= */

document.addEventListener('DOMContentLoaded', function () {
    // 1. SELECIONAR OS ELEMENTOS
    const form = document.querySelector('form[action="#"]');

    // 2. VERIFICAR SE ESTAMOS NA PÁGINA CERTA
    if (!form) {
        return;
    }

    console.log('Script de validação carregado para a página de cadastro.');

    const inputsParaValidar = form.querySelectorAll('input[required]');
    const feedback = form.querySelector('.form-feedback');

    // 3. FUNÇÕES AUXILIARES

    function mostrarErro(input, mensagem) {
        const formGroup = input.parentElement;
        if (!formGroup) {
            return;
        }

        const errorElement = formGroup.querySelector('.error-message');

        formGroup.classList.add('invalid');
        if (errorElement) {
            errorElement.textContent = mensagem;
        }
    }

    function limparErro(input) {
        const formGroup = input.parentElement;
        if (!formGroup) {
            return;
        }

        const errorElement = formGroup.querySelector('.error-message');

        formGroup.classList.remove('invalid');
        if (errorElement) {
            errorElement.textContent = '';
        }
    }

    function validarInput(input) {
        if (input.validity.valid) {
            limparErro(input);
            return true;
        }

        let mensagemErro = '';

        if (input.validity.valueMissing) {
            mensagemErro = 'Este campo é obrigatório.';
        } else if (input.validity.patternMismatch) {
            mensagemErro = input.title || 'Formato inválido.';
        } else if (input.validity.tooShort) {
            mensagemErro = `Deve ter no mínimo ${input.minLength} caracteres.`;
        } else if (input.validity.typeMismatch) {
            mensagemErro = 'Por favor, insira um e-mail válido.';
        } else {
            mensagemErro = 'O valor inserido é inválido.';
        }

        mostrarErro(input, mensagemErro);
        return false;
    }

    function limparFeedback() {
        if (!feedback) {
            return;
        }

        feedback.textContent = '';
        feedback.classList.remove('is-visible', 'is-success', 'is-error');
    }

    function mostrarFeedback(tipo, mensagem) {
        if (!feedback) {
            return;
        }

        feedback.textContent = mensagem;
        feedback.classList.add('is-visible');

        if (tipo === 'success') {
            feedback.classList.add('is-success');
            feedback.classList.remove('is-error');
        } else if (tipo === 'error') {
            feedback.classList.add('is-error');
            feedback.classList.remove('is-success');
        }
    }

    // 4. ADICIONAR OS "OUVINTES" DE EVENTOS
    inputsParaValidar.forEach((input) => {
        input.addEventListener('blur', () => {
            validarInput(input);
        });

        input.addEventListener('input', () => {
            limparErro(input);
            limparFeedback();
        });
    });

    // 5. VALIDAÇÃO FINAL (NO ENVIO)
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        let formValido = true;

        inputsParaValidar.forEach((input) => {
            if (!validarInput(input)) {
                formValido = false;
            }
        });

        if (!formValido) {
            console.log('Formulário inválido. Envio bloqueado.');
            mostrarFeedback('error', 'Por favor, corrija os campos destacados antes de enviar.');
            return;
        }

        console.log('Formulário enviado com sucesso!');
        form.reset();
        inputsParaValidar.forEach(limparErro);
        mostrarFeedback('success', 'Cadastro enviado com sucesso! Obrigado por fazer parte do impacto.');
    });
});
