import React from 'react';
import './css/CourseList.css';
import { Message } from '../../Data/Course';

interface Props {
	messages: Message[];
}

const MessageList: React.FC<Props> = ({ messages }) => {
	return (
		<div className="course-list">
			<h2>Messages using RabbitMQ</h2>
			<ul>
				{messages.map((message) => (
					<li key={message.messageId}>
						<div>{message.messageContent}</div>
						{message.messageDate}
					</li>
				))}
			</ul>
		</div>
	);
};

export default MessageList;
