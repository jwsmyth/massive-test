import { IconButton } from '@material-ui/core';
import { Facebook, Instagram, YouTube, LinkedIn } from '@material-ui/icons';
import { makeStyles } from '@material-ui/core/styles';

export const Socials = () => {
	const classes = useStyles();
	return (
		<>
			<div className={classes.socials}>
				<IconButton>
					<Facebook />
				</IconButton>
				<IconButton>
					<Instagram />
				</IconButton>
				<IconButton>
					<YouTube />
				</IconButton>
				<IconButton>
					<LinkedIn />
				</IconButton>
			</div>
		</>
	);
};

const useStyles = makeStyles(() => ({
	socials: {
		textAlign: 'center',
	},
}));
