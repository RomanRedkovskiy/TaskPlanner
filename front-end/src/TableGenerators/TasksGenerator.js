import { localDateIntoDottedDate } from "../Utils/DateFormatter"

export const generateTasksTable = (tasksInRange) => {
	return (
	<table className="table table-striped margins table-width">
		<thead>
			<tr>
				<th>Задача</th>
				<th>Дата начала</th>
				<th>Дата окончания</th>
				<th>Дата выполнения</th>
				<th>Выполнена</th>
			</tr>
		</thead>
		<tbody>
			{tasksInRange.map((task) => {
				return (
				<tr key={task.id}>
					<td>{task.name}</td>
					<td>{localDateIntoDottedDate(task.beginDate)}</td>
					<td>{localDateIntoDottedDate(task.endDate)}</td>
					<td>{localDateIntoDottedDate(task.completionDate)}</td>
					<td>
						<div className="form-check">
							<input className="form-check-input" type="checkbox" checked={task.completed} disabled/>
						</div>
					</td>
				</tr>
				)
			})}
		</tbody>
	</table>
	);
}