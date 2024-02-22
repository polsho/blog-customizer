import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { useState } from 'react';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

// type ArticleParamsFormProps = {
// 	isOpen: boolean;
// }

export const ArticleParamsForm = () => {
	
	const [isOpen, setIsOpen] = useState(false);

	const className = clsx({
	  [styles.container]: true,
	  [styles.container_open]: isOpen,
	});

	function handleArrowButtonClick() {
		setIsOpen(!isOpen);
	}

	return (
		<>
			<ArrowButton onClick={handleArrowButtonClick} isContainerOpen={isOpen} />
			<aside className={className}>
				<form className={styles.form}>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
