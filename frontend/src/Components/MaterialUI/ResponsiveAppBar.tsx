import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Logo } from './Logo';
import AuthApi from '../../Data/Auth';
import { useNavigate } from 'react-router-dom';
import { isTokenExpired } from '../../Utils/isTokenExpired';

const pages = ['home', 'About us'];
const adminPage = [
	'home',
	'courses',
	'jobs',
	'enrollments',
	'favorites Courses',
];
const settings = ['Profile', 'Logout'];

const navigatePages = (page: string) => {
	switch (page) {
		case 'home':
			return '';
		case 'favorites Courses':
			return 'favoritesCourses';
		case 'About us':
			return 'aboutus';
		default:
			return page;
	}
};

// const routerPages = (page: string) => {
// 	switch (page) {
// 		case 'home':
// 			return '';
// 		case 'courses':
// 			return 'courses';
// 		case 'jobs':
// 			return 'jobs';
// 		case 'Profile':
// 			return 'profile';
// 		case 'Logout':
// 			return 'logout';
// 		default:
// 			return '';
// 	}
// };

function ResponsiveAppBar() {
	const isAuth = AuthApi.getUser();
	const navigate = useNavigate();
	const user = AuthApi.getUserResponse();

	React.useEffect(() => {
		const interval = setInterval(() => {
			if (user !== null) {
				const exp = isTokenExpired(user?.accessToken);
				if (exp) {
					AuthApi.logout();
					navigate('/signin');
				}
			}
		}, 5000);
		return () => clearInterval(interval);
	}, [navigate, user]);

	const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
		null
	);
	const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
		null
	);

	const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = (setting: string) => {
		if (setting === 'Logout') {
			AuthApi.logout();
			navigate('/');
			window.location.reload();
		}
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* Logo */}
					<Logo IsFlexGrow={false} />

					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{isAuth
								? adminPage.map((page) => (
										<MenuItem
											key={page}
											onClick={handleCloseNavMenu}
											href={`/${navigatePages(page)}`}
										>
											<Typography textAlign="center">{page}</Typography>
										</MenuItem>
								  ))
								: pages.map((page) => (
										<MenuItem
											key={page}
											onClick={handleCloseNavMenu}
											href={`/${navigatePages(page)}`}
										>
											<Typography textAlign="center">{page}</Typography>
										</MenuItem>
								  ))}
						</Menu>
					</Box>

					{/* LOGO */}
					<Logo IsFlexGrow={true} />

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{isAuth
							? adminPage.map((page) => (
									<Button
										key={page}
										onClick={handleCloseNavMenu}
										style={{ marginBottom: '10px' }}
										sx={{ my: 2, color: 'white', display: 'block' }}
										href={`/${navigatePages(page)}`}
									>
										{page}
									</Button>
							  ))
							: pages.map((page) => (
									<Button
										key={page}
										onClick={handleCloseNavMenu}
										style={{ marginBottom: '10px' }}
										sx={{ my: 2, color: 'white', display: 'block' }}
										href={`/${navigatePages(page)}`}
									>
										{page}
									</Button>
							  ))}
					</Box>

					{isAuth ? (
						<Box sx={{ flexGrow: 0 }}>
							<Tooltip title="Open settings">
								<IconButton
									onClick={handleOpenUserMenu}
									sx={{ p: 0 }}
								>
									<Avatar
										alt="M"
										style={{ backgroundColor: '#21272C' }}
									/>
								</IconButton>
							</Tooltip>
							<Menu
								sx={{ mt: '45px' }}
								id="menu-appbar"
								anchorEl={anchorElUser}
								anchorOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								keepMounted
								transformOrigin={{
									vertical: 'top',
									horizontal: 'right',
								}}
								open={Boolean(anchorElUser)}
								onClose={handleCloseUserMenu}
							>
								{settings.map((setting) => (
									<MenuItem
										key={setting}
										component={'a'}
										href={setting === 'Profile' ? `/${setting}` : ''}
										onClick={() => handleCloseUserMenu(setting)}
									>
										<Typography textAlign="center">{setting}</Typography>
									</MenuItem>
								))}
							</Menu>
						</Box>
					) : (
						<>
							<Button
								color="inherit"
								style={{ marginTop: '7px' }}
								href="/signup"
							>
								Sign Up
							</Button>
							<Button
								color="inherit"
								style={{ marginTop: '7px' }}
								href="/signin"
							>
								Sign In
							</Button>
						</>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
