let xhr = null;


if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest()
} else {
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}


const handleAdd = () => {
  xhr.open('post', '/api/users', true);
  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
  xhr.send({name: 1121212});
}

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const res = JSON.parse(xhr.responseText);
    console.log(res);
  }
}