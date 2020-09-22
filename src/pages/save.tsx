import { FormEvent, useState, ChangeEvent, useEffect } from 'react';
import Layout from '@src/components/Layout';
import styled from '@emotion/styled';
import ky from 'ky-universal';
import Swal from 'sweetalert2'
import {useRouter} from 'next/router';

const Label = styled.label`
  margin-right: 1em;
`;

const Input = styled.input`
  margin-right: 1em;
`;

const SavePage = () => {
  const {query} = useRouter();
  const [url, setUrl] = useState('');

  useEffect(() => {
    if (query.url) {
      setUrl(query.url as string);
    }
  }, [query.url])

  function handleUrlChange(e: ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    if (value) {
      setUrl(value);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      if (url) {
        await ky.post('http://localhost:3000/api/page', {json: {url}}).json();
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: '페이지 저장 성공',
          showConfirmButton: false,
          timer: 1500
        })
        setUrl('');
      }
    } catch (err) {
      Swal.fire({
        position: 'top',
        icon: 'error',
        title: err?.message || '페이지 저장 실패',
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

  return (
    <Layout title="페이지 저장하기">
      <form onSubmit={handleSubmit}>
        <div>
          <Label htmlFor="url">URL:</Label>
          <Input onChange={handleUrlChange} value={url} type="url" id="url" name="url" size={100} />
          <button type="submit">저장</button>
        </div>
      </form>
    </Layout>
  )
}

export default SavePage
