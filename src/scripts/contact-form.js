/**
 * RIBEIRO & SÁ ARQUITETURA — CONTACT FORM MODULE
 * Validação rigorosa e amigável para formulário de contato
 */

export function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const nameInput = document.getElementById('form-name');
  const phoneInput = document.getElementById('form-phone');
  const locationInput = document.getElementById('form-location');
  const typeSelect = document.getElementById('form-type');
  const messageInput = document.getElementById('form-message');

  let hasAttemptedSubmit = false;

  // =========================================================================
  // FUNÇÕES AUXILIARES DE INTERFACE E ERRO
  // =========================================================================

  function showError(input, message) {
    if (!input) return;
    input.classList.add('is-invalid');
    input.setAttribute('aria-invalid', 'true');

    const group = input.closest('.form-group');
    if (group) {
      let errorEl = group.querySelector('.form-error-msg');
      if (!errorEl) {
        errorEl = document.createElement('span');
        errorEl.className = 'form-error-msg';
        errorEl.setAttribute('role', 'alert');
        group.appendChild(errorEl);
      }
      errorEl.textContent = message;
    }
  }

  function clearError(input) {
    if (!input) return;
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');

    const group = input.closest('.form-group');
    if (group) {
      const errorEl = group.querySelector('.form-error-msg');
      if (errorEl) {
        errorEl.remove();
      }
    }
  }

  // =========================================================================
  // 1. REGRAS DO CAMPO NOME COMPLETO
  // =========================================================================
  if (nameInput) {
    let isComposing = false;
    nameInput.addEventListener('compositionstart', () => { isComposing = true; });
    nameInput.addEventListener('compositionend', () => {
      isComposing = false;
      sanitizeNameInput();
    });

    function sanitizeNameInput() {
      const prevVal = nameInput.value;
      // Permite exclusivamente letras unicode (\p{L}) e espaços (\s)
      const cleaned = prevVal.replace(/[^\p{L}\s]/gu, '');
      if (prevVal !== cleaned) {
        const prevStart = nameInput.selectionStart || 0;
        const diff = prevVal.length - cleaned.length;
        nameInput.value = cleaned;
        const newPos = Math.max(0, prevStart - diff);
        nameInput.setSelectionRange(newPos, newPos);
      }
    }

    nameInput.addEventListener('input', () => {
      if (!isComposing) {
        sanitizeNameInput();
      }
      clearError(nameInput);
      if (hasAttemptedSubmit) {
        validateName(true);
      }
    });

    nameInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData)?.getData('text') || '';
      const cleanPaste = pasteData.replace(/[^\p{L}\s]/gu, '');
      const start = nameInput.selectionStart || 0;
      const end = nameInput.selectionEnd || 0;
      const current = nameInput.value;
      nameInput.value = current.slice(0, start) + cleanPaste + current.slice(end);
      const newPos = start + cleanPaste.length;
      nameInput.setSelectionRange(newPos, newPos);
      clearError(nameInput);
    });

    nameInput.addEventListener('blur', () => {
      if (hasAttemptedSubmit || nameInput.value.trim().length > 0) {
        validateName(true);
      }
    });
  }

  function validateName(showErrorMsg = true) {
    if (!nameInput) return true;
    const val = nameInput.value.trim();

    if (!val) {
      if (showErrorMsg) showError(nameInput, 'Por favor, informe seu nome completo.');
      return false;
    }

    // Validação de segurança: apenas letras e espaços
    if (/[^\p{L}\s]/u.test(val)) {
      if (showErrorMsg) showError(nameInput, 'Utilize apenas letras e espaços no nome.');
      return false;
    }

    // Deve ser nome completo (pelo menos dois termos com 2+ caracteres cada)
    const terms = val.split(/\s+/).filter(t => t.length >= 2);
    if (terms.length < 2 || val.length < 5) {
      if (showErrorMsg) showError(nameInput, 'Por favor, informe seu nome completo.');
      return false;
    }

    clearError(nameInput);
    return true;
  }

  // =========================================================================
  // 2. REGRAS DO CAMPO TELEFONE / WHATSAPP
  // =========================================================================
  if (phoneInput) {
    function sanitizePhoneInput() {
      const prevVal = phoneInput.value;
      // Aceita exclusivamente dígitos 0-9, sem máscara, máximo 11 dígitos
      const cleaned = prevVal.replace(/\D/g, '').slice(0, 11);
      if (prevVal !== cleaned) {
        const prevStart = phoneInput.selectionStart || 0;
        const diff = prevVal.length - cleaned.length;
        phoneInput.value = cleaned;
        const newPos = Math.max(0, prevStart - diff);
        phoneInput.setSelectionRange(newPos, newPos);
      }
    }

    phoneInput.addEventListener('input', () => {
      sanitizePhoneInput();
      clearError(phoneInput);
      if (hasAttemptedSubmit) {
        validatePhone(true);
      }
    });

    phoneInput.addEventListener('paste', (e) => {
      e.preventDefault();
      const pasteData = (e.clipboardData || window.clipboardData)?.getData('text') || '';
      const cleanPaste = pasteData.replace(/\D/g, '');
      const start = phoneInput.selectionStart || 0;
      const end = phoneInput.selectionEnd || 0;
      const current = phoneInput.value;
      const combined = (current.slice(0, start) + cleanPaste + current.slice(end)).replace(/\D/g, '').slice(0, 11);
      phoneInput.value = combined;
      phoneInput.setSelectionRange(combined.length, combined.length);
      clearError(phoneInput);
    });

    phoneInput.addEventListener('blur', () => {
      if (hasAttemptedSubmit || phoneInput.value.trim().length > 0) {
        validatePhone(true);
      }
    });
  }

  function validatePhone(showErrorMsg = true) {
    if (!phoneInput) return true;
    const digits = phoneInput.value.trim().replace(/\D/g, '');

    if (!digits) {
      if (showErrorMsg) showError(phoneInput, 'Informe um telefone válido com DDD, utilizando somente números.');
      return false;
    }

    if (digits.length < 10 || digits.length > 11) {
      if (showErrorMsg) showError(phoneInput, 'Informe um telefone válido com DDD, utilizando somente números.');
      return false;
    }

    // Validação do DDD (11 a 99)
    const ddd = parseInt(digits.substring(0, 2), 10);
    if (ddd < 11 || ddd > 99 || digits[1] === '0') {
      if (showErrorMsg) showError(phoneInput, 'Informe um DDD brasileiro válido com 2 dígitos.');
      return false;
    }

    // Se tem 11 dígitos (celular), o terceiro dígito (primeiro do número) deve ser 9
    if (digits.length === 11 && digits[2] !== '9') {
      if (showErrorMsg) showError(phoneInput, 'Telefone celular com 11 dígitos deve iniciar com 9 após o DDD.');
      return false;
    }

    // Prevenir repetição de um único dígito (ex: 1111111111, 00000000000)
    if (/^(\d)\1+$/.test(digits)) {
      if (showErrorMsg) showError(phoneInput, 'Informe um telefone válido com DDD, utilizando somente números.');
      return false;
    }

    clearError(phoneInput);
    return true;
  }

  // =========================================================================
  // 3. CAMPO CIDADE / LOCAL DO TERRENO
  // =========================================================================
  if (locationInput) {
    locationInput.addEventListener('input', () => {
      clearError(locationInput);
      if (hasAttemptedSubmit) validateLocation(true);
    });

    locationInput.addEventListener('blur', () => {
      if (hasAttemptedSubmit || locationInput.value.trim().length > 0) {
        validateLocation(true);
      }
    });
  }

  function validateLocation(showErrorMsg = true) {
    if (!locationInput) return true;
    const val = locationInput.value.trim();

    if (!val) {
      if (showErrorMsg) showError(locationInput, 'Preencha este campo para continuar.');
      return false;
    }

    if (val.length < 3) {
      if (showErrorMsg) showError(locationInput, 'Preencha este campo para continuar.');
      return false;
    }

    clearError(locationInput);
    return true;
  }

  // =========================================================================
  // 4. CAMPO TIPO DE PROJETO
  // =========================================================================
  if (typeSelect) {
    typeSelect.addEventListener('change', () => {
      clearError(typeSelect);
      if (hasAttemptedSubmit) validateType(true);
    });

    typeSelect.addEventListener('blur', () => {
      if (hasAttemptedSubmit) validateType(true);
    });
  }

  function validateType(showErrorMsg = true) {
    if (!typeSelect) return true;
    const val = typeSelect.value.trim();

    if (!val) {
      if (showErrorMsg) showError(typeSelect, 'Preencha este campo para continuar.');
      return false;
    }

    clearError(typeSelect);
    return true;
  }

  // =========================================================================
  // 5. CAMPO BREVE DESCRIÇÃO DO PROJETO
  // =========================================================================
  if (messageInput) {
    messageInput.addEventListener('input', () => {
      clearError(messageInput);
      if (hasAttemptedSubmit) validateMessage(true);
    });

    messageInput.addEventListener('blur', () => {
      if (hasAttemptedSubmit || messageInput.value.trim().length > 0) {
        validateMessage(true);
      }
    });
  }

  function validateMessage(showErrorMsg = true) {
    if (!messageInput) return true;
    const val = messageInput.value.trim();

    if (!val) {
      if (showErrorMsg) showError(messageInput, 'Preencha este campo para continuar.');
      return false;
    }

    if (val.length < 10) {
      if (showErrorMsg) showError(messageInput, 'Por favor, descreva seu projeto com mais detalhes (mínimo 10 caracteres).');
      return false;
    }

    clearError(messageInput);
    return true;
  }

  // =========================================================================
  // SUBMISSÃO DO FORMULÁRIO COM VALIDAÇÃO COMPLETA
  // =========================================================================
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    hasAttemptedSubmit = true;

    // Executa a validação de todos os campos obrigatórios
    const isNameOk = validateName(true);
    const isPhoneOk = validatePhone(true);
    const isLocationOk = validateLocation(true);
    const isTypeOk = validateType(true);
    const isMessageOk = validateMessage(true);

    const isFormValid = isNameOk && isPhoneOk && isLocationOk && isTypeOk && isMessageOk;

    if (!isFormValid) {
      // Interrompe o envio e direciona foco para o primeiro campo inválido
      const firstInvalid = form.querySelector('.is-invalid');
      if (firstInvalid) {
        firstInvalid.focus();
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    // Se todos os campos forem válidos, prossegue com o envio existente
    const submitBtn = form.querySelector('.form-submit-btn');
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Enviando...</span>`;
    }

    // Confirmação de envio bem-sucedido
    setTimeout(() => {
      form.innerHTML = `
        <div class="form-feedback-card" style="background: rgba(196, 159, 115, 0.12); border: 1px solid var(--accent-bronze); border-radius: var(--radius-md); padding: 32px 24px; text-align: center;">
          <p class="form-feedback-title" style="font-family: var(--font-heading); font-size: 1.25rem; color: var(--text-primary-dark); font-weight: 500; margin-bottom: 8px;">Mensagem Enviada com Sucesso</p>
          <p class="form-feedback-desc" style="font-size: 0.875rem; color: var(--text-muted-dark); line-height: 1.6;">Obrigado pelo contato! A equipe Ribeiro & Sá retornará sua mensagem em até 24 horas úteis.</p>
        </div>
      `;
    }, 700);
  });
}
