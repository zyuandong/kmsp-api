let xhr = null;

if (window.XMLHttpRequest) {
  xhr = new window.XMLHttpRequest();
} else {
  xhr = new ActiveXObject('Microsoft.XMLHTTP');
}

/**
 * TODO
 * 500 Error:
 * 1. 未填写字段
 * 2. 输入类型有误
 * 提示信息不明确
 */

const validateForm = () => {
  const name = document.forms['userForm']['name'].value;
  if (!name) {
    alert('Name is required!');
    return false
  }
  return true;
}

const xhrFactory = (method, url, callback) => {
  xhr.onreadystatechange = callback;
  xhr.open(method, url, true);
  xhr.send();
}

const isEdit = () => {
  const href = location.href;
  const isEdit = href.includes('edit');
  if (isEdit) {
    const id = href.substring(href.lastIndexOf('/') + 1);
    xhrFactory('get', `/api/users/${id}`, () => {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const data =  JSON.parse(xhr.responseText)[0];
        Object.keys(data).forEach((item) => {
          if (document.forms['userForm'][item]) {
            document.forms['userForm'][item].value = data[item];
          }
        })
      }
    })
  }
}
isEdit();
