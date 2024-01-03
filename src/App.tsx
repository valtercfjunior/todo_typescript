import React, { useState } from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import styles from './App.module.css'
import { TaskForm } from './components/TaskForm';

import { ITask } from './interfaces/Task';
import { TaskList } from './components/TaskList';
import { Modal } from './components/Modal';

function App() {

  const [taskList, setTaskList] = useState<ITask[]>([])
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null)

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter(task => {
      return task.id != id
    } ))
  }

  const hideOrShowModal = ():void => {
    const modal = document.querySelector("#modal")
    modal!.classList.toggle("hide")
  }

  const editTask = (task: ITask):void => {
    setTaskToUpdate(task)
    hideOrShowModal()

  }

  const updateTask = (task: ITask) => {
    const updatedTask: ITask = task

    const updatedItems = taskList.map((task) => {
      return task.id === updatedTask.id ? updatedTask : task 
    })

    setTaskList(updatedItems)
    hideOrShowModal()
  }

  return (
    <div >
      <Modal children={<TaskForm btnText='Editar' taskList={taskList} task={taskToUpdate} handleUpdate={updateTask}/>}/>
      <Header/>
      <main className={styles.main}>
        <div>
          <h2>O que você vai fazer?</h2>
        </div>
        <TaskForm btnText="Criar Tarefa" taskList={taskList} setTaskList={setTaskList} />

        <div>
          <h2>Suas tarefas:</h2>
          <TaskList  taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/>
        </div>

      </main>
      <Footer/>

    </div>
  );
}

export default App;
