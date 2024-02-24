var stlFilePath = "/test.stl";
var error = null;
var form = document.getElementById("form");
form.onsubmit = function (event) {
  event.preventDefault();
  document.getElementById("gt").innerText = "";

  var xhr = new XMLHttpRequest();
  var data = new FormData(form);

  //Add extra data to form before submission.

  xhr.open("POST", "upload.php");

  // xhr.setRequestHeader("Content-Type", "multipart/form-data");
  //send the form data
  xhr.send(data);

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      // form.reset(); //reset form after AJAX success.
      console.log(xhr.responseText);

      stlFilePath = xhr.responseText;

      var data = JSON.parse(stlFilePath);
      if (data.status == "success") {
        stlFilePath = data.path;

        error = null;

        calculate();
      } else {
        stlFilePath = null;
        error = data.error;
        document.getElementById("gt").innerText = "";
      }

      document.getElementById("error").innerHTML = error;
    }
  };

  //Dont submit the form.
  return false;
};
var expected = 0;
var gcode_ = "",
  filament_used = "",
  mode,
  sliceShells,
  sliceFillSparse,
  sliceTopLayers,
  sliceBottomLayers;
function display_message(msg) {
  console.log(msg);
  // document.getElementById("msg").innerText +="<br/>"+ msg
  //   ? Object.keys(msg).join(" - ")
  //   : "";
}

function display_gcode(gcode) {
  console.log(gcode);
  gcode_ = gcode.split("\n");
  //extract the gcode from the gcode text
  filament_used = gcode_[gcode_.length - 2];
  filament_used = filament_used.slice(filament_used.search("[0-9]"));
  filament_used = filament_used.split(" "); //"2044.21", "mm",
  filament_used = {
    length: filament_used[0],
    unit: filament_used[1],
  };

  console.log(filament_used);

  // console.log(gcode)

  document.getElementById("gt").innerText = "OP:" + filament_used.length; // JSON.stringify(filament_used);
  document.getElementById("error").innerText =
    "Diff:" + (expected - filament_used.length);
  // display_message();
  // $('dfoot').style.display = 'block';
  // $('gfoot').style.display = '';
}

function calculate() {
  // kiri Kiri:Moto Javascript Engine
  kiri
    .newEngine()
    .setListener(display_message)
    .load(stlFilePath)
    // .then((eng) =>
    //   eng.setProcess({
    //     sliceShells: 1,
    //     sliceFillSparse: 0.25,
    //     sliceTopLayers: 2,
    //     sliceBottomLayers: 2,
    //   })
    // )
    // .then((eng) =>
    //   eng.setDevice({
    //     gcodePre: ["M82", "M104 S220"],
    //     gcodePost: ["M107"],
    //   })
    // )
    .then((eng) => eng.slice())
    .then((eng) => eng.prepare())
    .then((eng) => eng.export())
    .then(display_gcode);
}

calculate();
