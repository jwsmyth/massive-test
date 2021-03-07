import { TableCell, TableRow } from '@material-ui/core';
import { convertDate } from '../../utils';

const User = ({ user, columns, editUser }) => {
	return (
		<TableRow
			hover
			role="checkbox"
			tabIndex={-1}
			key={user.id}
			onClick={() => editUser(user)}
			style={{ cursor: 'pointer' }}
		>
			{columns.map(column => {
				const value = user[column.id];
				return (
					<TableCell key={column.id} style={{ minWidth: column.minWidth }}>
						{column.id === 'dateOfBirth'
							? convertDate(value)
							: column.id === 'isAdmin' && value === true
							? 'Yes'
							: column.id === 'isAdmin' && value === false
							? 'No'
							: value}
					</TableCell>
				);
			})}
		</TableRow>
	);
};

export default User;
