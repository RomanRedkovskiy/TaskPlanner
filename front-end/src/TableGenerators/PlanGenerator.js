export const generatePlanTable = (tasks, beginDate, endDate) => {

	//table date headers representation (only date e.g. 24)
	const tableDateHeaders = [];

	//table date headers objects for task range comparing
	const headerDatesObjects = [];

	//start while cycle from begin date
	const currentDate = new Date(beginDate);
  
	//finish while cycle on end date
	while (currentDate <= endDate) {
		//retrieve day from currentDate object
		const day = currentDate.getDate();
		//push header representation
		tableDateHeaders.push(<th key={day}>{day}</th>);
		//push header object
		headerDatesObjects.push({date: new Date(currentDate)});
		//day + 1 to switch to the next calendar day
 		currentDate.setDate(day + 1);
	}

	//constructing table body row-by-row by mapping every task 
	const tableBody = tasks.map((task, index) => {
		//constructing table row cell-by-cell by mapping header 
		const taskCells = tableDateHeaders.map((header, headerIndex) => {
			//create task begin as Date object
			const taskBeginDateFormatted = new Date(task.beginDate);
			//create task end as Date object			
			const taskEndDateFormatted = new Date(task.endDate);
			//find corresponding date object for current header
			const headerDate = headerDatesObjects[headerIndex].date;
			//check is headerDate is in range for current task
			const isInRange = taskBeginDateFormatted <= headerDate && headerDate <= taskEndDateFormatted;
			//retirn current cell
			return (
			<>	
				{/*className 'highlighted-cell' determines if current cell will be marked or not */}
				<td key={header.key} className={isInRange ? 'highlighted-cell' : ''}></td>
			</>
			);
		});
  
	  return (
		<tr key={index}>
			<td>{task.name}</td>
			{taskCells}
		</tr>
	  );
	});
  
	return (
	  <table className="table margins table-width vertically-striped-table">
		<thead>
			<tr>
				<th>Задача</th>
				{tableDateHeaders}
			</tr>
		</thead>
		<tbody>
			  {tableBody}
		</tbody>
	  </table>
	);
}