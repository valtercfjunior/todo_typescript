import * as React from "react";

import style from "./Modal.module.css";

interface Props {
	children: React.ReactNode;
}

export function Modal({ children }: Props) {
	const closeModal = (e: React.MouseEvent): void => {
		const modal = document.querySelector("#modal");
		modal!.classList.toggle("hide");
	};

	return (
		<div id="modal" className="hide">
			<div className={style.fade} onClick={closeModal}></div>
			<div className={style.modal}>
				<h2>Editando a tarefa...</h2>
				{children}
			</div>
		</div>
	);
}
