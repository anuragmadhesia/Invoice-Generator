console.log("Welcome to datas app. This is app.js");
showdatas();

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function(e) {
  let name = document.getElementById("name");
  let quantity = document.getElementById("quantity");
  let rate = document.getElementById("rate");
  let datas = localStorage.getItem("datas");
  if (datas == null) {
    datasObj = [];
  } else {
    datasObj = JSON.parse(datas);
  }
  let myObj = {
    addname: name.value,
    addquantity: quantity.value,
    addrate: rate.value
  }
  datasObj.push(myObj);
  localStorage.setItem("datas", JSON.stringify(datasObj));
  name.value = "";
  quantity.value = "";
  rate.value = "";
  //console.log(datasObj);
  showdatas();
});

// Function to show elements from localStorage
function showdatas() {
  let datas = localStorage.getItem("datas");
  let subtotal=0;
  if (datas == null) {
    datasObj = [];
  } else {
    datasObj = JSON.parse(datas);
  }
  let html = `<tr>
                <th>*</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Rate</th>
                <th>Amount</th>
              </tr>`;
  datasObj.forEach(function(element, index) {
    subtotal=subtotal+parseInt(element.addquantity*element.addrate);
    NumToWord(subtotal,'inwords');
    html += `
              <tr>
                <td>1</td>
                <td>${element.addname}</td>
                <td>${element.addquantity}</td>
                <td>${element.addrate}</td>
                <td>${element.addquantity*element.addrate}</td>
                <td><button id="${index}"onclick="editNote(this.id)" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">Edit</button></td>
                <td><button id="${index}"onclick="deleteNote(this.id)" class="btn btn-danger">Delete</button></td>
              </tr>
            `;
  });
  let datasElm = document.getElementById("datas");
  document.getElementById("subtotal").innerText=subtotal;
  document.getElementById("total").innerText=subtotal;
  if (datasObj.length != 0) {
    datasElm.innerHTML = html;
  } else {
    datasElm.innerHTML = ``;
  }
}
// Function to delete a note
function deleteNote(index) {
//   console.log("I am deleting", index);

  let datas = localStorage.getItem("datas");
  if (datas == null) {
    datasObj = [];
  } else {
    datasObj = JSON.parse(datas);
  }

  datasObj.splice(index, 1);
  localStorage.setItem("datas", JSON.stringify(datasObj));
  showdatas();
}
// Function to edit a note
function editNote(index) {
  let datas = localStorage.getItem("datas");
  if (datas == null) {
    datasObj = [];
  } else {
    datasObj = JSON.parse(datas);
  }
  datasObj.forEach(function(element) {
    document.getElementById("name").value = `${element.addname}`;
    document.getElementById("quantity").value = `${element.addquantity}`;
    document.getElementById("rate").value = `${element.addrate}`;
  });
  datasObj.splice(index, 1);
  localStorage.setItem("datas", JSON.stringify(datasObj));
  showdatas();
}


//Fuction to calculate total
function totalValue(){
  let tax=document.getElementById("tax").value;
  let stotal=parseInt(subtotal.innerText);
  let total=0;
  total=stotal+(stotal/100)*tax;
  document.getElementById("total").innerText=total;
  NumToWord(total,'inwords');
}
//This part is Copied from StackOverFlow
function NumToWord(inputNumber,outputControl) {//function NumToWord(inputNumber, outputControl) {
  var str = new String(inputNumber)
  var splt = str.split("");
  var rev = splt.reverse();
  var once = ['Zero', ' One', ' Two', ' Three', ' Four', ' Five', ' Six', ' Seven', ' Eight', ' Nine'];
  var twos = ['Ten', ' Eleven', ' Twelve', ' Thirteen', ' Fourteen', ' Fifteen', ' Sixteen', ' Seventeen', ' Eighteen', ' Nineteen'];
  var tens = ['', 'Ten', ' Twenty', ' Thirty', ' Forty', ' Fifty', ' Sixty', ' Seventy', ' Eighty', ' Ninety'];

  numLength = rev.length;
  var word = new Array();
  var j = 0;

  for (i = 0; i < numLength; i++) {
      switch (i) {

          case 0:
              if ((rev[i] == 0) || (rev[i + 1] == 1)) {word[j] = '';}
              else {word[j] = '' + once[rev[i]];}
              word[j] = word[j];
              break;

          case 1:
              aboveTens();
              break;

          case 2:
              if (rev[i] == 0) {word[j] = '';}
              else if ((rev[i - 1] == 0) || (rev[i - 2] == 0)) {word[j] = once[rev[i]] + " Hundred ";}
              else {word[j] = once[rev[i]] + " Hundred and";}
              break;

          case 3:
              if (rev[i] == 0 || rev[i + 1] == 1) {word[j] = '';}
              else {word[j] = once[rev[i]];}
              if ((rev[i + 1] != 0) || (rev[i] > 0)) {word[j] = word[j] + " Thousand";}
              break;
   
          case 4:
              aboveTens();
              break;

          case 5:
              if ((rev[i] == 0) || (rev[i + 1] == 1)) {word[j] = '';}
              else {word[j] = once[rev[i]];}
              if (rev[i + 1] !== '0' || rev[i] > '0') {word[j] = word[j] + " Lakh";}
              break;

          case 6:
              aboveTens();
              break;

          case 7:
              if ((rev[i] == 0) || (rev[i + 1] == 1)) {word[j] = '';}
              else {word[j] = once[rev[i]];}
              if (rev[i + 1] !== '0' || rev[i] > '0') {word[j] = word[j] + " Crore";}                
              break;

          case 8:
              aboveTens();
              break;

          default: break;
      }
      j++;
  }

  function aboveTens() {
      if (rev[i] == 0) { word[j] = ''; }
      else if (rev[i] == 1) { word[j] = twos[rev[i - 1]]; }
      else { word[j] = tens[rev[i]]; }
  }

  word.reverse();
  var finalOutput = '';
  for (i = 0; i < numLength; i++) {
      finalOutput = finalOutput + word[i];
  }
  document.getElementById(outputControl).innerText = finalOutput;
}
