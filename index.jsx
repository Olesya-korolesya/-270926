// // Задание 1
// //  Счётчик с шагом
// // Кнопки «+» и «−» меняют число. Рядом поле ввода, задающее шаг изменения (по умолчанию 1). 
// // Шаг хранится отдельным состоянием, ввод нечисловых символов игнорируется.

// import React from "react";
// import {createRoot} from "react-dom/client"
// import {useState} from "react"

// function Counter() {

//   const [count, setCount] = useState(0); 
//   const [step, setStep] = useState(1); 

//   const increment = () => {
//     setCount(prevCount => prevCount + step);
//   };

//   const decrement = () => {
//     setCount(prevCount => prevCount - step);
//   };

//   const handleStepChange = (event) => {
    
//     const newStep = parseInt(event.target.value, 10) || 1;
//     setStep(newStep);
//   };

//   return (
//     <div style={{textAlign: 'center', padding: '20px'}}>
//       <h2>Счётчик: {count}</h2>
//       <label>Шаг: <input type="number" value={step} onChange={handleStepChange} /></label>
//       <button onClick={increment}>+</button>
//       <button onClick={decrement}>-</button>
//     </div>
//   );
// }

// createRoot(document.getElementById("app"))
// .render(
//   <Counter/>
// )

// // Задание 2
// // Живой заголовок вкладки
// // Поле ввода, текст из которого попадает в document.title.
// //  При размонтировании компонента вернуть исходный заголовок.

// import React, { useState, useEffect } from 'react';
// import {createRoot} from 'react-dom/client';

// const MyInputComponent = () => {
// const [titleText, setTitleText] = useState('Исходный заголовок');

//   useEffect(() => {
//     const originalTitle = document.title;
//     document.title = titleText;

//     return () => {
//     document.title = originalTitle;
//     };
//   }, [titleText]);

//   return (
//     <div>
//       <label>
//         Введите текст:
//         <input
//           type="text"
//           value={titleText}
//           onChange={(e) => setTitleText(e.target.value)}
//         />
//       </label>
//     </div>
//   );
// };

// createRoot(document.getElementById('app')).render(<MyInputComponent />);

// // Задание 3
// //  Таймер обратного отсчёта
// // Ввод количества секунд, кнопки «Старт», «Пауза», «Сброс». Отсчёт через setInterval,
// // интервал обязательно очищается в функции возврата из useEffect. Проверьте, 
// // что при быстром нажатии «Старт» несколько раз не появляется два таймера.

// import React, { useState, useEffect } from 'react';
// import { createRoot } from 'react-dom/client';

// function Timer() {
//   const [seconds, setSeconds] = useState(0);
//   const [isActive, setIsActive] = useState(false); 

//   useEffect(() => {
//     let interval = null;

//     if (isActive && seconds > 0) {
//       interval = setInterval(() => {
//         setSeconds((prevSeconds) => prevSeconds - 1);
//       }, 1000);
//     } else if (seconds === 0) {
//       setIsActive(false); 
//     }

//     return () => clearInterval(interval);
//   }, [isActive, seconds]);

//   const handleStart = () => {
//     if (seconds > 0) setIsActive(true);
//   };

//   const handlePause = () => {
//     setIsActive(false);
//   };

//   const handleReset = () => {
//     setIsActive(false);
//     setSeconds(0);
//   };

//   return (
//     <div>
//       <input 
//         type="number" 
//         placeholder="Введите количество секунд" 
//         value={seconds || ''} 
//         onChange={e => setSeconds(parseInt(e.target.value) || 0)} 
//         disabled={isActive} 
//       />
//       <button onClick={handleStart}>Старт</button>
//       <button onClick={handlePause}>Пауза</button>
//       <button onClick={handleReset}>Сброс</button>
      
//       <p id="timer">Осталось: {seconds} сек.</p>
//     </div>
//   );
// }

// createRoot(document.getElementById("app")).render(<Timer />);

// // Задание 4
// // Форма с валидацией на лету
// //Поля email и пароль. Ошибки пересчитываются в useEffect при изменении значений, 
// // кнопка «Отправить» заблокирована, пока есть хотя бы одна ошибка.

// import React, { useState, useEffect } from 'react';
// import { createRoot } from 'react-dom/client';

// function RegistrationForm() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
  
//   const [touchedEmail, setTouchedEmail] = useState(false);
//   const [touchedPassword, setTouchedPassword] = useState(false);

//   const validateEmail = (email) => {
//     if (!email) return 'Email обязателен';
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return 'Введён неправильный email';
//     }
//     return ''; 
//   };

//   const validatePassword = (password) => {
//     if (!password) return 'Пароль обязателен';
//     if (password.length < 8) return 'Минимум 5 символов';
//     if (!/\d/.test(password)) return 'Должна быть цифра';
//     if (!/[a-z]/.test(password)) return 'Должна быть строчная буква';
//     if (!/[A-Z]/.test(password)) return 'Должна быть большая буква';
//     return ''; 
//   };

//   const emailError = validateEmail(email);
//   const passwordError = validatePassword(password);

//   const isFormInvalid = !!emailError || !!passwordError;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!isFormInvalid) {
//       console.log('Данные отправлены:', { email, password });
//     }
//   };

//     return (
//     <form onSubmit={handleSubmit}>
//       <div>
//         <label>
//           Email:
//           <input 
//             type="email" 
//             value={email} 
//             onChange={e => setEmail(e.target.value)} 
//             onBlur={() => setTouchedEmail(true)}
//           />
//         </label>
   
//         {touchedEmail && emailError && <p style={{ color: 'red' }}>Ошибка: {emailError}</p>}
//       </div>

//       <div>
//         <label>
//           Пароль:
//           <input 
//             type="password" 
//             value={password} 
//             onChange={e => setPassword(e.target.value)} 
//             onBlur={() => setTouchedPassword(true)}
//           />
//         </label>
//         {touchedPassword && passwordError && <p style={{ color: 'red' }}>Ошибка: {passwordError}</p>}
//       </div>

//       <button type="submit" disabled={isFormInvalid}>
//         Отправить
//       </button>
//     </form>
//   );
// }

// createRoot(document.getElementById("app"))
// .render(< RegistrationForm />);

// Задание 5
//  Список дел
// Добавление, удаление, переключение «выполнено». Состояние — массив объектов, 
// обновлять иммутабельно (map, filter, спред). Отдельным состоянием — фильтр: все / 
// активные / выполненные.

// import React, { useState } from 'react';
// import { createRoot } from 'react-dom/client';

// export default function TodoApp() {
//   const [todos, setTodos] = useState([
//     { id: 1, text: 'Иммутабельность', completed: true },
//     { id: 2, text: 'Написать Todo App', completed: false },
//   ]);

//   const [filter, setFilter] = useState('all');

//   const [inputValue, setInputValue] = useState('');

//   const addTodo = (e) => {
//     e.preventDefault();
//     if (!inputValue.trim()) return;

//     const newTodo = {
//       id: Date.now(), 
//       text: inputValue,
//       completed: false,
//     };

//     setTodos([...todos, newTodo]);
//     setInputValue('');
//   };

//   const toggleTodo = (id) => {
//     setTodos(
//       todos.map((todo) =>
//         todo.id === id ? { ...todo, completed: !todo.completed } : todo
//       )
//     );
//   };

//   const deleteTodo = (id) => {
//     setTodos(todos.filter((todo) => todo.id !== id));
//   };

//   const filteredTodos = todos.filter((todo) => {
//     if (filter === 'active') return !todo.completed;
//     if (filter === 'completed') return todo.completed;
//     return true;
//   });

//   return (
//     <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
//       <h2>Список дел</h2>

//       <form onSubmit={addTodo} style={{ marginBottom: '20px' }}>
//         <input
//           type="text"
//           value={inputValue}
//           onChange={(e) => setInputValue(e.target.value)}
//           placeholder="Что нужно сделать?"
//           style={{ padding: '8px', marginRight: '8px', width: '250px' }}
//         />
//         <button type="submit" style={{ padding: '8px 12px' }}>Добавить</button>
//       </form>

//       <div style={{ marginBottom: '20px', display: 'flex', gap: '8px' }}>
//         <button 
//           onClick={() => setFilter('all')} 
//           style={{ fontWeight: filter === 'all' ? 'bold' : 'normal' }}
//         >
//           Все
//         </button>
//         <button 
//           onClick={() => setFilter('active')} 
//           style={{ fontWeight: filter === 'active' ? 'bold' : 'normal' }}
//         >
//           Активные
//         </button>
//         <button 
//           onClick={() => setFilter('completed')} 
//           style={{ fontWeight: filter === 'completed' ? 'bold' : 'normal' }}
//         >
//           Выполненные
//         </button>
//       </div>

//      <ul style={{ listStyle: 'none', padding: 0 }}>
//         {filteredTodos.map((todo) => (
//           <li
//             key={todo.id}
//             style={{
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               padding: '8px 0',
//               borderBottom: '1px solid #ccc',
//             }}
//           >
//             <span
//               onClick={() => toggleTodo(todo.id)}
//               style={{
//                 textDecoration: todo.completed ? 'line-through' : 'none',
//                 cursor: 'pointer',
//                 flexGrow: 1,
//               }}
//             >
//               {todo.text}
//             </span>
//             <button 
//               onClick={() => deleteTodo(todo.id)} 
//               style={{ color: 'red', marginLeft: '10px' }}
//             >
//               Удалить
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// createRoot(document.getElementById("app"))
// .render(< TodoApp />);

// Задание 6
//По id пользователя (поле ввода) грузить https://jsonplaceholder.typicode.com/users/{id}. 
// Три состояния: data, loading, error. Эффект зависит от id. Отменять устаревший запрос
// через AbortController или флаг ignore, чтобы поздний ответ не перезаписал свежий.

// import React, { useState, useEffect } from 'react';
// import { createRoot } from 'react-dom/client';

// function UserComponent({ userId, onUserIdChange }) { 
//   const [user, setUser] = useState(null);
//   const [loading, setLoading] = useState(false); 
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     if (!userId) {
//       setUser(null);
//       setError(null);
//       setLoading(false);
//       return;
//     }

//     const controller = new AbortController();
//     const signal = controller.signal;

//     const fetchUser = async () => {
//       setLoading(true); 
//       setError(null);
//       try {
//         const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { signal });
//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setUser(data);
//       } catch (err) {
//         if (err.name !== 'AbortError') {
//           setError(err.message);
//           setUser(null);
//         }
//       } finally {
//           if (!signal.aborted) {
//           setLoading(false);
//         }
//       }
//     };

//     fetchUser();
//     return () => {
//     controller.abort();
//     };
//   }, [userId]); 

//   useEffect(() => {
//     if (onUserIdChange) {
//       onUserIdChange(userId);
//     }
//   }, [userId, onUserIdChange]);

//   if (loading) return <div>Загрузка...</div>;
//   if (error) return <div>Ошибка: {error}</div>;
//   if (!user) return <div>Введите или выберите ID пользователя</div>; 

//   return <div>Имя: {user.name}, Email: {user.email}</div>;
// }

// function App() {
//   const [id, setId] = useState('');

//   return (
//     <div style={{ padding: '20px' }}>
//       <input 
//         type="number" 
//         placeholder="Введите ID (например, 1)" 
//         value={id} 
//         onChange={(e) => setId(e.target.value)} 
//       />
//       <hr />
//       <UserComponent userId={id} onUserIdChange={(currentId) => console.log(`Выбран ID: ${currentId}`)} />
//     </div>
//   );
// }

// createRoot(document.getElementById("app"))
// .render(<App />);

// Задание 7
// Поле ввода, запрос уходит только через 500 мс после того, как пользователь перестал
// печатать. Реализуется через setTimeout внутри useEffect + clearTimeout в cleanup.

// import React, { useState, useEffect } from 'react';
// import { createRoot } from 'react-dom/client';

// const fetchData = (query) => {
//   console.log('Запрос с запросом:', query);
// }

// export default function SearchInput() {
//   const [query, setQuery] = useState('');

//   useEffect(() => {

//     const timerId = setTimeout(() => {
//     fetchData(query);
//     }, 500);

//     return () => clearTimeout(timerId);
//   }, [query]);

//   return (
//     <input
//       value={query}
//       onChange={(e) => setQuery(e.target.value)}
//       placeholder="Введите что-то..."
//     />
//   );
// }
// createRoot(document.getElementById("app"))
// .render(<SearchInput />);

// Задание 8
// Тема оформления (light / dark). Начальное значение читается из localStorage через ленивую
// инициализацию useState(() => ...), а useEffect записывает изменения обратно и вешает
// класс на <body>.

// import { createRoot } from 'react-dom/client';
// import { useState, useEffect } from 'react';
// import './theme.css'; 

// function ThemeToggle() {
  
//   const [theme, setTheme] = useState(() => {
//     try {
//       const savedTheme = localStorage.getItem('theme');
//       return savedTheme ? savedTheme : 'light';
//     } catch (error) {
//       console.error('Ошибка чтения из localStorage:', error);
//       return 'light';
//     }
//   });
  
//   useEffect(() => {
//     try {
//       localStorage.setItem('theme', theme);
//     } catch (error) {
//       console.error('Ошибка записи в localStorage:', error);
//     }
//   }, [theme]);

//   const toggleTheme = () => {
//     setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
//   };

//   return (
//     <div className={`theme-${theme}`}>
//       <h1>Тема: {theme}</h1>
//       <button onClick={toggleTheme}>Переключить тему</button>
//     </div>
//   );
// }

// createRoot(document.getElementById("app"))
// .render(<ThemeToggle />);

// Задание 9
// Компонент показывает текущие ширину/высоту окна и статус соединения. 
// Подписка на resize, online, offline в useEffect, обязательная отписка в cleanup. 
// Бонус: вынести в кастомные хуки useWindowSize и useOnlineStatus.

// import { createRoot } from 'react-dom/client';
// import { useState, useEffect } from 'react';

// export const useWindowSize = () => {
//   const [windowSize, setWindowSize] = useState({
//     width: typeof window !== 'undefined' ? window.innerWidth : 1200, 
//     height: typeof window !== 'undefined' ? window.innerHeight : 800,
//   });

//   useEffect(() => {
//     const handleResize = () => {
//       setWindowSize({
//         width: window.innerWidth,
//         height: window.innerHeight,
//       });
//     };

//     handleResize();

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []); 

//   return windowSize;
// };

// export const useOnlineStatus = () => {
//   const [isOnline, setIsOnline] = useState(
//     typeof window !== 'undefined' ? navigator.onLine : true
//   );

//   useEffect(() => {
//     setIsOnline(navigator.onLine);

//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []); 

//   return isOnline;
// };

// export default function App() {

//   const size = useWindowSize();
//   const isOnline = useOnlineStatus();

//   return (
//     <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
//       <h1>Компонент</h1>
      
//       <p>
//         <strong>Размер окна:</strong> {size.width}px x {size.height}px
//       </p>
      
//       <p>
//         <strong>Статус соединения:</strong>{' '}
//         <span style={{ color: isOnline ? 'green' : 'red' }}>
//           {isOnline ? 'В сети' : 'Офлайн'}
//         </span>
//       </p>
//     </div>
//   );
// }

// createRoot(document.getElementById("app"))
// .render(<App />);
