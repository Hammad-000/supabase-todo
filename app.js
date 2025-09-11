

// const supabaseUrl = 'https://ctqdsnvpqgzuqfanjhdq.supabase.co';
// //const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cWRzbnZwcWd6dXFmYW5qaGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3Nzg5NTksImV4cCI6MjA3MjM1NDk1OX0.zBh2-jNve1EYD53QtbLFg3llTEBJnFucAUAYRE4OaeY';
// const supabaseKey ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cWRzbnZwcWd6dXFmYW5qaGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3Nzg5NTksImV4cCI6MjA3MjM1NDk1OX0.zBh2-jNve1EYD53QtbLFg3llTEBJnFucAUAYRE4OaeY'
// const supabase = supabase.createClient(supabaseUrl, supabaseKey);


// import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

document.addEventListener('DOMContentLoaded', () => {
  const supabaseUrl = 'https://ctqdsnvpqgzuqfanjhdq.supabase.co';
  const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cWRzbnZwcWd6dXFmYW5qaGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3Nzg5NTksImV4cCI6MjA3MjM1NDk1OX0.zBh2-jNve1EYD53QtbLFg3llTEBJnFucAUAYRE4OaeY';
  const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

  // Common elements
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const signupBtn = document.getElementById("signup");
  const loginBtn = document.getElementById("login");
  const logoutBtn = document.getElementById("logoutBtn");

  // Only attach auth events if elements exist
  if (loginBtn && emailInput && passwordInput) {
    loginBtn.addEventListener('click', () => {
      const email = emailInput.value;
      const password = passwordInput.value;
      logIn(email, password);
    });
  }

  if (signupBtn && emailInput && passwordInput) {
    signupBtn.addEventListener('click', () => {
      const email = emailInput.value;
      const password = passwordInput.value;
      signUp(email, password);
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error.message);
      } else {
        window.location.href = 'index.html';
      }
    });
  }

  async function signUp(email, password) {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) {
      console.error('Error signing up:', error.message);
    } else {
      console.log('Sign-up response:', data);
      alert('Check your email for a confirmation link.');
      window.location.href = 'dashboard.html';
    }
  }

  async function logIn(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      console.error('Error logging in:', error.message);
    } else {
      console.log('User logged in:', data);
      window.location.href = 'dashboard.html';
    }
  }

  // ============ To-Do Logic (Dashboard only) ============
  const addTaskBtn = document.getElementById("addTask");
  const searchTask = document.getElementById("search");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (addTaskBtn && taskInput && taskList) {
    addTaskBtn.addEventListener('click', () => {
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center text-gray-800 border border-gray-400 rounded px-3 py-1 bg-gray-100';

        const span = document.createElement('span');
        span.textContent = taskText;

        const actions = document.createElement('div');
        actions.className = 'space-x-2';

        const editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';
        editBtn.className = 'text-blue-500 hover:underline text-sm';

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'text-red-500 hover:underline text-sm';
        deleteBtn.addEventListener('click', () => {
          li.remove();
        });

        editBtn.addEventListener('click', () => {
          if (editBtn.textContent === 'Edit') {
            const input = document.createElement('input');
            input.type = 'text';
            input.value = span.textContent;
            input.className = 'border border-gray-300 rounded px-2 py-1 w-full mr-2 text-sm';

            li.insertBefore(input, span);
            li.removeChild(span);
            editBtn.textContent = 'Save';
          } else {
            const newText = li.querySelector('input').value.trim();
            if (newText !== '') {
              span.textContent = newText;
            }
            li.insertBefore(span, li.querySelector('input'));
            li.removeChild(li.querySelector('input'));
            editBtn.textContent = 'Edit';
          }
        });

        actions.appendChild(editBtn);
        actions.appendChild(deleteBtn);

        li.appendChild(span);
        li.appendChild(actions);

        taskList.appendChild(li);
        taskInput.value = '';
      }
    });
  }

  if (searchTask && taskList) {
    searchTask.addEventListener('input', () => {
      const searchTerm = searchTask.value.toLowerCase();
      const tasks = taskList.getElementsByTagName('li');

      Array.from(tasks).forEach(task => {
        const span = task.querySelector('span');
        if (span) {
          const taskText = span.textContent.toLowerCase();
          task.style.display = taskText.includes(searchTerm) ? '' : 'none';
        }
      });
    });
  }
});





// document.addEventListener('DOMContentLoaded', () => {

// const supabaseUrl = 'https://ctqdsnvpqgzuqfanjhdq.supabase.co';
// const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0cWRzbnZwcWd6dXFmYW5qaGRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTY3Nzg5NTksImV4cCI6MjA3MjM1NDk1OX0.zBh2-jNve1EYD53QtbLFg3llTEBJnFucAUAYRE4OaeY';

// const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// const emailInput = document.getElementById("email");
// const passwordInput = document.getElementById("password");
// const signupBtn = document.getElementById("signup");
// const loginBtn = document.getElementById("login");
// const logoutBtn = document.getElementById("logout");

// const addTaskBtn = document.getElementById("addTask");
// const searchTask = document.getElementById("search");
// const taskInput = document.getElementById("taskInput");
// const taskList = document.getElementById("taskList");


// ///=============================================///

// async function signUp(email, password) {
//       const { data, error } = await supabase.auth.signUp({ email, password });


//       if (logoutBtn) {
//   logoutBtn.addEventListener('click', async () => {
//     const { error } = await supabase.auth.signOut();
//     if (error) {
//       console.error('Error signing out:', error.message);
//     } else {
//       window.location.href = 'index.html';
//     }
//   });
// }

    
//       if (error) {
//             console.error('Error signing up:', error.message);
//           } else {
//                 console.log('Sign-up response:', data);
//                 alert('Check your email for a confirmation link.');
//                 window.location.href = 'dashboard.html';
//               }
//             }
            
//             async function logIn(email, password) {
//                   const { data, error } = await supabase.auth.signInWithPassword({
//                         email,
//                         password
//                       });
                    
//                       if (error) {
//                             console.error('Error logging in:', error.message);
//                           } else {
//                                 console.log('User logged in:', data);
//                                 window.location.href = 'dashboard.html';
//                               }
//                             }
                            
//                             document.getElementById('login').addEventListener('click', () => {
//                                   const email = document.getElementById('email').value;
//                                   const password = document.getElementById('password').value;
//                                   logIn(email, password);
//                                 });
                                
//                                 document.getElementById('signup').addEventListener('click', () => {
//                                       const email = document.getElementById('email').value;
//                                       const password = document.getElementById('password').value;
//                                       signUp(email, password);
//                                     });
                                    

    
    
    
    
//     //----------todo---------------------//
    
  
//     addTaskBtn.addEventListener('click', () => {
//   const taskText = taskInput.value.trim();
//   if (taskText !== '') {
//     const li = document.createElement('li');
//     li.className = 'flex justify-between items-center text-gray-800 border border-gray-400 rounded px-3 py-1 bg-gray-100';

//     const span = document.createElement('span');
//     span.textContent = taskText;

//     const actions = document.createElement('div');
//     actions.className = 'space-x-2';

//     const editBtn = document.createElement('button');
//     editBtn.textContent = 'Edit';
//     editBtn.className = 'text-blue-500 hover:underline text-sm';

//     const deleteBtn = document.createElement('button');
//     deleteBtn.textContent = 'Delete';
//     deleteBtn.className = 'text-red-500 hover:underline text-sm';
//     deleteBtn.addEventListener('click', () => {
//       li.remove();
//     });

   
//     editBtn.addEventListener('click', () => {
//       if (editBtn.textContent === 'Edit') {
//         const input = document.createElement('input');
//         input.type = 'text';
//         input.value = span.textContent;
//         input.className = 'border border-gray-300 rounded px-2 py-1 w-full mr-2 text-sm';

//         li.insertBefore(input, span);
//         li.removeChild(span);

//         editBtn.textContent = 'Save';
//       } else {
//         const newText = li.querySelector('input').value.trim();
//         if (newText !== '') {
//           span.textContent = newText;
//         }

//         li.insertBefore(span, li.querySelector('input'));
//         li.removeChild(li.querySelector('input'));

//         editBtn.textContent = 'Edit';
//       }
//     });

//     actions.appendChild(editBtn);
//     actions.appendChild(deleteBtn);

//     li.appendChild(span);
//     li.appendChild(actions);

//     taskList.appendChild(li);
//     taskInput.value = '';
//   }
// });


// searchTask.addEventListener('input', () => {
//   const searchTerm = searchTask.value.toLowerCase();
//   const tasks = taskList.getElementsByTagName('li');

//   Array.from(tasks).forEach(task => {
//     const span = task.querySelector('span');
//     if (span) {
//       const taskText = span.textContent.toLowerCase();
//       task.style.display = taskText.includes(searchTerm) ? '' : 'none';
//     }
//   });
// });

// });


////-----------------




// document.addEventListener('DOMContentLoaded', () => {
//   const taskInput = document.getElementById('taskInput');
//   const searchTask = document.getElementById('search');
//   const addTaskBtn = document.getElementById('addTask');
//   const deleteTaskBtn = document.getElementById('deleteTask');
//   const editTaskBtn = document.getElementById('editTask');
//   const taskList = document.getElementById('taskList');

//   addTaskBtn.addEventListener('click', () => {
//     const taskText = taskInput.value.trim();
//     if (taskText !== '') {
//       const li = document.createElement('li');
//       li.textContent = taskText;
//       li.className = 'text-gray-800 border border-gray-400 rounded px-3 py-1 bg-gray-100';
     
//       taskList.appendChild(li);
//       taskInput.value = '';
//     }
//   });

//   taskInput.addEventListener('keypress', (e) => {
//     if (e.key === 'Enter') {
//       addTaskBtn.click();
//     }
//   });
// });



// const taskInput = document.getElementById('taskInput');
// const searchTask = document.getElementById('search');
// const addTaskBtn = document.getElementById('addTask');
// const deleteTaskBtn = document.getElementById('deleteTask');
// const editTaskBtn = document.getElementById('editTask');
// const taskList = document.getElementById('taskList');

// addTaskBtn.addEventListener('click', () => {
//   const taskText = taskInput.value.trim();

//   if (taskText !== '') {
//     const li = document.createElement('li');
//     li.textContent = taskText;
//     li.className = 'text-gray-800';

//     taskList.appendChild(li);
//     taskInput.value = '';
//   }
// });

// taskInput.addEventListener('keypress', (e) => {
//   if (e.key === 'Enter') {
//     addTaskBtn.click();
//   }
// });





// const taskInput = document.getElementById('taskInput');
// const addTaskBtn = document.getElementById('addTaskBtn');
// const taskList = document.getElementById('taskList');

// addTaskBtn.addEventListener('click', () => {
//   const taskText = taskInput.value.trim();

//   if (taskText !== '') {
//     const li = document.createElement('li');
//     li.textContent = taskText;
//     li.className = 'text-gray-800';

//     taskList.appendChild(li);
//     taskInput.value = '';
//   }
// });

// // Optional: Add task by pressing Enter key
// taskInput.addEventListener('keypress', (e) => {
//   if (e.key === 'Enter') {
//     addTaskBtn.click();
//   }
// });

// signupBtn.addEventListener("click", async () => {
//   showToast("Creating your account...", undefined, "loading");
//   const { error } = await supabase.auth.signUp({
//     email: emailInput.value,
//     password: passwordInput.value,
//   });
//   hideToast();
//   if (error) {
//     showToast(error.message, 2500, "error");
//   } else {
//     showToast("Signup successful! Check your email.", 2500, "success");
//   }
// });

// loginBtn.addEventListener("click", async () => {
//   showToast("Logging in...", undefined, "loading");
//   const { error } = await supabase.auth.signInWithPassword({
//     email: emailInput.value,
//     password: passwordInput.value,
//   });
//   hideToast();
//   if (error) {
//     showToast(error.message, 2500, "error");
//   } else {
//     showToast("Welcome back!", 1200, "success");
//     showNotes();
//   }
// });

// // logoutBtn.addEventListener("click", async () => {
// //   showToast("Signing out...", undefined, "loading");
// //   await supabase.auth.signOut();
// //   hideToast();
// //   authSection.style.display = "block";
// //   notesSection.style.display = "none";
// //   // Hide logout in header on sign out
// //   if (logoutBtn) logoutBtn.classList.add("hidden");
// //   showToast("Signed out", 1200, "success");
// // });


// (async () => {
//     const data = await supabase.auth.getSession()
//     const user = await supabase.auth.getUser()

//     console.log(user)

//     console.log("session data", data)
// })()







