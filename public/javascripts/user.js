// const compiledFn = pug.compileFile('../../views/user/index.pug');

const $table = document.querySelector('#user-table tbody');
let xhr = null;

const handleEdit = (id) => {
  console.log(id);
}

const handleDelete = (id) => {
  console.log(id);
  xhr.open('delete', `/api/users/${id}`, true);
  xhr.send();
}

if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest()
} else {
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

xhr.open('get', '/api/users', true);
xhr.send();

xhr.onreadystatechange = () => {
  if (xhr.readyState === 4 && xhr.status === 200) {
    const res = JSON.parse(xhr.responseText);
    let tbodyStr = '';
    res.forEach(row => {
      tbodyStr += `
        <tr>
          <td>${row.name}</td>
          <td>${row.avatar}</td>
          <td>${row.age}</td>
          <td>${row.sex}</td>
          <td>${row.birthday}</td>
          <td>${row.description}</td>
          <td>
            <a href="javascript:;" onclick="handleEdit(${row.id})">edit</a>
            <a href="javascript:;" onclick="handleDelete(${row.id})">delete</a>
          </td>
        </tr>
      `
    });
    $table.innerHTML = tbodyStr;
  }
}