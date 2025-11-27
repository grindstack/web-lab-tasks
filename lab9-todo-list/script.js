// Separate JS extracted from the single-file version
(function(){
  const STORAGE_KEY = 'lab9_todos_v1';
  const listEl = document.getElementById('todo-list');
  const inputEl = document.getElementById('new-todo');
  const addBtn = document.getElementById('add-btn');
  const countEl = document.getElementById('todo-count');

  let todos = [];
  let editingId = null;
  const uid = ()=>crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(36)+Math.random().toString(36).slice(2);

  function save(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(todos)); }
  function load(){
    try{ todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []; }
    catch{ todos = []; }
  }

  function updateCount(){
    const total = todos.length;
    const pending = todos.filter(t=>!t.completed).length;
    countEl.textContent = `${pending} pending • ${total} total`;
  }

  function createTodoElement(todo){
    const li = document.createElement('li');
    li.className = 'todo-item';
    li.dataset.id = todo.id;

    const handle = document.createElement('div'); handle.className = 'handle';
    const label = document.createElement('label');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;

    const span = document.createElement('span');
    span.className = 'todo-text' + (todo.completed ? ' completed':'');
    span.textContent = todo.text;
    span.tabIndex = 0;

    function startEdit(){
      if(editingId) return;
      editingId = todo.id;
      const input = document.createElement('input');
      input.type='text'; input.value=todo.text;
      input.className='editor'; input.style.flex='1';
      label.replaceChild(input, span);
      input.focus();
      input.selectionStart = input.selectionEnd = input.value.length;

      function finish(saveChange){
        if(saveChange){
          const v = input.value.trim();
          if(v) todo.text = v;
          else todos = todos.filter(t=>t.id !== todo.id);
          save();
        }
        editingId = null;
        render();
      }

      input.addEventListener('keydown', e=>{
        if(e.key==='Enter') finish(true);
        if(e.key==='Escape') finish(false);
      });
      input.addEventListener('blur', ()=>finish(true));
    }

    span.addEventListener('dblclick', startEdit);
    span.addEventListener('keydown', e=>{ if(e.key==='Enter') startEdit(); });

    label.appendChild(checkbox); label.appendChild(span);
    handle.appendChild(label);

    const controls = document.createElement('div'); controls.className='controls';
    const editBtn = document.createElement('button'); editBtn.className='icon-btn'; editBtn.innerHTML='✏️';
    const delBtn = document.createElement('button'); delBtn.className='icon-btn'; delBtn.innerHTML='🗑️';

    editBtn.addEventListener('click', startEdit);
    delBtn.addEventListener('click', ()=>{
      todos = todos.filter(t=>t.id !== todo.id);
      save(); render();
    });

    checkbox.addEventListener('change',()=>{
      todo.completed = checkbox.checked;
      save(); render();
    });

    controls.appendChild(editBtn); controls.appendChild(delBtn);
    li.appendChild(handle); li.appendChild(controls);
    return li;
  }

  function render(){
    listEl.innerHTML='';
    if(!todos.length){
      const p=document.createElement('p'); p.textContent='No tasks yet — add one above.';
      p.style.color='var(--muted)'; p.style.padding='12px';
      listEl.appendChild(p);
    } else {
      todos.forEach(todo=> listEl.appendChild(createTodoElement(todo)));
    }
    updateCount();
  }

  function addTodo(){
    const text = inputEl.value.trim(); if(!text) return;
    todos.unshift({id:uid(), text, completed:false});
    inputEl.value=''; save(); render(); inputEl.focus();
  }

  addBtn.addEventListener('click', addTodo);
  inputEl.addEventListener('keydown', e=>{ if(e.key==='Enter') addTodo(); });

  load(); render();
})();
