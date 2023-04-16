import React, { useRef } from 'react';
import SunEditor from 'suneditor-react';
import SunEditorCore from 'suneditor/src/lib/core';
import 'suneditor/dist/css/suneditor.min.css';

interface editorProps {
	text: string;
	defaultValue?: string;
	setContent: React.Dispatch<React.SetStateAction<string>>;
}

export const Editor = (props: editorProps) => {
	const editor = useRef<SunEditorCore>();

	const getSunEditorInstance = (sunEditor: SunEditorCore) => {
		editor.current = sunEditor;
	};

	function handleChange(content: string) {
		props.setContent(content);
	}

	return (
		<div>
			<p> {props.text} </p>
			<SunEditor
				getSunEditorInstance={getSunEditorInstance}
				lang="en"
				name="my-editor"
				defaultValue={props.defaultValue}
				width="100%"
				height="100%"
				placeholder="Please type here..."
				autoFocus={true}
				setDefaultStyle="font-family: Roboto; font-size: 20px; min-height: 400px; border-radius: 4px;"
				onChange={handleChange}
				setOptions={{
					buttonList: [
						['font', 'fontSize', 'formatBlock'],
						[
							'bold',
							'underline',
							'italic',
							'strike',
							'subscript',
							'superscript',
						],
						['align', 'horizontalRule', 'list', 'table'],
						['fontColor', 'hiliteColor'],
						['outdent', 'indent'],
						['undo', 'redo'],
						['removeFormat'],
						['outdent', 'indent'],
						['link', 'image'],
						['preview', 'fullScreen', 'showBlocks', 'codeView'],
					],
				}}
			/>
		</div>
	);
};
