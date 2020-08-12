import { useRef, FormEvent } from 'react';
import Layout from '@/components/Layout';
import styled from '@emotion/styled';
import ky from 'ky-universal';
import Swal from 'sweetalert2'

const Label = styled.label`
  margin-right: 1em;
`;

const Input = styled.input`
  margin-right: 1em;
`;

const IndexPage = () => {
  const input = useRef<HTMLInputElement>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      if (input?.current) {
        await ky.post('http://localhost:3000/api/page', {json: {url: input.current.value}}).json();
        Swal.fire({
          position: 'top',
          icon: 'success',
          title: '페이지 저장 성공',
          showConfirmButton: false,
          timer: 1500
        })
        input.current.value = '';
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
          <Input type="url" id="url" name="url" size={100} ref={input} />
          <button type="submit">저장</button>
        </div>
      </form>
    </Layout>
  )
}

export default IndexPage
