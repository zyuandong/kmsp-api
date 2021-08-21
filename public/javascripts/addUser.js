let xhr = null;

const validateForm = () => {
  const name = document.forms['userForm']['name'].value;
  if (!name) {
    alert('Name is required!');
    return false
  }
  return true;
}

/**
 * TODO
 * 500 Error:
 * 1. 未填写字段
 * 2. 输入类型有误
 * 提示信息不明确
 */