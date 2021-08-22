let xhr = null;

if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest();
} else {
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

const handleRequest = () => {
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      document.querySelector('#result').innerHTML = xhr.responseText;
    }
  }
  // xhr.open('post', `/graphql?query={hello}`)
  xhr.open('post', `/graphql?query=${encodeURI('{hello}')}`);
  xhr.send();
};
