import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

import { ITask } from "../interfaces/Task";

import styles from "./TaskForm.module.css";

interface Props {
	btnText: string;
	taskList: ITask[];
	setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
	task?: ITask | null;
	handleUpdate?(task: ITask): void
}

export function TaskForm({ btnText, taskList, setTaskList, task, handleUpdate }: Props) {
	const [id, setId] = useState<number>(0);
	const [title, setTitle] = useState<string>("");
	const [difficulty, setDifficulty] = useState<number>(0);

	useEffect(() => {
		if (task) {
			const { id, title, difficulty } = task;
			setId(id);
			setTitle(title);
			setDifficulty(difficulty);
		}
	}, [task]);

	const addTaskHandler = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (title != "") {
			if (handleUpdate) {
				handleUpdate({ id, title, difficulty })
			} else {
				const id = Math.floor(Math.random() * 1000);
				const newTask: ITask = { id, title, difficulty };

				setTaskList!([...taskList, newTask]);
				setTitle("");
				setDifficulty(0);
			}
		} else {
			window.alert("Digite um título para a Tarefa!");
		}
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		let value = e.target.value;
		if (e.target.name === "title") {
			setTitle(value);
		} else {
			setDifficulty(parseInt(value));
		}
	};

	return (
		<form className={styles.form} onSubmit={addTaskHandler}>
			<div className={styles.input_container}>
				<label htmlFor="title">Título</label>
				<input
					type="text"
					name="title"
					placeholder="Título da tarefa"
					onChange={handleChange}
					value={title}
				/>
			</div>
			<div className={styles.input_container}>
				<label htmlFor="difficulty">Dificuldade</label>
				<input
					type="number"
					name="difficulty"
					placeholder="Dificuldade da tarefa"
					onChange={handleChange}
					value={difficulty}
				/>
			</div>

			<input type="submit" value={btnText} />
		</form>
	);
}
