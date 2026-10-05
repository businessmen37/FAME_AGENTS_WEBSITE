'use strict';
document.documentElement.classList.add('js');
const menu = document.querySelector('.menu-button');
const nav = document.querySelector('#navigation');
menu.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('open', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false');
    document.querySelector('.language-switch').removeAttribute('open');
  }
});
document.addEventListener('click', event => {
  const languages = document.querySelector('.language-switch');
  if (!languages.contains(event.target)) languages.removeAttribute('open');
});
const copy = JSON.parse(document.querySelector('#page-copy').textContent);
const form = document.querySelector('#project-form');
const dialog = document.querySelector('#brief-dialog');
const status = document.querySelector('#status');
const buttons = [...document.querySelectorAll('.add-service')];
function syncButton(index) {
  const selected = document.querySelector('#choice-' + index).checked;
  const button = buttons[index];
  button.classList.toggle('selected', selected);
  button.setAttribute('aria-pressed', String(selected));
  button.replaceChildren(document.createTextNode(selected ? copy.selected : copy.request));
  const arrow = document.createElement('span'); arrow.setAttribute('aria-hidden','true'); arrow.textContent = selected ? '✓' : '↗'; button.append(arrow);
}
buttons.forEach((button, index) => {
  button.setAttribute('aria-pressed','false');
  button.addEventListener('click', () => {
    const check = document.querySelector('#choice-' + index);
    check.checked = !check.checked; syncButton(index);
    status.textContent = check.checked ? copy.status : copy.request;
  });
  document.querySelector('#choice-' + index).addEventListener('change', () => syncButton(index));
});
function createBrief(data) {
  const keys = ['name', 'email', 'company'];
  const head = keys.map(k => copy[k] + ': ' + (data.get(k) || '—'));
  return copy.briefTitle + '\n\n' + head.join('\n') + '\n\n' + copy.need + ':\n' + (data.getAll('services').join('\n') || '—') + '\n\n' + copy.message + ':\n' + data.get('message') + '\n\n' + copy.budget + ': ' + data.get('budget') + '\n' + copy.timing + ': ' + (data.get('timing') || '—');
}
let brief = '';
if(form) {
const deliveryNode = document.querySelector('#contact-delivery');
const delivery = deliveryNode ? JSON.parse(deliveryNode.textContent) : {enabled:false};
const sendStatus = document.querySelector('#send-status');
if (delivery.enabled) {
  form.querySelector('[type="submit"]').replaceChildren(document.createTextNode(copy.send));
  document.querySelector('#form-note').textContent = copy.formNote;
}
const service = new URLSearchParams(location.search).get('service');
if (/^[0-2]$/.test(service || '')) document.querySelector('#choice-' + service).checked = true;
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (delivery.enabled) {
    const submit = form.querySelector('[type="submit"]');
    const data = new FormData(form);
    if (data.get('_honey')) return;
    const payload = Object.fromEntries(data.entries());
    payload.services = data.getAll('services').join(', ');
    payload._subject = copy.emailSubject;
    payload._template = 'table';
    submit.disabled = true;
    submit.textContent = copy.sending;
    sendStatus.textContent = copy.sending;
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(delivery.endpoint, {
        method:'POST', headers:{'Content-Type':'application/json',Accept:'application/json'},
        body:JSON.stringify(payload), signal:controller.signal
      });
      const result = await response.json();
      if (!response.ok || ![true,'true'].includes(result.success)) throw new Error('Submission not accepted');
      sendStatus.textContent = copy.sent;
      form.reset();
    } catch {
      sendStatus.textContent = copy.failed;
    } finally {
      clearTimeout(timer);
      submit.disabled = false;
      submit.textContent = copy.send;
      sendStatus.focus();
    }
    return;
  }
  brief = createBrief(new FormData(form));
  document.querySelector('#brief-preview').textContent = brief;
  document.querySelector('#email-brief').href = 'mailto:info@fameagents.de?subject=' + encodeURIComponent(copy.emailSubject) + '&body=' + encodeURIComponent(brief);
  document.querySelector('#whatsapp-brief').href = 'https://wa.me/391497073725?text=' + encodeURIComponent(brief);
  if (typeof dialog.showModal === 'function') dialog.showModal();
  else { dialog.setAttribute('open',''); dialog.scrollIntoView({behavior:'smooth'}); }
});
document.querySelector('#close-dialog').addEventListener('click', () => {
  if (typeof dialog.close === 'function') dialog.close(); else dialog.removeAttribute('open');
});
document.querySelector('#download-brief').addEventListener('click', () => {
  const address = URL.createObjectURL(new Blob([brief], {type:'text/plain;charset=utf-8'}));
  const a = document.createElement('a'); a.href = address; a.download = 'fame-agents-project-brief.txt'; a.click();
  setTimeout(() => URL.revokeObjectURL(address), 1000);
});
}
