import React, {useState, useEffect} from 'react';
import MessageList from '../Components/Course/MessageList';
import CourseApi, { Message } from '../Data/course';

const MessageListPage: React.FC = () => {
	const [messages, setMessage] = useState<Message[]>();

	useEffect(() => {
      CourseApi.getMessages().then((res) => {
		setMessage(res)
	  });
	}, []);

	if(!messages) return <div>No Data!</div>

	return (
		<div>
			<MessageList messages={messages} />
		</div>
	);
};

export default MessageListPage;
