

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




console.log("Supabase client:", supabase);

//   // ============ To-Do Logic (Dashboard only) ============
  const addTaskBtn = document.getElementById("addTask");
  const searchTask = document.getElementById("search");
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  if (addTaskBtn && taskInput && taskList) {
  addTaskBtn.addEventListener('click', async () => {
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    // Get current user
    const {
      data: { user },
      error: userError
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('User not logged in');
      alert('You must be logged in to add tasks.');
      return;
    }

   
    const { data, error } = await supabase
      .from('todo')
      .insert([{ task: taskText, user_id: user.id }]);

    if (error) {
      console.error('Error saving task:', error.message);
      return;
    }

    const insertedTask = data[0]; 

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

    deleteBtn.addEventListener('click', async () => {
      li.remove();
      await supabase.from('todo').delete().eq('id', insertedTask.id);
    });

    editBtn.addEventListener('click', async () => {
      if (editBtn.textContent === 'Edit') {
        const input = document.createElement('input');
        input.type = 'text';
        input.value = span.textContent;
        input.className = 'border border-gray-300 rounded px-2 py-1 w-full mr-2 text-sm';
        li.insertBefore(input, span);
        li.removeChild(span);
        editBtn.textContent = 'Save';
      } else {
        const input = li.querySelector('input');
        const newText = input.value.trim();
        if (newText !== '') {
          span.textContent = newText;
          li.insertBefore(span, input);
          li.removeChild(input);
          editBtn.textContent = 'Edit';

          await supabase.from('todo').update({ task: newText }).eq('id', insertedTask.id);
        }
      }
    });

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    li.appendChild(span);
    li.appendChild(actions);
    taskList.appendChild(li);

    taskInput.value = '';
  });
}


  
  if (addTaskBtn && taskInput && taskList) {
    addTaskBtn.addEventListener('click', async () => {

      
      const taskText = taskInput.value.trim();
      if (taskText !== '') {
 const { data, error } = await supabase
    .from('todo')
    .insert([{ task: taskText }]);  // You can also include user_id if needed

  if (error) {
    console.error('Error saving task:', error.message);
    return;
  }

  console.log('Task saved:', data);



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

async function loadTasksFromSupabase() {
  const { data, error } = await supabase .from('todo') .select('*');

  if (error) {
    console.error('Error fetching tasks:', error.message);
    return;
  }

  console.log('Fetched tasks:', data);
  // Optionally: renderTasks(data);
}
if (taskList) {
  loadTasksFromSupabase(); 
}


});



