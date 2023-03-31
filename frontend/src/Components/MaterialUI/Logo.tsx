import React from 'react';
import Typography from '@mui/material/Typography';

interface props {
	IsFlexGrow: boolean;
}

export const Logo: React.FC<props> = ({ IsFlexGrow }) => {
	return (
		<>
			{IsFlexGrow ? (
				<>
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
                        style={{marginBottom: "3px"}}
						sx={{
							mr: 11,
							display: { xs: 'flex', md: 'none' },
							fontFamily: 'Calibri',
							fontWeight: 700,
							flexGrow: 1,
							color: '#ffffff',
							textDecoration: 'none',
						}}
					>
						ITSkillsNow.
					</Typography>
				</>
			) : (
				<>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
                        style={{fontSize:"25px"}}
						sx={{
							mr: 0,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'Calibri',
							fontWeight: 700,
							letterSpacing: '.1rem',
							color: '#050607',
							textDecoration: 'none',
						}}
					>
						IT
					</Typography>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
                        style={{fontSize:"25px"}}
						sx={{
							mr: 0,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'Calibri',
							fontWeight: 700,
							letterSpacing: '.1rem',
							color: '#A7C957',
							textDecoration: 'none',
						}}
					>
						SkillsNow
					</Typography>
					<Typography
						variant="h5"
						noWrap
						component="a"
						href="/"
                        style={{fontSize:"25px"}}
						sx={{
							mr: 2,
							display: { xs: 'none', md: 'flex' },
							fontFamily: 'Calibri',
							fontWeight: 700,
							letterSpacing: '.1rem',
							color: '#050607',
							textDecoration: 'none',
						}}
					>
						.
					</Typography>
				</>
			)}
		</>
	);
};
