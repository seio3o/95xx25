document.addEventListener("keydown", function (e) {
    if (e.code === "Space") {
      const boot = document.getElementById("boot-screen");
      const desktop = document.getElementById("desktop");
      const bootSound = document.getElementById("bootSound");
  
      bootSound.play();
  
      boot.style.transition = "opacity 1s ease";
      boot.style.opacity = 0;
  
      setTimeout(() => {
        boot.style.display = "none";
        desktop.classList.remove("hidden");
      }, 1000);
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const bootScreen = document.getElementById("boot-screen");
    const desktop = document.getElementById("desktop");
    const bootSound = document.getElementById("bootSound");
  

    bootScreen.addEventListener("click", openDesktop);
    bootScreen.addEventListener("touchstart", openDesktop); 
  
    function openDesktop() {
      bootSound.play();
  

      bootScreen.style.transition = "opacity 1s ease";
      bootScreen.style.opacity = 0;
  
      
      setTimeout(() => {
        bootScreen.style.display = "none";
        desktop.classList.remove("hidden");
      }, 1000);
    }
  });
  


  

  document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll('.close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        minimizeWindow(id);
      });
    });
  });
  
  function minimizeWindow(id) {
    const win = document.getElementById(id);
    if (win) {
        win.classList.add('minimized');

        const taskbarBtn = document.querySelector(`.taskbar-btn[data-id="${id}"]`);
        if (taskbarBtn) {
            taskbarBtn.remove(); 
        }
    }
}


  
  function openWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;

    win.classList.remove("hidden", "minimized");

    let taskbarBtn = document.querySelector(`.taskbar-btn[data-id="${id}"]`);
    if (!taskbarBtn) {
        taskbarBtn = document.createElement("button");
        taskbarBtn.className = "taskbar-btn";
        taskbarBtn.textContent = win.querySelector(".title-bar-text")?.textContent || "Window";
        taskbarBtn.setAttribute("data-id", id);
        taskbarBtn.addEventListener("click", () => toggleWindow(id));
        document.getElementById("taskbar-windows").appendChild(taskbarBtn);
    }
}
  
  
function toggleWindow(id) {
  const win = document.getElementById(id);
  if (win.classList.contains("minimized")) {
      win.classList.remove("minimized");
  } else {
      win.classList.add("minimized");
  }
}




  
  
  
  

  function updateClock() {
    const clock = document.getElementById("clock");
    const now = new Date();
    clock.innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  setInterval(updateClock, 1000);
  updateClock();



  document.querySelectorAll('.window').forEach(makeDraggable);

    function makeDraggable(windowEl) {
    const titleBar = windowEl.querySelector('.title-bar');
    let offsetX = 0, offsetY = 0, isDragging = false;

    titleBar.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - windowEl.offsetLeft;
        offsetY = e.clientY - windowEl.offsetTop;
        windowEl.style.zIndex = 1000; 
        windowEl.classList.add('dragging');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        windowEl.style.left = `${e.clientX - offsetX}px`;
        windowEl.style.top = `${e.clientY - offsetY}px`;
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        windowEl.classList.remove('dragging');
    });
    }


    
    
    function closePowerShell() {
      document.getElementById('powershellWindow').style.display = 'none';
    }


const startBtn = document.querySelector('.start-button');
const startMenu = document.getElementById('startMenu');

startBtn.addEventListener('click', () => {
  startMenu.classList.toggle('hidden');
});


function openPowerShell() {
  const powershell = document.getElementById('powershellWindow');
  powershell.classList.remove('hidden');
  powershell.classList.add('centered');
  startMenu.classList.add('hidden');

  document.getElementById("powershellInput").focus();
}


function closePowerShell() {
  const powershell = document.getElementById('powershellWindow');
  powershell.classList.add('hidden');
}

function handleCommand(event) {
  if (event.key === "Enter") {
    const input = document.getElementById("powershellInput");
    const output = document.getElementById("powershellOutput");
    const command = input.value.trim().toLowerCase();
    
    let response = "";

    switch (command) {
      case "credits":
        response = `
          <div>
            Credits to:<br>
            - <code>jdan</code> (UI Framework)<br>
            - <code>Alex Meub</code> (Windows 98 icons)<br>
            - <code>frogapples</code> ("Website" Text GIF Background)<br>
             - <code>PainterKira</code> (About Me GIF Background)
          </div>
        `;
        break;
      case "help":
        response = `
          <div>
            Available Commands:<br>
            - <code>help</code>: List available commands<br>
            - <code>credits</code>: Show site credits<br>
          </div>
        `;
        break;
      default:
        response = `<div>'${command}' is not recognized as a command. Try <code>help</code>.</div>`;
    }

    const newOutput = document.createElement("div");
    
    newOutput.innerHTML = `<span class="prompt">PS C:\\Users\\Guest&gt;</span> ${command}<br>${response}<br>`;
    output.appendChild(newOutput);

    input.value = "";
    output.scrollTop = output.scrollHeight;
  }
}

function openSubProjects(projectName) {

  document.querySelector('.projectslist').classList.add('hidden');


  document.getElementById('subProjects').classList.remove('hidden');


  document.querySelectorAll('.sub-project-content').forEach(content => {
    content.classList.add('hidden');
  });


  const target = document.getElementById(projectName + 'Content');
  if (target) {
    target.classList.remove('hidden');
  }
}

function goBackToProjects() {

  document.querySelector('.projectslist').classList.remove('hidden');


  document.getElementById('subProjects').classList.add('hidden');
  document.querySelectorAll('.sub-project-content').forEach(content => {
    content.classList.add('hidden');
  });
}

// contact popup success
  document.getElementById("contactForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    try {
      const response = await fetch(form.action, {
        method: form.method,
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        form.reset();
        document.getElementById('successPopup').classList.remove('hidden');

        // Auto-close after 4 seconds
        setTimeout(() => {
          document.getElementById('successPopup').classList.add('hidden');
        }, 4000);
      } else {
        alert("Oops! Something went wrong.");
      }
    } catch (error) {
      alert("Failed to send. Please try again.");
    }
  });



   
  