import { TableCell, TableHead, TableRow } from '@material-ui/core';

const TableHeaders = ({ columns }) => {
	return (
		<TableHead>
			<TableRow>
				{columns.map(column => (
					<TableCell style={{ flexWrap: 'wrap' }} key={column.id}>
						{column.name}
					</TableCell>
				))}
			</TableRow>
		</TableHead>
	);
};

export default TableHeaders;
