import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { Select } from '../select';
import { Separator } from '../separator'
import { RadioGroup } from '../radio-group';
import { OptionType, ArticleStateType, defaultArticleState, fontFamilyOptions, fontColors, backgroundColors, contentWidthArr, fontSizeOptions } from 'src/constants/articleProps';
import { useOpenCloseForm } from './hooks/useOpenCloseForm';
import { useState, useRef, SyntheticEvent, CSSProperties } from 'react';


import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';

type ArticleParamsFormProps = {
	params: ArticleStateType;
	setParams: (params: ArticleStateType) => void;
}

export const ArticleParamsForm = ({params, setParams}: ArticleParamsFormProps) => {
	
	const [isOpen, setIsOpen] = useState(false);
	
	const [state, setState] = useState(params);
	
	
	const asideClassName = clsx({
		[styles.container]: true,
		[styles.container_open]: isOpen,
	});
	
	const wrapperRef = useRef<HTMLDivElement | null>(null);

	const handleArrowButtonClick = useOpenCloseForm({isOpen, setIsOpen, wrapperRef});
	


	function handlefontFamilyInput(value: OptionType) {
		setState({...state, fontFamilyOption: value});
	}

	function handlefontColorInput(value: OptionType) {
		setState({...state, fontColor: value});
	}

	function handlebackgroundColorInput(value: OptionType) {
		setState({...state, backgroundColor: value});
	}

	function handlecontentWidthInput(value: OptionType) {
		setState({...state, contentWidth: value});
	}

	function handlefontSizeOptionInput(value: OptionType) {
		setState({...state, fontSizeOption: value});
	}

	

	function handleReset() {
		setState(defaultArticleState);
		setParams(defaultArticleState);
	}

	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setParams(state);
	  };


	return (
		<div ref={wrapperRef}>
			<ArrowButton onClick={handleArrowButtonClick} isContainerOpen={isOpen} />
			<aside className={asideClassName}>
				<form className={styles.form} onSubmit={handleSubmit} onReset={handleReset}>
					<Text size={31} weight={800} uppercase={true}>
						{'Задайте параметры'}
					</Text>
					<Select 	
						selected={state.fontFamilyOption} 
						options={fontFamilyOptions} 
						title={'Шрифт'}
						onChange={handlefontFamilyInput}
						/>
					<RadioGroup name={'fontSize'} selected={state.fontSizeOption} options={fontSizeOptions} title={'Размер шрифта'} onChange={handlefontSizeOptionInput}/>
					<Select selected={state.fontColor} options={fontColors} title={'Цвет шрифта'} onChange={handlefontColorInput}/>
					<Separator/>
					<Select selected={state.backgroundColor} options={backgroundColors} title={'Цвет фона'} onChange={handlebackgroundColorInput}/>
					<Select selected={state.contentWidth} options={contentWidthArr} title={'Ширина контента'} onChange={handlecontentWidthInput}/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};

