// const compiledFn = pug.compileFile('../../views/user/index.pug');

const $table = document.querySelector('#user-table tbody');
let xhr = null;

const xhrFactory = (method, url, callback) => {
  xhr.onreadystatechange = callback;
  xhr.open(method, url, true);
  xhr.send();
}

if (window.XMLHttpRequest) {
  xhr = new XMLHttpRequest()
} else {
  xhr = new ActiveXObject("Microsoft.XMLHTTP");
}

// get
const getData = () => {
  xhrFactory('get', '/api/users', () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const res = JSON.parse(xhr.responseText);
      let tbodyStr = '';
      res.forEach(row => {
        tbodyStr += `
          <tr>
            <td>${row.id}</td>
            <td>${row.name}</td>
            <td>${row.avatar}</td>
            <td>${row.age}</td>
            <td>${row.sex}</td>
            <td>${row.birthday}</td>
            <td>${row.description}</td>
            <td>
              <a href="javascript:;" onclick="handleEdit(${row.id})">Edit</a>
              <a href="javascript:;" onclick="handleDelete(${row.id})">Delete</a>
            </td>
          </tr>
        `
      });
      $table.innerHTML = tbodyStr;
    }
  })
}
getData()

const handleEdit = (id) => {
  console.log(id);
}

const handleDelete = (id) => {
  xhrFactory('DELETE', `/api/users/${id}`, () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      getData();
    }
  })
}