const isTaskInChosenRange = (taskBeginDate, taskEndDate, beginDate, endDate) => {
	const taskBeginDateFormatted = new Date(taskBeginDate);
	const taskEndDateFormatted = new Date(taskEndDate);
	return (!(
		(taskBeginDateFormatted < beginDate && taskEndDateFormatted < beginDate) || //---task--range--> case
		(taskBeginDateFormatted > endDate && taskEndDateFormatted > endDate)		//---range--task--> case
	));
}

export const tasksIntoTasksInChosenRange = (tasks, beginDate, endDate) => {
	if(!tasks){
		return null;
	}
	return tasks.filter((task) => {
		return isTaskInChosenRange(task.beginDate, task.endDate, beginDate, endDate);
	});
}