import React, { useState, useEffect } from 'react';
import MessageList from '../Components/Course/MessageList';
import CourseApi, { Message } from '../Data/course';
import LoadingComponent from '../Components/MaterialUI/LoadingComponent';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const MessageListPage: React.FC = () => {
	const [messages, setMessage] = useState<Message[]>();
	const navigate = useNavigate();

	useEffect(() => {
		let isMounted = true; // Keep track of whether the component is mounted
		CourseApi.getMessages()
			.then((res) => {
				if (isMounted) {
					// Check if the component is still mounted before updating state
					setMessage(res);
				}
			})
			.catch((err) => {
				if (isMounted && err.response.status === 401) {
					// Check if the component is still mounted before navigating
					toast.error('You are not authenticated, please sign in!');
					navigate('/signin');
				}
			});

		return () => {
			isMounted = false; // Set isMounted to false when the component is unmounted
		};
	}, [navigate]);

	if (!messages) return <LoadingComponent />;

	return (
		<div>
			<MessageList messages={messages} />
		</div>
	);
};

export default MessageListPage;
