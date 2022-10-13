document.body.insertAdjacentHTML('beforeend', '<div class="notif" id="notif"></div>');
const notif = document.querySelector('#notif');

export default {
  install(app, options) {
    app.config.globalProperties.$showNotif = function(text) {
      notif.textContent = text;
      notif.classList.add('active');
      setTimeout(()=>{
        notif.classList.remove('active');
      },3000)
    }
  }
}