import React, { memo, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import useAppDispatch from '@/hooks/useAppDispatch'
import useAppSelector from '@/hooks/useAppSelector'
import { changeCount } from '@/stores/modules/home/homeStore'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f4f4f9;
  position: relative;
`

const MessageDiv = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`

const StyledButton = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`

const LogoutButton = styled(StyledButton)`
  padding: 5px 10px;
  position: absolute;
  right: 20px;
  top: 20px;
  background-color: #dc3545;

  &:hover {
    background-color: rgb(237, 221, 222);
    color: #dc3545;
  }
`

interface HomePropsType {
  children?: React.ReactNode
}

const Home: React.FC<HomePropsType> = (props: HomePropsType) => {
  const [message, setMessage] = useState<string>('hello webpack')
  const [count, setCount] = useState<number>(0)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const changeMessage: () => void = () => {
    let info: string = message.match(/webpack/) ? 'hello vite' : 'hello webpack'
    setMessage(info)
  }

  const handleLogout = () => {
    navigate('/login')
  }

  useEffect(() => {
    dispatch(changeCount({ count: 6 }))
      .then((res) => {
        setCount(res.payload as any)
      })
      .catch((err) => {
        console.log(err)
      })
  })

  return (
    <Container>
      <MessageDiv>{message}</MessageDiv>
      <StyledButton onClick={() => changeMessage()}>
        修改message信息
      </StyledButton>
      <LogoutButton onClick={handleLogout}>退出</LogoutButton>
      <div>{count}</div>
    </Container>
  )
}

export default memo(Home)
