import { UploadOutlined } from '@ant-design/icons';
import { Upload, UploadProps, message } from 'antd';
import * as S from './index.styled';
import Input from '@src/components/atoms/input';
import Dropdown from '@src/components/molecules/dropdown';

const { Dragger } = Upload;

export const bookUploadeProps: UploadProps = {
  name: 'file',
  multiple: true,
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
      //여기에 파일을 올렸을 때 어떻게 하는지 코드를 적으면 됩니다
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

export default function UploadBookInfo({ setTitle, setPrice, setGenre, setIntroduction, items }: any) {
  return (
    <S.Container>
      <S.InputContainer>
        <S.InputTitle>
          제목 <strong>*</strong>
        </S.InputTitle>
        <Input placeholder={'30자 이내로 작성해주세요'} size={'long'} state={'default'} setInput={setTitle} />
      </S.InputContainer>

      <S.InputContainer>
        <S.Price>
          <S.InputTitle>
            가격 <strong>*</strong>
          </S.InputTitle>
          <Input placeholder={'단위 : 먼지'} size={'short'} state={'default'} setInput={setPrice} />
        </S.Price>
        <S.Genre>
          <S.InputTitle>장르</S.InputTitle>
          <Dropdown items={items} setInput={setGenre} />
        </S.Genre>
      </S.InputContainer>

      <S.InputContainer>
        <S.InputTitle>소개</S.InputTitle>
        <S.Textarea
          placeholder="1000자 이내로 작성해주세요"
          onChange={({ target: { value } }) => setIntroduction(value)}
        />
      </S.InputContainer>

      <S.UploaderContainer>
        <S.UploadTitle>
          파일 업로드 <strong>*</strong>
        </S.UploadTitle>
        <Dragger {...bookUploadeProps}>
          <S.IconContainer>
            <UploadOutlined style={{ color: 'var(--BG_GRAY1)', marginRight: '1rem' }} />
            <p className="ant-upload-text">10 Mb 이하 EPUB 형식의 책 파일을 업로드해주세요.</p>
          </S.IconContainer>
        </Dragger>
      </S.UploaderContainer>
    </S.Container>
  );
}