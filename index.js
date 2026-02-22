
//Minimal import of debug scripts / controls based on local storage setting
const DEBUG = localStorage.getItem("DEBUG") === "true"

if (DEBUG) {
  import("./debug.js").then((debugControls) => {
    debugControls.debugStartup()
  })
}
