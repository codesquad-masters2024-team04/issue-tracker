import {
	IssueListViewsPage,
	IssueCreatePage,
	IssueDetailPage,
} from '~/features/issue/pages';
import { Layout } from '~/features/main/pages/Layout';
import { SignInPage, GithubAuth } from '~/features/signIn/pages';

import { LabelPage } from '~/features/label/pages/LabelPage';
import { MilestonePage } from '~/features/milestone/pages';

export const routes = [
	{ path: 'login/oauth/github/callback', element: <GithubAuth /> },
	{
		path: '/',
		element: <Layout />,
		children: [
			{ path: '/', element: <SignInPage /> },
			{ path: 'labels', element: <LabelPage /> },
			{ path: 'milestones', element: <MilestonePage /> },
			{ path: 'signIn', element: <SignInPage /> },
			{ path: 'issues', element: <IssueListViewsPage /> },
			{ path: 'issues/new', element: <IssueCreatePage /> },
			{ path: 'issues/:id', element: <IssueDetailPage /> },
		],
	},
];
