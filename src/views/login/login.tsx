import React, { memo, useState, useEffect } from 'react'
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

// 定义样式组件
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f0f2f5;
`

const H2 = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`

const Form = styled.form`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow:
    0 2px 4px rgba(0, 0, 0, 0.1),
    0 8px 16px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin: 0 auto;
`

const Input = styled.input`
  width: 90%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #dddfe2;
  border-radius: 6px;
  font-size: 16px;
  margin: 10px auto;
`

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: #1877f2;
  border: none;
  border-radius: 6px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #166fe5;
  }
`

interface LoginProps {
  children?: React.ReactNode
}

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  console.log(props)
  const [userName, setUserName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [isLogin, setIsLogin] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('用户名:', userName, '密码:', password)
    setIsLogin(true)
  }

  useEffect(() => {
    if (isLogin) {
      navigate('/home') // 跳转到首页
    }
  }, [isLogin, navigate])

  return (
    <LoginContainer>
      <Form onSubmit={handleSubmit}>
        <H2>登录页</H2>
        <Input
          type="text"
          id="username"
          placeholder="用户名"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <Input
          type="password"
          id="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">登录</Button>
      </Form>
    </LoginContainer>
  )
}

export default memo(Login)
