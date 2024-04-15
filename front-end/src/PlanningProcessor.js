import config from "./config";
import { useState, useEffect } from "react";
import { formatHyphensDate } from "./Utils/DateFormatter";
import { tasksIntoTasksInChosenRange } from "./Utils/TaskRangeEvaluator";
import { generatePlanTable } from "./TableGenerators/PlanGenerator";
import { generateTasksTable } from "./TableGenerators/TasksGenerator";
import useFetch from "./Fetches/useFetch";
import fetchData from './Fetches/fetchData';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-datepicker/dist/react-datepicker.css';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import DatePicker from 'react-datepicker';

const PlanningProcessor = () => {

	//Fetching employees and their ids on startup
	const {data: employeeList, isLoading, error} = useFetch(config.apiUrl + 'employees');

	//Employee choice
	const [chosenEmployee, setChosenEmployee] = useState(undefined);

	//Begin date choice
	const [beginDate, setBeginDate] = useState(null);

	//Set begin date as Date object
	const handleBeginDateChange = (date) => {
		setBeginDate(new Date(formatHyphensDate(date)));
	}

	//End date choice
	const [endDate, setEndDate] = useState(null);

	//Set end date as Date object
	const handleEndDateChange = (date) => {
		setEndDate(new Date(formatHyphensDate(date)));
	}

	//Page switcher flag state (Задачи / План)
	const [isTasksPage, setIsTasksPage] = useState(true);

	//String that represents error on data correctness check (onButtonClick)
	const [errorText, setErrorText] = useState('');

	//Fetched tasks for chosen employee
	const [tasks, setTasks] = useState(null);

	//Tasks that are in chosen range for current employee
	const [tasksInRange, setTasksInRange] = useState(null);

	//Structure [value, label], where value is employee's id and label is employee's name
	//It was used for employee's Dropdown With Search component
	const [employeeOptions, setEmployeeOptions] = useState(null);

	//Table structure for graphical plan (on click "Задачи")
	const [tasksTable, setTasksTable] = useState(null);

	//Table structure for graphical plan (on click "План")
	const [planTable, setPlanTable] = useState(null);

	//When employees were fetched on initial setup for setting options (Dropdown With Search component for employee)
	useEffect(() => {
		if(employeeList){
			const processedOptions = employeeList.map((employee) => ({
				value: employee.id,
				label: employee.name,
			}));
			setEmployeeOptions(processedOptions);
		}
	}, [employeeList]);

	//onButtonClick checks if employee and dates were chosen properly
	const isDataCorrect = () => {

		const dayInMillis = 24 * 60 * 60 * 1000; //24 hours, 60 minutes, 60 seconds, 1000 millis;
		//const for implementin 30 days difference check 
		const thirtyDaysInMillis = 30 * dayInMillis; // 30 days

		setTasks(null);
		setErrorText('');
		if(!chosenEmployee || chosenEmployee === undefined){
			setErrorText('Ошибка! Выберите сотрудника.');
		} else if(!beginDate){
			setErrorText('Ошибка! Выберите дату начала.');
		} else if(!endDate){
			setErrorText('Ошибка! Выберите дату окончания.');
		} else if(endDate.getTime() < beginDate.getTime()) {
			setErrorText('Ошибка! Дата окончания должна быть позже даты начала.');	
		} else if(endDate.getTime() - beginDate.getTime() >= thirtyDaysInMillis){
			setErrorText('Ошибка! Максимальный диапазон - 30 день.');
		} else {
			return true;
		}	
		return false;
	}

	//if data was chosen properly, fetches tasks for current employee and sets tasks state.
	async function handleShowTask() {
		if (isDataCorrect()) {
			try {
				const fetchedData = await fetchData(config.apiUrl + 'tasks/' + chosenEmployee.value);
				setTasks(fetchedData);
			} catch (error) {
				console.error('Error: ', error);
			}
		}
	}

	//when tasks state was changed, filters tasks and sets tasksInRange state.
	useEffect(() => {
		if (tasks) {
			setTasksInRange(tasksIntoTasksInChosenRange(tasks, beginDate, endDate));
		}
	}, [tasks]);

	//when tasksInRange state was changed, generates graphical table and changes plan state. 
	useEffect(() => {
		if (tasksInRange) {
			setTasksTable(generateTasksTable(tasksInRange));
			setPlanTable(generatePlanTable(tasksInRange, beginDate, endDate));
		}
	}, [tasksInRange]);

	return ( 
	<>
		{isLoading && <h3>Информация загружается...</h3>}
		{error && <h3>Произошла ошибка при загрузке данных</h3>}
		{employeeList && employeeList.length === 0 && <h3>Список сотрудников пуст!</h3>}
		{employeeList && employeeList.length > 0 && employeeOptions &&
		<>
		<div className="margins flex-box">
			<span className="bg-secondary text-white p-2">Сотрудник</span>
			{/*Dropdown With Search for employee*/}
			<Form className="employee-box">
				<Select
					value={chosenEmployee}
					onChange={setChosenEmployee}
					options={employeeOptions}
					isSearchable
					placeholder="Выберите сотрудника"
				/>
			</Form>
		</div>

		<div className="margins flex-box">
      	<span className="bg-secondary text-white p-2">с</span>
		{/*Date chooser for begin date*/}
		<DatePicker
			selected={beginDate}
			onChange={handleBeginDateChange}
			dateFormat="dd.MM.yyyy"
			className="date-picker form-control"
			placeholderText="Дата начала"
		/>
		<span className="bg-secondary text-white p-2">по</span>
		{/*Date chooser for end date*/}
		<DatePicker
			selected={endDate}
			onChange={handleEndDateChange}
			dateFormat="dd.MM.yyyy"
			className="date-picker form-control"
			placeholderText="Дата окончания"
		/>
		</div>
		
		<div className="flex-box">
			{/*Show tasks on button click if employee and date data was chosen properly*/}
			<button className="btn btn-primary margins" onClick={handleShowTask}>Показать задачи</button>	
			{/*Error label that shows error text if employee and date data wasn't chosen properly*/}
			<span className="badge bg-danger margins">{errorText}</span>
		</div>

		{/*For navigation between tables (Задачи / План)*/}
		<nav aria-label="..." className="margins">
		<ul className="pagination pagination-lg">
			{/*isTasksPage flag to determine which options is currently used (Задачи or План)*/}
			<li className={`page-item ${isTasksPage ? 'disabled' : ''}`}>
				{/*e.preventDefault() to prevent href to go to # page*/}
				<a className="page-link" href="#" onClick={(e) => { e.preventDefault(); setIsTasksPage(true); }}>Задачи</a>
			</li>
			<li className={`page-item ${!isTasksPage ? 'disabled' : ''}`}>
				{/*e.preventDefault() to prevent href to go to # page*/}
				<a className="page-link" href="#" onClick={(e) => { e.preventDefault(); setIsTasksPage(false); }}>План</a>
			</li>
		</ul>
		</nav>
		</>
		}
		{tasksInRange && 
		<>
		{tasksInRange.length === 0 && <h3 className="margins">Отсутствуют задания в указанном диапазоне!</h3>}
		{tasksInRange.length > 0 && isTasksPage && tasksTable}
		{tasksInRange.length > 0 && !isTasksPage && planTable}
		</>
		}
	</>
	);
}
 
export default PlanningProcessor;