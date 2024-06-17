import { Suspense } from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, theme } from './styles';
import { Spin } from 'antd';
import {
	createBrowserRouter,
	createRoutesFromElements,
	Route,
	RouterProvider,
} from 'react-router-dom';
import { routes } from './Routes';

const router = createBrowserRouter(
	createRoutesFromElements(
		routes.map((route, index) => (
			<Route key={index} path={route.path} element={route.element}>
				{route.children &&
					route.children.map((child, childIndex) => (
						<Route key={childIndex} path={child.path} element={child.element} />
					))}
			</Route>
		))
	)
);
function App() {
	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Suspense
				fallback={
					<div
						style={{
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
						}}
					>
						<Spin size='large' />
					</div>
				}
			>
				<RouterProvider router={router} />
			</Suspense>
		</ThemeProvider>
	);
}

export default App;
