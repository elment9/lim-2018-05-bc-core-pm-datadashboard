const validar =() => {
  let usuario = document.getElementById('email').value;
  let password = document.getElementById('password').value;

  if (usuario === 'alejandra' && password === 'admin') {
    alert('Usuario y contraseña validos;')
    return window.location='assets/index.html'
  }
  else {
    alert ('Verifique sus datos');
  }
}