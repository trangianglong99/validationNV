function kiemtraRong(value, a) {
  if (value === "") {
    document.querySelector(a).style.display = "block";
    document.querySelector(a).innerHTML = "Không được để trống !!!";
    return false;
  }
  document.querySelector(a).innerHTML = "";
  return true;
}

function kiemtradodai(value, a, min, max) {
  if (value.length > max || value.length < min) {
    document.querySelector(a).style.display = "block";
    document.querySelector(a).innerHTML = "do dai tu" + min + "toi " + max;
    return false;
  }
  document.querySelector(a).innerHTML = "";
  return true;
}

function kiemtraEmail(value, a) {
  var regex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\ [[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regex.test(value)) {
    document.querySelector(a).style.display = "block";
    document.querySelector(a).innerHTML = "";
    return true;
  }
  document.querySelector(a).innerHTML = " chua dung dinh dang";
  return false;
}

function checkgiatri(value, a, value1, value2, value3) {
  if (value === value1 || value === value2 || value === value3) {
    document.querySelector(a).style.display = "block";
    document.querySelector(a).innerHTML = "";
    return true;
  }
  document.querySelector(a).innerHTML = "chua xac dinh chuc vu";
  return false;
}
