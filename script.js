function toggleMenu() {
  document.getElementById('navMenu').classList.toggle('active');
}

const hashes = [
  "074d235ee0725bb414c49215dc970fcdd9507d5846a13f8ac50a13268559d5b9",
  "e08d914ad848c0039d964f63b3037664716cd5f4de1163e050bc5d56848810f0",
  "5a85af3a168c939bb10971211f9980ddba0f0a534af4c7f321b46ec6fa0af204",
  "9ef83c8cbd60870ca617c6ff7ffa11baee6b4e467669eab636474709f774735e",
  "d6dad5a9f3ac79e416a8fa4ac91b736e7af0d8f9e4f562bf4d34baa0b936dcb3",
  "b15d775970aa7fe27f8bbc3274b510516d0a57e943dba7a4b4aedcbc51cbad52"
]

async function hashPassword(pw) {
  const encoder = new TextEncoder();
  const data = encoder.encode(pw);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

async function showSite() {
  document.body.classList.remove("auth");
  document.getElementById("loginOverlay").classList.add('d-none');
}

async function checkLogin() {
  const storedHash = localStorage.getItem("passHash");
  if (storedHash === correctHash) {
    showSite();
  }
}

document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();
  const enteredPw = document.getElementById("passwordInput").value;
  const hashed = await hashPassword(enteredPw);

if(hashes.includes(hashed)){
    localStorage.setItem("passHash", hashed);
    showSite();
  } else {
    document.getElementById("errorMsg").classList.remove('d-none');
  }
});

checkLogin();
