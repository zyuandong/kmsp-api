const socket = io();

let username = 'default';

// 基础功能：发送信息
const $input = document.querySelector('.message');
const $btnEnter = document.querySelector('.btn-enter');
const $chatBox = document.querySelector('.chat-box');

$btnEnter.addEventListener('click', () => {
  // console.log($input.value);
  if ($input.value && username) {
    socket.emit('chat message', {username, message: $input.value});
  }
  $input.value = '';
})

socket.on('chat message', (res) => {
  res.isSelf = res.username === username;
  console.log('== chat.js ==', res);

  const $chatItem = document.createElement('div');
  $chatItem.setAttribute('class', `chat-item ${res.isSelf ? 'self' : ''}`);

  const $username = document.createElement('div');
  $username.setAttribute('class', 'chat-item-username');
  $username.innerHTML = res.username;

  const $message = document.createElement('div');
  $message.setAttribute('class', 'message');
  $message.innerHTML = res.message;

  $chatItem.appendChild($username);
  $chatItem.appendChild($message);
  $chatBox.appendChild($chatItem);
})

// 添加用户
const $usernameInput = document.querySelector('.user-name');
const $btnSure = document.querySelector('.btn-sure');

$btnSure.addEventListener('click', () => {
  if ($usernameInput.value) {
    username = $usernameInput.value;
    $btnEnter.removeAttribute('disabled');
    $usernameInput.setAttribute('disabled', true);
    $btnSure.setAttribute('disabled', true);
    return true;
  }
  $btnEnter.setAttribute('disabled', true);
  return false;
})