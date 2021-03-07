import { convertDate } from '../../utils';
import {
	Button,
	Typography,
	Grid,
	TextField,
	FormControlLabel,
	Checkbox,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const UserInformation = ({
	handleCancel,
	handleChange,
	handleUpdateUser,
	updatedUser,
	edit,
	toggleEdit,
}) => {
	const classes = useStyles();
	return (
		<>
			<form onSubmit={handleUpdateUser}>
				<Typography variant="h6">ACCOUNT</Typography>
				<Typography variant="body2" className={classes.headerMargin}>
					{updatedUser.userAccountId}
				</Typography>
				<Grid container spacing={3}>
					<Grid item xs={12} sm={6} className={classes.accountItem}>
						<TextField
							label="First name"
							name="firstName"
							variant="outlined"
							fullWidth
							disabled={!edit}
							value={updatedUser.firstName}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={12} sm={6} className={classes.accountItem}>
						<TextField
							label="Last name"
							name="lastName"
							variant="outlined"
							fullWidth
							disabled={!edit}
							value={updatedUser.lastName}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={12} className={classes.accountItem}>
						<TextField
							type="email"
							label="Email"
							name="emailAddress"
							variant="outlined"
							fullWidth
							disabled={!edit}
							value={updatedUser.emailAddress}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={12} className={classes.accountItem}>
						<TextField
							type="password"
							name="password"
							label="Password"
							variant="outlined"
							fullWidth
							disabled={!edit}
							value={updatedUser.password}
							onChange={handleChange}
							required
						/>
					</Grid>
					<Grid item xs={9} className={classes.accountItem}>
						<TextField
							type="date"
							name="dateOfBirth"
							label="Date of Birth"
							variant="outlined"
							fullWidth
							disabled={!edit}
							onChange={handleChange}
							required
							value={convertDate(updatedUser.dateOfBirth)}
							InputLabelProps={{
								shrink: true,
							}}
						/>
					</Grid>
					<Grid item xs={3} style={{ textAlign: 'right' }}>
						<FormControlLabel
							control={
								<Checkbox
									checked={updatedUser.isAdmin}
									onChange={handleChange}
									name="isAdmin"
									color="primary"
									disabled={!edit}
								/>
							}
							label="Admin"
						/>
					</Grid>
				</Grid>
				<div className={classes.btns}>
					{edit && (
						<Button variant="outlined" color="primary" onClick={handleCancel}>
							Cancel
						</Button>
					)}
					<div className={classes.editButton}>
						{!edit ? (
							<Button
								variant="contained"
								color="primary"
								onClick={e => toggleEdit(e)}
							>
								Edit
							</Button>
						) : (
							<Button type="submit" variant="contained" color="primary">
								Save changes
							</Button>
						)}
					</div>
				</div>
			</form>
		</>
	);
};

export default UserInformation;

const useStyles = makeStyles(theme => ({
	headerMargin: {
		marginBottom: 16,
	},
	btns: {
		display: 'flex',
		marginTop: theme.spacing(3),
	},
	editButton: {
		flexGrow: 1,
		display: 'flex',
		justifyContent: 'flex-end',
	},
}));
