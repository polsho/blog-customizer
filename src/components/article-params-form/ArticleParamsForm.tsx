import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { Separator } from '../separator'
import { RadioGroup } from '../radio-group';
import { OptionType, ArticleStateType, defaultArticleState, fontFamilyClasses, fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions } from 'src/constants/articleProps';
import { useState, useRef, useEffect } from 'react';


import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

// type ArticleParamsFormProps = {
// 	isOpen: boolean;
// }

export const ArticleParamsForm = () => {
	
	const [isOpen, setIsOpen] = useState(false);

	const [state, setState] = useState(defaultArticleState);
	const [fontFamily, setFontFamily] = useState(state.fontFamilyOption);

	const asideClassName = clsx({
	  [styles.container]: true,
	  [styles.container_open]: true,
	});

	const wrapperRef = useRef<HTMLDivElement | null>(null);

	function handleArrowButtonClick() {
		setIsOpen(!isOpen);
	}

	function handleOutsideClick(event: MouseEvent) {
		if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
			setIsOpen(false);
		}
	}

	
		function handleFormInput(value: OptionType) {
			setFontFamily(value);
			console.log(fontFamily);
		}


	useEffect(() => {
		document.addEventListener("mousedown", handleOutsideClick);

    	return () => {
      		document.removeEventListener("mousedown", handleOutsideClick);
		}
	}, [])

	return (
		<div ref={wrapperRef}>
			<ArrowButton onClick={handleArrowButtonClick} isContainerOpen={isOpen} />
			<aside className={asideClassName}>
				<form className={styles.form}>
					<Text size={31} weight={800} uppercase={true}>
						{'Задайте параметры'}
					</Text>
					<Select 	
						selected={fontFamily && state.fontFamilyOption} 
						options={fontFamilyOptions} 
						placeholder={fontFamilyClasses[0]} 
						title={'Шрифт'}
						onChange={handleFormInput}
						/>
					<RadioGroup name={''} selected={state.fontSizeOption} options={fontSizeOptions} title={'Размер шрифта'}/>
					<Select selected={state.fontColor} options={fontColors} title={'Цвет шрифта'}/>
					<Separator/>
					<Select selected={state.backgroundColor} options={backgroundColors} title={'Цвет фона'} />
					<Select selected={state.contentWidth} options={contentWidthArr} title={'Ширина контента'}/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
