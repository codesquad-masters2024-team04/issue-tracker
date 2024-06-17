import { useRef } from 'react';
import styled from 'styled-components';
import { Button } from '~/common/components/Button';
import { IconPaperClip } from '~/common/icons';

export function ImageUpload({ handleUploadSuccess }) {
	const inputRef = useRef(null);

	const handleFileChange = event => {
		const file = event.target.files[0];
		if (file) {
			putFile(file);
		}
	};

	const putFile = file => {
		const bucketName = import.meta.env.VITE_APP_S3_BUCKET_NAME;
		const path = 'attached';
		const region = import.meta.env.VITE_APP_S3_REGION;
		const accessKeyId = import.meta.env.VITE_APP_S3_ACCESS_KEY_ID;
		const secretAccessKey = import.meta.env.VITE_APP_S3_SECRET_ACCESS_KEY;

		window.AWS.config.update({
			region,
			accessKeyId,
			secretAccessKey,
		});
		console.log(bucketName, path);
		const upload = new window.AWS.S3.ManagedUpload({
			params: {
				Bucket: bucketName,
				Key: `${path}/${file.name}`,
				Body: file,
			},
		});

		const promise = upload.promise();
		promise.then(
			function (data) {
				console.log(data);
				handleUploadSuccess(data.Location);
				console.log('Successfully uploaded file.');
			},
			function (err) {
				console.log('There was an error uploading your file: ', err.message);
			}
		);
	};

	const handleButtonClick = () => {
		inputRef.current.click();
	};

	return (
		<StyledWrapper>
			<StyledInputFile
				ref={inputRef}
				type='file'
				accept='image/*'
				onChange={handleFileChange}
			/>
			<Button
				type='button'
				size='small'
				buttonType='ghost'
				buttonText='파일 첨부하기'
				icon={<IconPaperClip />}
				onClick={handleButtonClick}
			/>
		</StyledWrapper>
	);
}

const StyledWrapper = styled.div`
	height: 52px;
	border-top: 1px dashed ${({ theme }) => theme.color.neutral.border.default};
	flex-direction: column;
	button {
		margin-top: 6px;
	}
`;

const StyledInputFile = styled.input`
	display: none;
`;
