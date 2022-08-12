function model(
  id,
  hoTen,
  email,
  password,
  ngayLam,
  luongCoBan,
  chucVu,
  gioLam
) {
  this.id = id;
  this.hoTen = hoTen;
  this.email = email;
  this.password = password;
  this.ngayLam = ngayLam;
  this.luongCoBan = luongCoBan;
  this.chucVu = chucVu;
  this.gioLam = gioLam;
  this.tongLuong = function () {
    var luong = 0;
    if (this.chucVu === "Sếp") {
      luong = luongCoBan * 3;
      return luong;
    } else if (this.chucVu === "Trưởng phòng") {
      luong = luongCoBan * 2;
      return luong;
    } else {
      luong = luongCoBan;
      return luong;
    }
  };
  this.loaiNV = function () {
    var xepLoai = "";
    if (this.gioLam >= 192) {
      xepLoai = "NV XUẤT SẮC";
    } else if (this.gioLam >= 176) {
      xepLoai = "NV GIỎI";
    } else if (this.gioLam >= 160) {
      xepLoai = "NV KHÁ";
    } else {
      xepLoai = "NV TRUNG BÌNH";
    }
    return xepLoai;
  };
}

var mang = [];
document.querySelector("#btnThemNV").onclick = function () {
  var id = document.querySelector("#tknv").value;
  var hoTen = document.querySelector("#name").value;
  var email = document.querySelector("#email").value;
  var password = document.querySelector("#password").value;
  var ngayLam = document.querySelector("#datepicker").value;
  var luongCoBan = document.querySelector("#luongCB").value;
  var chucVu = document.querySelector("#chucvu").value;
  var gioLam = document.querySelector("#gioLam").value;
  var obj = new model(
    id,
    hoTen,
    email,
    password,
    ngayLam,
    luongCoBan,
    chucVu,
    gioLam
  );
  var valid = true;
  valid &=
    kiemtraRong(obj.id, "#tbTKNV") &
    kiemtraRong(obj.hoTen, "#tbTen") &
    kiemtraRong(obj.email, "#tbEmail") &
    kiemtraRong(obj.luongCoBan, "#tbLuongCB") &
    kiemtraRong(obj.gioLam, "#tbGiolam");
  if (kiemtraRong(obj.id, "#tbTKNV")) {
    valid &= kiemtradodai(obj.id, "#tbTKNV", 4, 6);
  }
  if (kiemtraRong(obj.email, "#tbEmail")) {
    valid &= kiemtraEmail(obj.email, "#tbEmail");
  }
  valid &= checkgiatri(
    obj.chucVu,
    "#chucvu",
    "Sếp",
    "Trưởng phòng",
    "Nhân viên"
  );
  if (kiemtraRong(obj.gioLam, "#tbGiolam")) {
    valid &= kiemtraGioLam(obj.gioLam, "#tbGiolam", 80, 200);
  }
  if (!valid) {
    return;
  }
  mang.push(obj);
  console.log(mang);
  xuatRaTable(mang);
  // saveLocalStorage(mang, "key");
};

function xuatRaTable(a) {
  var output = "";
  for (var i = 0; i < a.length; i++) {
    output += `<tr>
    <td>${a[i].id}</td> 
    <td>${a[i].hoTen}</td> 
    <td>${a[i].email}</td> 
    <td>${a[i].ngayLam}</td> 
    <td>${a[i].chucVu}</td> 
    <td>${a[i].tongLuong()}</td> 
    <td>${a[i].loaiNV()}</td>
    <td>
        <button onclick="deleteNV(${
          a[i].id
        })" id="delete" class="btn btn-primary">delete</button>
        <button onclick="updateNV(${
          a[i].id
        })" id="update" class="btn btn-success mt-4">update</button>
    </td>
    </tr>`;
  }
  // output += table;
  console.log(output);
  document.querySelector("#tableDanhSach").innerHTML = output;
  console.log(a);
}

function saveLocalStorage(a, key) {
  var newobj = JSON.stringify(a);
  var save = localStorage.setItem(key, newobj);
  return save;
}

function getLocalStorage(key) {
  var newobj = localStorage.getItem(key);
  return newobj;
}

// window.onload = function () {
//   var newOfficer = getLocalStorage("khoa");
//   xuatRaTable(newOfficer);
// };

function deleteNV(id) {
  var numI = -1;
  for (var i = 0; i < mang.length; i++) {
    if (mang[i].id == id) {
      numI = mang[i];
      break;
    }
  }
  if (numI != -1) {
    mang.splice(numI, 1);
  }
  xuatRaTable(mang);
}

function updateNV(id) {
  var numI = -1;
  for (var i = 0; i < mang.length; i++) {
    if (mang[i].id == id) {
      numI = mang[i];
      break;
    }
  }
  if (numI != -1) {
    document.querySelector("#tknv").value = mang[i].id;
    document.querySelector("#name").value = mang[i].hoTen;
    document.querySelector("#email").value = mang[i].email;
    document.querySelector("#password").value = mang[i].password;
    document.querySelector("#datepicker").value = mang[i].ngayLam;
    document.querySelector("#luongCB").value = mang[i].luongCoBan;
    document.querySelector("#chucvu").value = mang[i].chucVu;
    document.querySelector("#gioLam").value = mang[i].gioLam;
  }
}

function capNhat() {
  var newDS = new model();
  newDS.id = document.querySelector("#tknv").value;
  newDS.hoTen = document.querySelector("#name").value;
  newDS.email = document.querySelector("#email").value;
  newDS.password = document.querySelector("#password").value;
  newDS.ngayLam = document.querySelector("#datepicker").value;
  newDS.luongCoBan = document.querySelector("#luongCB").value;
  newDS.chucVu = document.querySelector("#chucvu").value;
  newDS.gioLam = document.querySelector("#gioLam").value;
  var count = -1;
  for (var i = 0; i < mang.length; i++) {
    if (mang[i].id === newDS.id) {
      count = i;
      break;
    }
  }
  if (count != -1) {
    mang[count].id = newDS.id;
    mang[count].hoTen = newDS.hoTen;
    mang[count].email = newDS.email;
    mang[count].password = newDS.password;
    mang[count].ngayLam = newDS.ngayLam;
    mang[count].luongCoBan = newDS.luongCoBan;
    mang[count].chucVu = newDS.chucVu;
    mang[count].gioLam = newDS.gioLam;
  }
  xuatRaTable(mang);
}

document.querySelector("#btnTimNV").onclick = function () {
  output = [];
  var search = document.querySelector("#searchName").value;
  for (var i = 0; i < mang.length; i++) {
    if (mang[i].xepLoai == search) {
      output.push(mang[i]);
    }
  }
  console.log(output);
  xuatRaTable(output);
};
